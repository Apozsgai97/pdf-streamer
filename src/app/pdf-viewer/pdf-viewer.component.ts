import {
  Component,
  computed,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss',
})
export class PdfViewerComponent {
  @ViewChild('pdfContainer', { static: true })
  pdfContainer!: ElementRef<HTMLDivElement>;

  private pdfDocument: any;
  currentPageNumber = signal(1);
  totalPages = signal(0);
  scale = signal(1);
  documentLoaded = computed(() => this.totalPages() > 0);
  isTextBasedPdf = signal(false);

  async loadPdfFromBuffer(buffer: ArrayBuffer) {
    try {
      const pdfjs = pdfjsLib as any;
      pdfjs.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.min.mjs';

      const loadingTask = pdfjs.getDocument({ data: buffer });
      this.pdfDocument = await loadingTask.promise;
      this.totalPages.set(this.pdfDocument.numPages);
      this.currentPageNumber.set(1);
      this.renderPage(this.currentPageNumber());
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  }

  async renderPage(pageNumber: number) {
    const page = await this.pdfDocument.getPage(pageNumber);

    const container = this.pdfContainer.nativeElement;
    const containerWidth = container.clientWidth;

    const unscaledViewport = page.getViewport({ scale: 1 });
    // const dynamicScale = containerWidth / unscaledViewport.width;

    // const actualScale = this.scale() === 1 ? dynamicScale : this.scale();

    const viewport = page.getViewport({ scale: this.scale() });

    container.innerHTML = '';

    const pageWrapper = document.createElement('div');
    pageWrapper.className = 'pageWrapper';
    pageWrapper.style.position = 'relative';
    pageWrapper.style.width = `${viewport.width}px`;
    pageWrapper.style.height = `${viewport.height}px`;
    container.appendChild(pageWrapper);

    const textContent = await page.getTextContent();

    const hasSubstantialText =
      textContent && textContent.items && textContent.items.length > 20;
    this.isTextBasedPdf.set(hasSubstantialText);

    if (!hasSubstantialText) {
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.className = 'pdf-canvas';
      pageWrapper.appendChild(canvas);

      const context = canvas.getContext('2d')!;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      // canvas.style.display = 'none'; // Hide canvas for text-heavy PDFs
      pageWrapper.appendChild(canvas);

      const context = canvas.getContext('2d')!;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      // Create and style the text layer for text-based documents
      const textLayerDiv = document.createElement('div');
      const textHeader = document.createElement('h2');
      textHeader.innerText = 'Abstracted Text';
      textLayerDiv.appendChild(textHeader);
      textLayerDiv.className = 'textLayer text-based';
      textLayerDiv.style.width = `${viewport.width}px`;
      textLayerDiv.style.height = `${viewport.height}px`;
      // textLayerDiv.style.position = 'absolute';
      // textLayerDiv.style.top = '0';
      // textLayerDiv.style.left = '0';
      pageWrapper.appendChild(textLayerDiv);

      const textLayer = new pdfjsLib.TextLayer({
        textContentSource: textContent,
        container: textLayerDiv,
        viewport: viewport,
      });

      await textLayer.render();
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
}
