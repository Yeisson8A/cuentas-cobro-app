import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UploadService } from '../../core/services/upload.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  selectedFile?: File;
  loading = false;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private uploadService: UploadService, private notification: NotificationService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file && file.type !== 'application/pdf') {
      this.notification.warning('Solo se permiten archivos PDF');
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
            this.notification.warning(response?.message);
          }
          else {
            this.notification.success(response?.message);
          }
        })
        .catch((error) => {
          this.notification.error(error?.message);
        });
      this.selectedFile = undefined;
      // RESET del input
      this.fileInput.nativeElement.value = '';
    } catch (error: any) {
      this.notification.error(error?.message);
    } finally {
      this.loading = false;
    }
  }
}
