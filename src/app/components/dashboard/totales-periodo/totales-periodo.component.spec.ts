import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalesPeriodoComponent } from './totales-periodo.component';

describe('TotalesPeriodoComponent', () => {
  let component: TotalesPeriodoComponent;
  let fixture: ComponentFixture<TotalesPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalesPeriodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalesPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
