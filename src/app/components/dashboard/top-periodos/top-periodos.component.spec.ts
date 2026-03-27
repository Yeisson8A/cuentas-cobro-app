import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopPeriodosComponent } from './top-periodos.component';

describe('TopPeriodosComponent', () => {
  let component: TopPeriodosComponent;
  let fixture: ComponentFixture<TopPeriodosComponent>;

  let setOptionSpy: jasmine.Spy;
  let chartDiv: HTMLElement;

  beforeEach(async () => {
    setOptionSpy = jasmine.createSpy('setOption');

    await TestBed.configureTestingModule({
      imports: [TopPeriodosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopPeriodosComponent);
    component = fixture.componentInstance;

    // crear div dentro del fixture (correcto)
    chartDiv = document.createElement('div');
    chartDiv.id = 'pieChart';
    fixture.nativeElement.appendChild(chartDiv);

    fixture.detectChanges();
  });

  afterEach(() => {
    // limpiar SOLO lo que creaste
    if (chartDiv && chartDiv.parentNode) {
      chartDiv.parentNode.removeChild(chartDiv);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call renderChart when data is present', () => {
    const spy = spyOn(component, 'renderChart');

    component.data = [{ periodo: '2026-01', total: 100 }];
    component.ngOnChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should NOT call renderChart if data is empty', () => {
    const spy = spyOn(component, 'renderChart');

    component.data = [];
    component.ngOnChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should format data correctly for chart', () => {
    component.data = [
      { periodo: '2026-01', total: 100 },
      { periodo: '2026-02', total: 200 },
    ];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    expect(createChartSpy).toHaveBeenCalled();
    expect(setOptionSpy).toHaveBeenCalled();

    const option = setOptionSpy.calls.mostRecent().args[0];

    expect(option.series[0].data).toEqual([
      { name: '2026-01', value: 100 },
      { name: '2026-02', value: 200 },
    ]);
  });

  it('should configure chart with correct properties', () => {
    component.data = [{ periodo: '2026-01', total: 100 }];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    const option = setOptionSpy.calls.mostRecent().args[0];

    expect(option.series[0].type).toBe('pie');
    expect(option.series[0].radius).toEqual(['40%', '70%']);
    expect(option.legend.orient).toBe('vertical');
  });

  it('should set color palette', () => {
    component.data = [{ periodo: '2026-01', total: 100 }];

    const createChartSpy = spyOn(component, 'createChart').and.returnValue({
      setOption: setOptionSpy,
    } as any);

    component.renderChart();

    const option = setOptionSpy.calls.mostRecent().args[0];

    expect(option.color.length).toBeGreaterThan(0);
  });
});
