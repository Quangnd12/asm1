import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';
import { ProductsService } from '../../../@core/services/apis/products.service'; 

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.scss']
})
export class EchartsComponent implements OnInit, AfterViewInit {

  @ViewChild('pieChart') pieChart: ElementRef;
  @ViewChild('barChart') barChart: ElementRef;

  data: { name: string, quantity: string }[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
  }

  loadData(query?: string) {
    this.productService.getProducts(query).subscribe(
      response => {
        if (response && Array.isArray(response.data)) {
          this.data = response.data.map(product => ({ name: product.name, quantity: product.quantity }));
          this.initPieChart();
          this.initBarChart();
        } else {
          console.error('Response is not an array:', response);
        }
      },
      error => {
        console.error('Error loading products:', error);
      }
    );
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
          name: 'Quantity',
          type: 'pie',
          radius: '50%',
          data: this.data.map(product => ({ value: product.quantity, name: product.name })),
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
        text: 'Sản phẩm',
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
          name: 'Quantity',
          type: 'bar',
          data: this.data.map(product => product.quantity),
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
