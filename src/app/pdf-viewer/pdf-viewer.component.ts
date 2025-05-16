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
export class PdfViewerComponent implements OnInit {
  @ViewChild('pdfContainer', { static: true })
  pdfContainer!: ElementRef<HTMLDivElement>;
  private pdfDocument: any;
  private currentPageNumber: number = 1;
  totalPages: number = 0;

  
  ngOnInit(): void {
    this.loadPdf();
  }

  async loadPdf() {
    try {
    const pdfjs = pdfjsLib as any;
    pdfjs.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.min.mjs';

    const loadingTask = pdfjs.getDocument('assets/test.pdf');
    this.pdfDocument = await loadingTask.promise;
    this.totalPages = this.pdfDocument.numPages;
    this.renderPage(this.currentPageNumber);
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  }

  async renderPage(pageNumber: number) {
    const page = await this.pdfDocument.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 2 });
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

}
