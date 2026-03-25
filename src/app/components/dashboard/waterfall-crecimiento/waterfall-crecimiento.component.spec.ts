import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterfallCrecimientoComponent } from './waterfall-crecimiento.component';

describe('WaterfallCrecimientoComponent', () => {
  let component: WaterfallCrecimientoComponent;
  let fixture: ComponentFixture<WaterfallCrecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterfallCrecimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterfallCrecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
