import { Component, OnInit } from '@angular/core';
import { KpisService } from '../../core/services/kpis.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Crecimiento,
  Periodo,
  Persona,
  Resumen,
  TopPeriodo,
} from '../../core/models/kpis.model';
import { WaterfallCrecimientoComponent } from './waterfall-crecimiento/waterfall-crecimiento.component';
import { UltimoCrecimientoComponent } from './ultimo-crecimiento/ultimo-crecimiento.component';
import { TotalesPeriodoComponent } from './totales-periodo/totales-periodo.component';
import { TopPeriodosComponent } from './top-periodos/top-periodos.component';
import { TotalesPersonaComponent } from './totales-persona/totales-persona.component';
import { NotificationService } from '../../core/services/notification.service';

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
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    WaterfallCrecimientoComponent,
    UltimoCrecimientoComponent,
    TotalesPeriodoComponent,
    TopPeriodosComponent,
    TotalesPersonaComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  resumen?: Resumen = undefined;
  periodos: Periodo[] = [];
  personas: Persona[] = [];
  top: TopPeriodo[] = [];
  ultimo_crecimiento: Crecimiento[] = [];
  crecimiento: Crecimiento[] = [];
  fechaInicio?: Date;
  fechaFin?: Date;
  loading = false;
  metric: 'total' | 'cantidad' = 'total';

  constructor(private kpis: KpisService, private notification: NotificationService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading = true;

    try {
      this.resumen = await this.kpis.resumen();
      this.periodos = await this.kpis.porPeriodo();
      this.personas = await this.kpis.porPersona();
      this.top = await this.kpis.topPeriodos();
      this.crecimiento = await this.kpis.crecimiento();
      this.obtenerUltimoCrecimiento();
    } catch (err: any) {
      this.notification.error(err.message);
    } finally {
      this.loading = false;
    }
  }

  async aplicarFiltro() {
    this.loading = true;

    if (this.fechaInicio! > this.fechaFin!) {
      this.notification.warning("La fecha inicial debe ser menor o igual a la fecha final");
      this.loading = false;
      return;
    }

    try {
      const inicio = this.formatDate(this.fechaInicio!);
      const fin = this.formatDate(this.fechaFin!);

      const data = await this.kpis.porRango(inicio, fin);

      // Actualizamos resumen con rango
      this.resumen = {
        total_cuentas: data.total,
        total_facturado: data.total_valor,
        promedio: 0,
      };
    } catch (err: any) {
      this.notification.error(err.message);
    } finally {
      this.loading = false;
    }
  }

  // Helper formato YYYY-MM-DD
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  async limpiarFiltro() {
    this.fechaInicio = undefined;
    this.fechaFin = undefined;

    // Actualizamos resumen original
    this.resumen = await this.kpis.resumen();
  }

  async obtenerUltimoCrecimiento() {
    await this.kpis.crecimiento().then((data) => {
      const crecimiento_desc = [...data].sort((a, b) =>
        b.periodo.localeCompare(a.periodo),
      );
      this.ultimo_crecimiento = crecimiento_desc.slice(0, 1);
    });
  }
}
