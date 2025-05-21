import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pdf-input',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './pdf-input.component.html',
  styleUrl: './pdf-input.component.scss',
})
export class PdfInputComponent {
  @Output() fileSelected = new EventEmitter<File>();

  triggerFileInput() {
    const fileInput = document.getElementById('pdf') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileSelected.emit(file);
    }
  }
}
