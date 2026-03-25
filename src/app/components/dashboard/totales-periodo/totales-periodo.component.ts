import { Component, Input, OnChanges } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-totales-periodo',
  standalone: true,
  imports: [],
  templateUrl: './totales-periodo.component.html',
  styleUrl: './totales-periodo.component.scss',
})
export class TotalesPeriodoComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() metric: 'total' | 'cantidad' = 'total';

  ngOnChanges() {
    if (this.data && this.data.length) {
      this.renderChart();
    }
  }

  renderChart() {
    const chartDom = document.getElementById('lineChart')!;
    const myChart = echarts.init(chartDom);

    const periods = this.data.map((d) => d.periodo);
    const values = this.data.map((d) =>
      this.metric === 'total' ? d.total : d.cantidad,
    );

    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const value = params[0].value;

          return this.metric === 'total'
            ? `${params[0].name}<br/>Total: $${value.toLocaleString()}`
            : `${params[0].name}<br/>Cantidad: ${value}`;
        },
      },
      xAxis: {
        type: 'category',
        data: periods,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: this.metric === 'total' ? 'Total' : 'Cantidad',
          type: 'line',
          data: values,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 3,
          },
          itemStyle: {
            color: this.metric === 'total' ? '#1565c0' : '#2e7d32',
          },
          areaStyle: {
            opacity: 0.1,
          },
        },
      ],
      animationDuration: 500,
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
