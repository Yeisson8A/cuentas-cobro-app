import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  baseUrl = `${environment.apiUrl}/kpis`;

  async get<T>(url: string): Promise<T> {
    return await firstValueFrom(
      this.http.get<T>(`${this.baseUrl}${url}`)
    );
  }
}
