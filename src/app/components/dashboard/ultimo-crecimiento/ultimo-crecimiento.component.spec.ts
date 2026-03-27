import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UltimoCrecimientoComponent } from './ultimo-crecimiento.component';

describe('UltimoCrecimientoComponent', () => {
  let component: UltimoCrecimientoComponent;
  let fixture: ComponentFixture<UltimoCrecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltimoCrecimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltimoCrecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
