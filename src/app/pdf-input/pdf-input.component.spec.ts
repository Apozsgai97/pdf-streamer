import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfInputComponent } from './pdf-input.component';

describe('PdfInputComponent', () => {
  let component: PdfInputComponent;
  let fixture: ComponentFixture<PdfInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PdfInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
