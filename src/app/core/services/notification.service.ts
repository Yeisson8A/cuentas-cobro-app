import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export type NotificationType = 'success' | 'error' | 'warning';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  private show(message: string, type: NotificationType, duration = 3000) {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      panelClass: [`snackbar-${type}`],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  success(message: string) {
    this.show(message, 'success', 3000);
  }

  warning(message: string) {
    this.show(message, 'warning', 4000);
  }

  error(message: string) {
    this.show(message, 'error', 4000);
  }
}