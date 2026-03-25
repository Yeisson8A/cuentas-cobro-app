import { Component, Input, OnChanges } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-waterfall-crecimiento',
  standalone: true,
  imports: [],
  templateUrl: './waterfall-crecimiento.component.html',
  styleUrl: './waterfall-crecimiento.component.scss'
})
export class WaterfallCrecimientoComponent implements OnChanges {
  @Input() data: any[] = [];

  ngOnChanges() {
    if (this.data.length) {
      this.renderChart();
    }
  }

  renderChart() {
    const chartDom = document.getElementById('chart')!;
    const myChart = echarts.init(chartDom);

    const periods = this.data.map(d => d.periodo);
    const values = this.data.map(d => d.crecimiento);

    // Transformar para waterfall
    let cumulative = 0;

    const base: any[] = [];
    const actual: any[] = [];

    values.forEach((val) => {
      base.push(cumulative);
      cumulative += val;
      actual.push(val);
    });

    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const value = params[1].value;
          return `${params[1].name}: ${value}%`;
        }
      },
      xAxis: {
        type: 'category',
        data: periods
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%'
        }
      },
      series: [
        {
          name: 'Base',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            color: 'transparent'
          },
          data: base
        },
        {
          name: 'Crecimiento',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%'
          },
          itemStyle: {
            color: (params: any) => {
              return params.value >= 0 ? '#2e7d32' : '#c62828';
            }
          },
          data: actual
        }
      ],
      dataZoom: [
        {
          type: 'inside',
        },
        {
          type: 'slider',
        },
      ],
    };

    myChart.setOption(option);
  }
}
