import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be defined', () => {
    expect(errorInterceptor).toBeTruthy();
  });

  it('should transform backend error message', (done) => {
    http.get('/test').subscribe({
      next: () => fail('should fail'),
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Error personalizado');
        done();
      },
    });

    const req = httpMock.expectOne('/test');

    req.flush(
      { message: 'Error personalizado' },
      { status: 400, statusText: 'Bad Request' }
    );
  });

  it('should return default message if no backend message', (done) => {
    http.get('/test').subscribe({
      next: () => fail('should fail'),
      error: (err) => {
        expect(err.message).toBe('Ha ocurrido un error');
        done();
      },
    });

    const req = httpMock.expectOne('/test');

    req.flush(
      {},
      { status: 500, statusText: 'Server Error' }
    );
  });

  it('should handle error with no error object', (done) => {
    http.get('/test').subscribe({
      next: () => fail('should fail'),
      error: (err) => {
        expect(err.message).toBe('Ha ocurrido un error');
        done();
      },
    });

    const req = httpMock.expectOne('/test');

    req.error(new ProgressEvent('error'));
  });

  it('should log error to console', (done) => {
    spyOn(console, 'error');

    http.get('/test').subscribe({
      next: () => fail('should fail'),
      error: () => {
        expect(console.error).toHaveBeenCalled();
        done();
      },
    });

    const req = httpMock.expectOne('/test');

    req.flush(
      { message: 'Error log' },
      { status: 400, statusText: 'Bad Request' }
    );
  });
});