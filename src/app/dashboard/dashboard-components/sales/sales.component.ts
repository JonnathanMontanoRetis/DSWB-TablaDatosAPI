import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexFill,
  ApexXAxis,
  ApexGrid
} from 'ng-apexcharts';
import { HomeService } from '../../../services/home.services';


export interface activeusercardChartOptions {
  series: ApexAxisChartSeries;
  dataLabels: ApexDataLabels;
  chart: ApexChart;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
}

interface prestamosMes {
  mes_prestamo: String,
  ejemplares: number
}


interface devolucionesMes {
  mes_devolucion: String,
  ejemplares: number
}

let year: Number;
let responsePrestamosMes: prestamosMes[];
let responseDevolucionesMes: devolucionesMes[];

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],

})
export class SalesComponent {

  _prestamosMes: number[] = [];
  _devolucionesMes: number[] = []; 

  @ViewChild("activeusercardchart") chart1: ChartComponent = Object.create(null);
  public activeusercardChartOptions !: Partial<activeusercardChartOptions> | any;

  

  constructor(public homeService: HomeService) {
    year = (new Date()).getFullYear();
    
    this.homeService.getPrestamosMes(year).subscribe(data => {
      responsePrestamosMes = data as prestamosMes[];
      responsePrestamosMes.forEach(prestamo => {
        for(let i=1; i<=12; i++) {
          if(prestamo.mes_prestamo == i.toString()) {
            this._prestamosMes?.push(prestamo.ejemplares);
          } else {
            this._prestamosMes?.push(0);
          }
        }
      });
    });

    this.homeService.getDevolucionesMes(year).subscribe(data => {
      responseDevolucionesMes = data as devolucionesMes[];
      responseDevolucionesMes.forEach(devolucion => {
        for(let i=1; i<=12; i++) {
          if(devolucion.mes_devolucion == i.toString()) {
            this._devolucionesMes?.push(devolucion.ejemplares);
          } else {
            this._devolucionesMes?.push(0);
          }
        }
      });
    });
  }

  ngOnInit() {
    this.activeusercardChartOptions = {
      series: [
        {
          name: 'Prestamos',
          data: this._prestamosMes,
          color: "#845EC2",
        },
        {
          name: 'Devoluciones',
          data: this._devolucionesMes,
          color: "#FF6F91",
        },
      ],
      xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      },
      chart: {
        toolbar: {
          show: false,
        },
        type: 'bar',
        height: 300,
        foreColor: "#ffffff"
      },
      legend: {
        show: false,
      },

      tooltip: {
        theme: "dark"
      },

      grid: {
        show: false,
      },

      dataLabels: {
        enabled: false,
      },

      stroke: {
        show: true,
        width: 5,
        colors: ['none']
      },

      plotOptions: {
        bar: {
          columnWidth: '45%',
          borderRadius: 6,
        },
      },
    }
  }

}
