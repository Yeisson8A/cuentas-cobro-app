import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.apiUrl}/kpis`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET request and return data', async () => {
    const mockResponse = { total: 100 };

    const promise = service.get('/resumen');

    const req = httpMock.expectOne(`${baseUrl}/resumen`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);

    const result = await promise;

    expect(result).toEqual(mockResponse);
  });

  it('should return typed response', async () => {
    interface Resumen {
      total: number;
    }

    const mockResponse: Resumen = { total: 200 };

    const promise = service.get<Resumen>('/resumen');

    const req = httpMock.expectOne(`${baseUrl}/resumen`);
    req.flush(mockResponse);

    const result = await promise;

    expect(result.total).toBe(200);
  });

  it('should handle HTTP error', async () => {
    const promise = service.get('/resumen');

    const req = httpMock.expectOne(`${baseUrl}/resumen`);

    req.flush('Error', {
      status: 500,
      statusText: 'Server Error',
    });

    try {
      await promise;
      fail('should have thrown error');
    } catch (error: any) {
      expect(error.status).toBe(500);
    }
  });
});
