export interface Resumen {
  total_cuentas: number;
  total_facturado: number;
  promedio: number;
}

export interface Periodo {
  periodo: string;
  cantidad: number;
  total: number;
}

export interface Persona {
  nombre: string;
  identificacion: string;
  cantidad: number;
  total: number;
}

export interface TopPeriodo {
  periodo: string;
  total: number;
}

export interface Crecimiento {
  periodo: string;
  total: number;
  crecimiento: number;
}

export interface RangoFechas {
  total: number;
  total_valor: number;
}