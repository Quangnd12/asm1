import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.scss']
})
export class EchartsComponent implements OnInit, AfterViewInit {

  @ViewChild('pieChart') pieChart: ElementRef;
  @ViewChild('barChart') barChart: ElementRef;

  data = [
    { id: 1, name: 'Cà phê Robusta', sales: 120 },
    { id: 2, name: 'Cà phê Arabica', sales: 80 },
    { id: 3, name: 'Cà phê Culi', sales: 60 },
    { id: 4, name: 'Cà phê Moka', sales: 50 },
  ];

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initPieChart();
    this.initBarChart();
  }

  initPieChart() {
    const pieChart = echarts.init(this.pieChart.nativeElement);
    const pieOption = {
      title: {
        text: 'Sản phẩm',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Sales',
          type: 'pie',
          radius: '50%',
          data: this.data.map(product => ({ value: product.sales, name: product.name })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    pieChart.setOption(pieOption);
  }

  initBarChart() {
    const barChart = echarts.init(this.barChart.nativeElement);
    const barOption = {
      title: {
        text: 'Doanh thu sản phẩm',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: this.data.map(product => product.name)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Sales',
          type: 'bar',
          data: this.data.map(product => product.sales),
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            color: '#3398DB'
          }
        }
      ]
    };
    barChart.setOption(barOption);
  }
}
