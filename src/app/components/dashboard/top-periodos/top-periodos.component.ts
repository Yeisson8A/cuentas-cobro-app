import { Component, Input, OnChanges } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-top-periodos',
  standalone: true,
  imports: [],
  templateUrl: './top-periodos.component.html',
  styleUrl: './top-periodos.component.scss',
})
export class TopPeriodosComponent implements OnChanges {
  @Input() data: any[] = [];

  ngOnChanges() {
    if (this.data && this.data.length) {
      this.renderChart();
    }
  }

  renderChart() {
    const chartDom = document.getElementById('pieChart')!;
    const myChart = echarts.init(chartDom);

    const formattedData = this.data.map((d) => ({
      name: d.periodo,
      value: d.total,
    }));

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `${params.name}<br/>$${params.value.toLocaleString()} (${params.percent}%)`;
        },
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Top Periodos',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          data: formattedData,
        },
      ],
      animationDuration: 800,
      color: ['#1565c0', '#42a5f5', '#90caf9', '#64b5f6', '#1e88e5'],
    };

    myChart.setOption(option);
  }
}
