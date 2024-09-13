import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiornaPrenotazioneComponent } from './aggiorna-prenotazione.component';

describe('AggiornaPrenotazioneComponent', () => {
  let component: AggiornaPrenotazioneComponent;
  let fixture: ComponentFixture<AggiornaPrenotazioneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggiornaPrenotazioneComponent]
    });
    fixture = TestBed.createComponent(AggiornaPrenotazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
