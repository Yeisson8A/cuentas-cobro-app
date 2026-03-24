import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/api-response.model';
import { Crecimiento, Periodo, Persona, RangoFechas, Resumen, TopPeriodo } from '../models/kpis.model';

@Injectable({ providedIn: 'root' })
export class KpisService {

  constructor(private api: ApiService) {}

  // RESUMEN
  async resumen(): Promise<Resumen> {
    const res = await this.api.get<ApiResponse<Resumen>>('/resumen');
    return res.data;
  }

  // POR PERIODO
  async porPeriodo(): Promise<Periodo[]> {
    const res = await this.api.get<ApiResponse<Periodo[]>>('/por-periodo');
    return res.data;
  }

  // POR PERSONA
  async porPersona(): Promise<Persona[]> {
    const res = await this.api.get<ApiResponse<Persona[]>>('/por-persona');
    return res.data;
  }

  // TOP PERIODOS
  async topPeriodos(): Promise<TopPeriodo[]> {
    const res = await this.api.get<ApiResponse<TopPeriodo[]>>('/top-periodos');
    return res.data;
  }

  // CRECIMIENTO
  async crecimiento(): Promise<Crecimiento[]> {
    const res = await this.api.get<ApiResponse<Crecimiento[]>>('/crecimiento-mensual');
    return res.data;
  }

  // POR RANGO DE FECHAS
  async porRango(fechaInicio: string, fechaFin: string): Promise<RangoFechas> {
    const res = await this.api.get<ApiResponse<RangoFechas>>(
      `/por-rango-fechas?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`
    );
    return res.data;
  }
}