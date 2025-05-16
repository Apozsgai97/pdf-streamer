import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss',
})
export class PdfViewerComponent {
  @ViewChild('pdfContainer', { static: true })
  pdfContainer!: ElementRef<HTMLDivElement>;
  private pdfDocument: any;
  private currentPageNumber: number = 1;
  totalPages: number = 0;


  async loadPdfFromBuffer(buffer: ArrayBuffer) {
    try {
      const pdfjs = pdfjsLib as any;
      pdfjs.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.min.mjs';

      const loadingTask = pdfjs.getDocument({data: buffer});
      this.pdfDocument = await loadingTask.promise;
      this.totalPages = this.pdfDocument.numPages;
      this.renderPage(this.currentPageNumber);
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  }

  async renderPage(pageNumber: number) {
    const page = await this.pdfDocument.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const container = this.pdfContainer.nativeElement;
    container.innerHTML = ''; // Clear previous content
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;
  }

  nextPage() {
    if (this.currentPageNumber < this.totalPages) {
      this.currentPageNumber++;
      this.renderPage(this.currentPageNumber);
    }
  }
  previousPage() {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber--;
      this.renderPage(this.currentPageNumber);
    }
  }
}
