import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UploadService } from '../../core/services/upload.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  selectedFile?: File;
  loading = false;

  constructor(private uploadService: UploadService, private snackBar: MatSnackBar) {}

  showSuccess(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-success'],
    });
  }

  showWarning(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      panelClass: ['snackbar-warning'],
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      panelClass: ['snackbar-error'],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file && file.type !== 'application/pdf') {
      this.showWarning('Solo se permiten archivos PDF');
      return;
    }

    this.selectedFile = file;
  }

  async upload() {
    if (!this.selectedFile) return;

    this.loading = true;

    try {
      await this.uploadService
        .upload(this.selectedFile)
        .then((response) => {
          if (response?.error) {
            this.showWarning(response?.message);
          }
          else {
            this.showSuccess(response?.message);
          }
        })
        .catch((error) => {
          this.showError(error?.message);
        });
      this.selectedFile = undefined;
    } catch (error: any) {
      this.showError(error?.message);
    } finally {
      this.loading = false;
    }
  }
}
