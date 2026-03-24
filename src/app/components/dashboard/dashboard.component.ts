import { Component, OnInit } from '@angular/core';
import { KpisService } from '../../core/services/kpis.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  resumen: any;
  periodos: any[] = [];
  personas: any[] = [];
  top: any[] = [];
  crecimiento: any[] = [];
  fechaInicio!: Date;
  fechaFin!: Date;
  loading = false;
  error = '';

  constructor(private kpis: KpisService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    this.error = '';

    try {
      this.resumen = await this.kpis.resumen();
      this.periodos = await this.kpis.porPeriodo();
      this.personas = await this.kpis.porPersona();
      this.top = await this.kpis.topPeriodos();
      this.crecimiento = await this.kpis.crecimiento();
    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  async aplicarFiltro() {
    if (!this.fechaInicio || !this.fechaFin) {
      this.error = 'Selecciona ambas fechas';
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      const inicio = this.formatDate(this.fechaInicio);
      const fin = this.formatDate(this.fechaFin);

      const data = await this.kpis.porRango(inicio, fin);

      // 👉 actualizamos resumen con rango
      this.resumen = {
        total_cuentas: data.total,
        total_facturado: data.total_valor,
      };
    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  // 🔹 Helper formato YYYY-MM-DD
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
