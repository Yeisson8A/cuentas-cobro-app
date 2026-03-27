import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import * as XLSX from 'xlsx';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-totales-persona',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    CurrencyPipe,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './totales-persona.component.html',
  styleUrl: './totales-persona.component.scss',
})
export class TotalesPersonaComponent {
  @Input() data: any[] = [];

  displayedColumns: string[] = [
    'nombre',
    'identificacion',
    'cantidad',
    'total',
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    this.dataSource.data = this.data;
  }

  // FILTRO GLOBAL
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  exportFile(workbook: any, fileName: string) {
    XLSX.writeFile(workbook, fileName);
  }

  // EXPORTAR A EXCEL
  exportToExcel() {
    const data = this.dataSource.filteredData.map((item) => ({
      Nombre: item.nombre,
      Identificación: item.identificacion,
      Cantidad: item.cantidad,
      Total: item.total,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cuentas');
    this.exportFile(workbook, 'cuentas_por_persona.xlsx');
  }
}
