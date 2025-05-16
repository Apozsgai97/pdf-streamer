import { Component } from '@angular/core';

@Component({
  selector: 'app-pdf-input',
  imports: [],
  templateUrl: './pdf-input.component.html',
  styleUrl: './pdf-input.component.scss',
})
export class PdfInputComponent {
  onFileSelected(event: Event) {
    console.log('File selected:', event);
  }
}
