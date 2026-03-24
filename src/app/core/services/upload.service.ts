import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private http = inject(HttpClient);

  webhookUrl = environment.webhookUrl;

  async upload(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('data', file);

    return await firstValueFrom(this.http.post(this.webhookUrl, formData));
  }
}
