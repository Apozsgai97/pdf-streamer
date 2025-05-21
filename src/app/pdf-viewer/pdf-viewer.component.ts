import {
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { PdfService } from '../pdf.service';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.scss',
})
export class PdfViewerComponent {
  @ViewChild('pdfContainer', { static: true })
  pdfContainer!: ElementRef<HTMLDivElement>;

  private pdfService = inject(PdfService);

  ngAfterViewInit() {
    this.pdfService.setContainer(this.pdfContainer.nativeElement);
  }

  async loadPdfFromBuffer(buffer: ArrayBuffer) {
    await this.pdfService.loadPdfFromBuffer(buffer);
  }
}
