import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pdf-input',
  imports: [],
  templateUrl: './pdf-input.component.html',
  styleUrl: './pdf-input.component.scss',
})
export class PdfInputComponent {
  @Output() fileSelected = new EventEmitter<File>()
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileSelected.emit(file);
    }
  }
}
