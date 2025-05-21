import { computed, Injectable, signal } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private pdfDocument: any;
  private container!: HTMLDivElement;

  currentPageNumber = signal(1);
  totalPages = signal(0);
  scale = signal(1);
  isTextBasedPdf = signal(false);
  showText = signal(false);
  documentLoaded = computed(() => this.totalPages() > 0);

  setContainer(container: HTMLDivElement) {
    this.container = container;
  }

  async loadPdfFromBuffer(buffer: ArrayBuffer) {
    const pdfjs = pdfjsLib as any;
    pdfjs.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.min.mjs';
    const loadingTask = pdfjs.getDocument({ data: buffer });
    this.pdfDocument = await loadingTask.promise;
    this.totalPages.set(this.pdfDocument.numPages);
    this.currentPageNumber.set(1);
    this.renderPage(this.currentPageNumber());
  }

  async renderPage(pageNumber: number) {
    const page = await this.pdfDocument.getPage(pageNumber);
    const viewport = page.getViewport({ scale: this.scale() });
    this.container.innerHTML = '';

    const pageWrapper = document.createElement('div');
    pageWrapper.className = 'pageWrapper';
    pageWrapper.style.width = `${viewport.width}px`;
    pageWrapper.style.height = `${viewport.height}px`;
    this.container.appendChild(pageWrapper);

    const textContent = await page.getTextContent();
    const hasSubstantialText = textContent?.items?.length > 20;
    this.isTextBasedPdf.set(hasSubstantialText);

    if (this.showText() && hasSubstantialText) {
      const textLayerDiv = document.createElement('div');
      textLayerDiv.className = 'textLayer text-based';
      textLayerDiv.style.width = `${viewport.width}px`;
      textLayerDiv.style.height = `${viewport.height}px`;
      pageWrapper.appendChild(textLayerDiv);

      const textLayer = new pdfjsLib.TextLayer({
        textContentSource: textContent,
        container: textLayerDiv,
        viewport: viewport,
      });

      await textLayer.render();
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.className = 'pdf-canvas';
      pageWrapper.appendChild(canvas);

      const context = canvas.getContext('2d')!;
      const renderContext = { canvasContext: context, viewport };
      await page.render(renderContext).promise;
    }
  }

  nextPage() {
    if (this.currentPageNumber() < this.totalPages()) {
      this.currentPageNumber.update((n) => n + 1);
      this.renderPage(this.currentPageNumber());
    }
  }

  previousPage() {
    if (this.currentPageNumber() > 1) {
      this.currentPageNumber.update((n) => n - 1);
      this.renderPage(this.currentPageNumber());
    }
  }

  zoomIn() {
    if (this.scale() < 3) {
      this.scale.update((s) => s + 0.1);
      this.renderPage(this.currentPageNumber());
    }
  }

  zoomOut() {
    if (this.scale() > 0.5) {
      this.scale.update((s) => s - 0.1);
      this.renderPage(this.currentPageNumber());
    }
  }

  toggleTextView() {
    this.showText.update((prev) => !prev);
    this.renderPage(this.currentPageNumber());
  }
}
