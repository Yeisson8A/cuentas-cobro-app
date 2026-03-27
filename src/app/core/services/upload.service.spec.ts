import { TestBed } from '@angular/core/testing';
import { UploadService } from './upload.service';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('UploadService', () => {
  let service: UploadService;
  let httpMock: HttpTestingController;

  const webhookUrl = environment.webhookUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UploadService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(UploadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload file using POST and return response', async () => {
    const mockResponse = { success: true };

    const file = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    });

    const promise = service.upload(file);

    const req = httpMock.expectOne(webhookUrl);

    expect(req.request.method).toBe('POST');

    // validar FormData
    const body = req.request.body as FormData;
    expect(body instanceof FormData).toBeTrue();

    // validar que contiene el archivo
    const sentFile = body.get('data') as File;
    expect(sentFile).toBeTruthy();
    expect(sentFile.name).toBe('test.pdf');

    req.flush(mockResponse);

    const result = await promise;

    expect(result).toEqual(mockResponse);
  });

  it('should handle HTTP error', async () => {
    const file = new File(['test'], 'test.pdf', {
      type: 'application/pdf',
    });

    const promise = service.upload(file);

    const req = httpMock.expectOne(webhookUrl);

    req.flush('Error', {
      status: 500,
      statusText: 'Server Error',
    });

    await expectAsync(promise).toBeRejected();
  });

  it('should send file with key "data"', async () => {
    const file = new File(['abc'], 'file.pdf');

    const promise = service.upload(file);

    const req = httpMock.expectOne(webhookUrl);

    const body = req.request.body as FormData;

    expect(body.has('data')).toBeTrue();

    req.flush({});

    await promise;
  });
});
