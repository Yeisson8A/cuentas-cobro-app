import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [NotificationService, { provide: MatSnackBar, useValue: spy }],
    });

    service = TestBed.inject(NotificationService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show success notification', () => {
    service.success('OK');

    expect(snackBarSpy.open).toHaveBeenCalledWith('OK', 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  });

  it('should show warning notification', () => {
    service.warning('Warning');

    expect(snackBarSpy.open).toHaveBeenCalledWith('Warning', 'Cerrar', {
      duration: 4000,
      panelClass: ['snackbar-warning'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  });

  it('should show error notification', () => {
    service.error('Error');

    expect(snackBarSpy.open).toHaveBeenCalledWith('Error', 'Cerrar', {
      duration: 4000,
      panelClass: ['snackbar-error'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  });

  it('should call snackbar once', () => {
    service.success('Test');

    expect(snackBarSpy.open).toHaveBeenCalledTimes(1);
  });
});
