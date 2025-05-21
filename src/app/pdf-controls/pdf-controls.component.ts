import { Component, inject } from '@angular/core';
import { PdfService } from '../pdf.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pdf-controls',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './pdf-controls.component.html',
  styleUrl: './pdf-controls.component.scss',
})
export class PdfControlsComponent {
  private pdfService = inject(PdfService);
  currentPageNumber = this.pdfService.currentPageNumber;
  totalPages = this.pdfService.totalPages;
  scale = this.pdfService.scale;
  isTextBasedPdf = this.pdfService.isTextBasedPdf;
  showText = this.pdfService.showText;

  nextPage() {
    this.pdfService.nextPage();
  }

  previousPage() {
    this.pdfService.previousPage();
  }

  zoomIn() {
    this.pdfService.zoomIn();
  }

  zoomOut() {
    this.pdfService.zoomOut();
  }

  toggleTextView() {
    this.pdfService.toggleTextView();
  }
}
