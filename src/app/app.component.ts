import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfInputComponent } from './pdf-input/pdf-input.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { PdfControlsComponent } from "./pdf-controls/pdf-controls.component";

@Component({
  selector: 'app-root',
  imports: [PdfInputComponent, PdfViewerComponent, PdfControlsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pdf-streamer';
  @ViewChild('viewer') viewer!: PdfViewerComponent;

  async onPdfSelected(file: File) {
    const buffer = await file.arrayBuffer();
    this.viewer.loadPdfFromBuffer(buffer);
  }
}
