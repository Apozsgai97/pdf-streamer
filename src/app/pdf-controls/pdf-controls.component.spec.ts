import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfControlsComponent } from './pdf-controls.component';

describe('PdfControlsComponent', () => {
  let component: PdfControlsComponent;
  let fixture: ComponentFixture<PdfControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
