import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalesPersonaComponent } from './totales-persona.component';

describe('TotalesPersonaComponent', () => {
  let component: TotalesPersonaComponent;
  let fixture: ComponentFixture<TotalesPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalesPersonaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalesPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
