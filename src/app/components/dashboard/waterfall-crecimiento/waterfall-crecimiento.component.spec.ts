import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaterfallCrecimientoComponent } from './waterfall-crecimiento.component';

describe('WaterfallCrecimientoComponent', () => {
  let component: WaterfallCrecimientoComponent;
  let fixture: ComponentFixture<WaterfallCrecimientoComponent>;

  let setOptionSpy: jasmine.Spy;
  let chartDiv: HTMLElement;

  beforeEach(async () => {
    setOptionSpy = jasmine.createSpy('setOption');

    await TestBed.configureTestingModule({
      imports: [WaterfallCrecimientoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WaterfallCrecimientoComponent);
    component = fixture.componentInstance;

    // crear contenedor del chart
    chartDiv = document.createElement('div');
    chartDiv.id = 'chart';
    fixture.nativeElement.appendChild(chartDiv);

    fixture.detectChanges();
  });

  afterEach(() => {
    if (chartDiv && chartDiv.parentNode) {
      chartDiv.parentNode.removeChild(chartDiv);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call renderChart when data exists', () => {
    const spy = spyOn(component, 'renderChart');

    component.data = [{ periodo: '2026-01', crecimiento: 10 }];
    component.ngOnChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should NOT call renderChart if data is empty', () => {
    const spy = spyOn(component, 'renderChart');

    component.data = [];
    component.ngOnChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should transform data into waterfall structure', () => {
    component.data = [
      { periodo: '2026-01', crecimiento: 10 },
      { periodo: '2026-02', crecimiento: 20 },
      { periodo: '2026-03', crecimiento: -5 },
    ];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    const option = setOptionSpy.calls.mostRecent().args[0];

    // base acumulada
    expect(option.series[0].data).toEqual([0, 10, 30]);

    // valores reales
    expect(option.series[1].data).toEqual([10, 20, -5]);
  });

  it('should map periods correctly', () => {
    component.data = [
      { periodo: '2026-01', crecimiento: 10 },
      { periodo: '2026-02', crecimiento: 20 },
    ];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    const option = setOptionSpy.calls.mostRecent().args[0];

    expect(option.xAxis.data).toEqual(['2026-01', '2026-02']);
  });

  it('should assign green color for positive values', () => {
    component.data = [{ periodo: '2026-01', crecimiento: 10 }];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    const option = setOptionSpy.calls.mostRecent().args[0];

    const colorFn = option.series[1].itemStyle.color;

    expect(colorFn({ value: 10 })).toBe('#2e7d32');
  });

  it('should assign red color for negative values', () => {
    component.data = [{ periodo: '2026-01', crecimiento: -10 }];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    const option = setOptionSpy.calls.mostRecent().args[0];

    const colorFn = option.series[1].itemStyle.color;

    expect(colorFn({ value: -10 })).toBe('#c62828');
  });

  it('should configure stacked bar chart', () => {
    component.data = [{ periodo: '2026-01', crecimiento: 10 }];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    const option = setOptionSpy.calls.mostRecent().args[0];

    expect(option.series[0].type).toBe('bar');
    expect(option.series[1].type).toBe('bar');
    expect(option.series[0].stack).toBe('total');
    expect(option.series[1].stack).toBe('total');
  });

  it('should format tooltip correctly', () => {
    component.data = [{ periodo: '2026-01', crecimiento: 10 }];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    const option = setOptionSpy.calls.mostRecent().args[0];

    const formatter = option.tooltip.formatter;

    const result = formatter([
      {}, // base
      { name: '2026-01', value: 10 },
    ]);

    expect(result).toContain('2026-01');
    expect(result).toContain('10%');
  });

  it('should include dataZoom controls', () => {
    component.data = [{ periodo: '2026-01', crecimiento: 10 }];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    const option = setOptionSpy.calls.mostRecent().args[0];

    expect(option.dataZoom.length).toBe(2);
  });
});
