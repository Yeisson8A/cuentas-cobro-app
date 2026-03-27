import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadComponent } from './upload.component';
import { UploadService } from '../../core/services/upload.service';
import { NotificationService } from '../../core/services/notification.service';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  let uploadServiceSpy: jasmine.SpyObj<UploadService>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    uploadServiceSpy = jasmine.createSpyObj('UploadService', ['upload']);
    notificationSpy = jasmine.createSpyObj('NotificationService', [
      'success',
      'warning',
      'error',
    ]);

    await TestBed.configureTestingModule({
      imports: [UploadComponent],
      providers: [
        { provide: UploadService, useValue: uploadServiceSpy },
        { provide: NotificationService, useValue: notificationSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;

    // mock del input file
    component.fileInput = {
      nativeElement: { value: '' },
    } as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedFile if PDF is valid', () => {
    const file = new File(['data'], 'test.pdf', { type: 'application/pdf' });

    const event = {
      target: {
        files: [file],
      },
    };

    component.onFileSelected(event);

    expect(component.selectedFile).toBe(file);
  });

  it('should show warning if file is not PDF', () => {
    const file = new File(['data'], 'test.txt', { type: 'text/plain' });

    const event = {
      target: {
        files: [file],
      },
    };

    component.onFileSelected(event);

    expect(notificationSpy.warning).toHaveBeenCalledWith(
      'Solo se permiten archivos PDF',
    );
    expect(component.selectedFile).toBeUndefined();
  });

  it('should not upload if no file selected', async () => {
    await component.upload();

    expect(uploadServiceSpy.upload).not.toHaveBeenCalled();
  });

  it('should upload file and show success', async () => {
    const file = new File(['data'], 'test.pdf');
    component.selectedFile = file;

    uploadServiceSpy.upload.and.resolveTo({
      message: 'OK',
    });

    await component.upload();

    expect(uploadServiceSpy.upload).toHaveBeenCalledWith(file);
    expect(notificationSpy.success).toHaveBeenCalledWith('OK');
    expect(component.selectedFile).toBeUndefined();
    expect(component.loading).toBeFalse();
  });

  it('should show warning if response has error', async () => {
    const file = new File(['data'], 'test.pdf');
    component.selectedFile = file;

    uploadServiceSpy.upload.and.resolveTo({
      error: true,
      message: 'Algo salió mal',
    });

    await component.upload();

    expect(notificationSpy.warning).toHaveBeenCalledWith('Algo salió mal');
  });

  it('should show error if upload fails', async () => {
    const file = new File(['data'], 'test.pdf');
    component.selectedFile = file;

    uploadServiceSpy.upload.and.rejectWith({
      message: 'Error server',
    });

    await component.upload();

    expect(notificationSpy.error).toHaveBeenCalledWith('Error server');
    expect(component.loading).toBeFalse();
  });

  it('should reset file input after upload', async () => {
    const file = new File(['data'], 'test.pdf');
    component.selectedFile = file;

    uploadServiceSpy.upload.and.resolveTo({ message: 'OK' });

    await component.upload();

    expect(component.fileInput.nativeElement.value).toBe('');
  });

  it('should toggle loading state correctly', async () => {
    const file = new File(['data'], 'test.pdf');
    component.selectedFile = file;

    uploadServiceSpy.upload.and.callFake(async () => {
      expect(component.loading).toBeTrue();
      return { message: 'OK' };
    });

    await component.upload();

    expect(component.loading).toBeFalse();
  });
});
