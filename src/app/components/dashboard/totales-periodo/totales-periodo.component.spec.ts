import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TotalesPeriodoComponent } from './totales-periodo.component';

describe('TotalesPeriodoComponent', () => {
  let component: TotalesPeriodoComponent;
  let fixture: ComponentFixture<TotalesPeriodoComponent>;

  let setOptionSpy: jasmine.Spy;
  let chartDiv: HTMLElement;

  beforeEach(async () => {
    setOptionSpy = jasmine.createSpy('setOption');

    await TestBed.configureTestingModule({
      imports: [TotalesPeriodoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalesPeriodoComponent);
    component = fixture.componentInstance;

    // usar fixture en vez de document.body
    chartDiv = document.createElement('div');
    chartDiv.id = 'lineChart';
    fixture.nativeElement.appendChild(chartDiv);

    fixture.detectChanges();
  });

  afterEach(() => {
    // limpiar SOLO el elemento creado
    if (chartDiv && chartDiv.parentNode) {
      chartDiv.parentNode.removeChild(chartDiv);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call renderChart when data exists', () => {
    const spy = spyOn(component, 'renderChart');

    component.data = [{ periodo: '2026-01', total: 100, cantidad: 2 }];
    component.ngOnChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should NOT call renderChart if data is empty', () => {
    const spy = spyOn(component, 'renderChart');

    component.data = [];
    component.ngOnChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should render chart with total metric', () => {
    component.metric = 'total';
    component.data = [
      { periodo: '2026-01', total: 100, cantidad: 2 },
      { periodo: '2026-02', total: 200, cantidad: 3 },
    ];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    const option = setOptionSpy.calls.mostRecent().args[0];

    expect(option.xAxis.data).toEqual(['2026-01', '2026-02']);
    expect(option.series[0].data).toEqual([100, 200]);
    expect(option.series[0].name).toBe('Total');
    expect(option.series[0].itemStyle.color).toBe('#1565c0');
  });

  it('should render chart with cantidad metric', () => {
    component.metric = 'cantidad';
    component.data = [
      { periodo: '2026-01', total: 100, cantidad: 2 },
      { periodo: '2026-02', total: 200, cantidad: 3 },
    ];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    const option = setOptionSpy.calls.mostRecent().args[0];

    expect(option.series[0].data).toEqual([2, 3]);
    expect(option.series[0].name).toBe('Cantidad');
    expect(option.series[0].itemStyle.color).toBe('#2e7d32');
  });

  it('should configure line chart', () => {
    component.data = [{ periodo: '2026-01', total: 100, cantidad: 1 }];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    const option = setOptionSpy.calls.mostRecent().args[0];

    expect(option.series[0].type).toBe('line');
    expect(option.series[0].smooth).toBeTrue();
  });

  it('should include dataZoom controls', () => {
    component.data = [{ periodo: '2026-01', total: 100, cantidad: 1 }];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    const option = setOptionSpy.calls.mostRecent().args[0];

    expect(option.dataZoom.length).toBe(2);
  });

  it('should format tooltip based on metric', () => {
    component.metric = 'total';
    component.data = [{ periodo: '2026-01', total: 100, cantidad: 1 }];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    const option = setOptionSpy.calls.mostRecent().args[0];

    const formatter = option.tooltip.formatter;

    const result = formatter([{ name: '2026-01', value: 100 }]);

    expect(result).toContain('Total');
  });
});
