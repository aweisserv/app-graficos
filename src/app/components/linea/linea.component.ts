import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-linea',
  templateUrl: './linea.component.html',
  styleUrls: ['./linea.component.css']
})
export class LineaComponent {

    public lineChartData: ChartDataSets[] = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Empanadas' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Pizzas' },
      { data: [90, 78, 77, 91, 98, 86, 94], label: 'Asados', yAxisID: 'y-axis-0' },
      { data: [81, 87, 85, 90, 79, 94, 90], label: 'Completos', yAxisID: 'y-axis-1' }
    ];
    public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions: (ChartOptions & { annotation: any }) = {
      responsive: true,
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        xAxes: [{}],
        yAxes: [
          {
            id: 'y-axis-0',
            position: 'left',
          },
          {
            id: 'y-axis-1',
            position: 'right',
            gridLines: {
              color: 'rgba(255,0,0,0.3)',
            },
            ticks: {
              fontColor: 'red',
            }
          }
        ]
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              enabled: true,
              fontColor: 'orange',
              content: 'LineAnno'
            }
          },
        ],
      },
    };

    public lineChartColors: Color[] = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // red
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];

    public lineChartLegend = true;
    public lineChartType: ChartType = 'line';

    
    @ViewChild( BaseChartDirective, { static: true }) chart!: BaseChartDirective;

    
    constructor( ) { 
      // Initialization inside the constructor
      
    }
    
    public randomize(): void {

      for (let i = 0; i < this.lineChartData.length; i++) {
        for (let j = 0; j < this.lineChartData[i].data!.length; j++) {
          this.lineChartData[i].data![j] = this.generateNumber(i);
        }
      }
      this.chart.update();
    }
  
    private generateNumber(i: number): number {
      return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
    }
  
    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public hideOne(): void {
      const isHidden = this.chart.isDatasetHidden(1);
      this.chart.hideDataset(1, !isHidden);
    }
  
    public changeColor( label: number ): void {
      this.lineChartColors[label].borderColor = 'green';
      this.lineChartColors[label].backgroundColor = `rgba(0, 255, 0, 0.3)`;
    }
  
    public changeLabel(): void {
      this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    }
  }