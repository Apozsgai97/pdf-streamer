import {
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PdfService } from '../pdf.service';

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

  private pdfService = inject(PdfService);

  currentPageNumber = this.pdfService.currentPageNumber;
  totalPages = this.pdfService.totalPages;
  scale = this.pdfService.scale;
  documentLoaded = this.pdfService.documentLoaded;
  isTextBasedPdf = this.pdfService.isTextBasedPdf;
  showText = this.pdfService.showText;

  ngAfterViewInit() {
    this.pdfService.setContainer(this.pdfContainer.nativeElement);
  }

  async loadPdfFromBuffer(buffer: ArrayBuffer) {
    await this.pdfService.loadPdfFromBuffer(buffer);
  }

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
