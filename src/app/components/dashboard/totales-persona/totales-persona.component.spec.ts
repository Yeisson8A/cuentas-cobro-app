import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TotalesPersonaComponent } from './totales-persona.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as XLSX from 'xlsx';

describe('TotalesPersonaComponent', () => {
  let component: TotalesPersonaComponent;
  let fixture: ComponentFixture<TotalesPersonaComponent>;

  const mockData = [
    { nombre: 'Juan Perez', identificacion: '123', cantidad: 2, total: 1000 },
    { nombre: 'Maria Lopez', identificacion: '456', cantidad: 1, total: 500 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalesPersonaComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalesPersonaComponent);
    component = fixture.componentInstance;
    component.data = mockData;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the data into the dataSource on startup (ngOnInit)', () => {
    component.ngOnInit();
    expect(component.dataSource.data.length).toBe(2);
    expect(component.dataSource.data).toEqual(mockData);
  });

  it('should update the dataSource when the inputs change (ngOnChanges)', () => {
    const newData = [
      { nombre: 'Carlos', identificacion: '789', cantidad: 5, total: 2000 },
    ];
    component.data = newData;
    component.ngOnChanges();

    expect(component.dataSource.data).toEqual(newData);
  });

  it('should filter the data from the data source', () => {
    const event = { target: { value: 'Juan' } } as unknown as Event;
    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('juan');
    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].nombre).toBe('Juan Perez');
  });

  it('should call the XLSX functions when exporting', () => {
    component.ngOnInit();

    spyOn(XLSX.utils, 'json_to_sheet').and.returnValue({} as any);
    spyOn(XLSX.utils, 'book_new').and.returnValue({} as any);
    spyOn(XLSX.utils, 'book_append_sheet');

    const exportSpy = spyOn(component, 'exportFile');

    component.exportToExcel();

    expect(exportSpy).toHaveBeenCalledWith(
      jasmine.any(Object),
      'cuentas_por_persona.xlsx',
    );
  });

  it('should configure the paginator and sorting after the view has loaded (ngAfterViewInit)', () => {
    // Forzamos la detección de cambios para que ViewChild capture los elementos
    fixture.detectChanges();
    component.ngAfterViewInit();

    expect(component.dataSource.paginator).toBeDefined();
    expect(component.dataSource.sort).toBeDefined();
  });
});
