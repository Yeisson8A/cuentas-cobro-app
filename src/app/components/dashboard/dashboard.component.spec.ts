import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { KpisService } from '../../core/services/kpis.service';
import { NotificationService } from '../../core/services/notification.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let kpisServiceSpy: jasmine.SpyObj<KpisService>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    kpisServiceSpy = jasmine.createSpyObj('KpisService', [
      'resumen',
      'porPeriodo',
      'porPersona',
      'topPeriodos',
      'crecimiento',
      'porRango',
    ]);

    notificationSpy = jasmine.createSpyObj('NotificationService', [
      'error',
      'warning',
      'success',
    ]);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, NoopAnimationsModule],
      providers: [
        { provide: KpisService, useValue: kpisServiceSpy },
        { provide: NotificationService, useValue: notificationSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadData on init', async () => {
    spyOn(component, 'loadData');

    await component.ngOnInit();

    expect(component.loadData).toHaveBeenCalled();
  });

  it('should load all data correctly', async () => {
    kpisServiceSpy.resumen.and.resolveTo({ total_cuentas: 10, total_facturado: 1000, promedio: 100 });
    kpisServiceSpy.porPeriodo.and.resolveTo([]);
    kpisServiceSpy.porPersona.and.resolveTo([]);
    kpisServiceSpy.topPeriodos.and.resolveTo([]);
    kpisServiceSpy.crecimiento.and.resolveTo([
      { periodo: '2026-02', crecimiento: 10, total: 1000 },
    ]);

    await component.loadData();

    expect(component.resumen?.total_cuentas).toBe(10);
    expect(component.loading).toBeFalse();
    expect(kpisServiceSpy.resumen).toHaveBeenCalled();
  });

  it('should handle error in loadData', async () => {
    kpisServiceSpy.resumen.and.rejectWith(new Error('Error test'));

    await component.loadData();

    expect(notificationSpy.error).toHaveBeenCalledWith('Error test');
    expect(component.loading).toBeFalse();
  });

  it('should apply filter correctly', async () => {
    const mockResponse = { total: 5, total_valor: 500 };

    component.fechaInicio = new Date('2026-01-01');
    component.fechaFin = new Date('2026-01-31');

    kpisServiceSpy.porRango.and.resolveTo(mockResponse);

    await component.aplicarFiltro();

    expect(component.resumen?.total_cuentas).toBe(5);
    expect(component.resumen?.total_facturado).toBe(500);
  });

  it('should NOT apply filter if dates are invalid', async () => {
    component.fechaInicio = new Date('2026-02-01');
    component.fechaFin = new Date('2026-01-01');

    await component.aplicarFiltro();

    expect(notificationSpy.warning).toHaveBeenCalled();
    expect(kpisServiceSpy.porRango).not.toHaveBeenCalled();
  });

  it('should handle error in aplicarFiltro', async () => {
    component.fechaInicio = new Date('2026-01-01');
    component.fechaFin = new Date('2026-01-31');

    kpisServiceSpy.porRango.and.rejectWith(new Error('Filtro error'));

    await component.aplicarFiltro();

    expect(notificationSpy.error).toHaveBeenCalledWith('Filtro error');
  });

  it('should reset filters and reload resumen', async () => {
    kpisServiceSpy.resumen.and.resolveTo({
      total_cuentas: 20,
      total_facturado: 2000,
      promedio: 100,
    });

    component.fechaInicio = new Date();
    component.fechaFin = new Date();

    await component.limpiarFiltro();

    expect(component.fechaInicio).toBeUndefined();
    expect(component.fechaFin).toBeUndefined();
    expect(component.resumen?.total_cuentas).toBe(20);
  });

  it('should format date correctly', () => {
    const date = new Date('2026-01-15');

    const result = component.formatDate(date);

    expect(result).toBe('2026-01-15');
  });

  it('should get last crecimiento correctly', async () => {
    kpisServiceSpy.crecimiento.and.resolveTo([
      { periodo: '2026-01', crecimiento: 5, total: 1000 },
      { periodo: '2026-02', crecimiento: 10, total: 1000 },
    ]);

    await component.obtenerUltimoCrecimiento();

    expect(component.ultimo_crecimiento.length).toBe(1);
    expect(component.ultimo_crecimiento[0].periodo).toBe('2026-02');
  });
});
