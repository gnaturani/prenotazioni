import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiePrenotazioniComponent } from './mie-prenotazioni.component';

describe('MiePrenotazioniComponent', () => {
  let component: MiePrenotazioniComponent;
  let fixture: ComponentFixture<MiePrenotazioniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiePrenotazioniComponent]
    });
    fixture = TestBed.createComponent(MiePrenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
