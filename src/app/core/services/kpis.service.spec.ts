import { TestBed } from '@angular/core/testing';
import { KpisService } from './kpis.service';
import { ApiService } from './api.service';

describe('KpisService', () => {
  let service: KpisService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [KpisService, { provide: ApiService, useValue: spy }],
    });

    service = TestBed.inject(KpisService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should return resumen data', async () => {
    const mockResponse = {
      data: {
        total_cuentas: 10,
        total_facturado: 1000,
        promedio: 100,
      },
    };

    apiServiceSpy.get.and.resolveTo(mockResponse);

    const result = await service.resumen();

    expect(apiServiceSpy.get).toHaveBeenCalledWith('/resumen');
    expect(result).toEqual(mockResponse.data);
  });

  it('should return periodos', async () => {
    const mockResponse = {
      data: [{ periodo: '2026-02', total: 1000 }],
    };

    apiServiceSpy.get.and.resolveTo(mockResponse);

    const result = await service.porPeriodo();

    expect(apiServiceSpy.get).toHaveBeenCalledWith('/por-periodo');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return personas', async () => {
    const mockResponse = {
      data: [{ nombre: 'Test', total: 500 }],
    };

    apiServiceSpy.get.and.resolveTo(mockResponse);

    const result = await service.porPersona();

    expect(apiServiceSpy.get).toHaveBeenCalledWith('/por-persona');
    expect(result[0].nombre).toBe('Test');
  });

  it('should return top periodos', async () => {
    const mockResponse = {
      data: [{ periodo: '2026-02', total: 2000 }],
    };

    apiServiceSpy.get.and.resolveTo(mockResponse);

    const result = await service.topPeriodos();

    expect(apiServiceSpy.get).toHaveBeenCalledWith('/top-periodos');
    expect(result[0].total).toBe(2000);
  });

  it('should return crecimiento mensual', async () => {
    const mockResponse = {
      data: [{ periodo: '2026-02', crecimiento: 10 }],
    };

    apiServiceSpy.get.and.resolveTo(mockResponse);

    const result = await service.crecimiento();

    expect(apiServiceSpy.get).toHaveBeenCalledWith('/crecimiento-mensual');
    expect(result[0].crecimiento).toBe(10);
  });

  it('should return data for date range', async () => {
    const mockResponse = {
      data: { total: 10, total_valor: 1000 },
    };

    apiServiceSpy.get.and.resolveTo(mockResponse);

    const result = await service.porRango('2026-02-01', '2026-02-28');

    expect(apiServiceSpy.get).toHaveBeenCalledWith(
      '/por-rango-fechas?fecha_inicio=2026-02-01&fecha_fin=2026-02-28',
    );

    expect(result).toEqual(mockResponse.data);
  });

  it('should throw error if api fails', async () => {
    apiServiceSpy.get.and.rejectWith(new Error('API Error'));

    await expectAsync(service.resumen()).toBeRejectedWithError('API Error');
  });
});
