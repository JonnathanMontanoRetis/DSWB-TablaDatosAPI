import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.services';

interface datosPrestamoDia {
  fecha_prestamo: string,
  titulo: string
}

interface activity {
  time: string;
  ringColor: string;
  message: string;
}

let responsePrestamosDia: datosPrestamoDia[];

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
})
export class ActivityComponent implements OnInit {
  actividadPrestamoDia: activity[] = [];

  constructor(public homeService: HomeService) {}

  ngOnInit(): void {
    this.getPrestamosHoy();
  }

  async getPrestamosHoy() {
    try {
      this.homeService.getPrestamosDia().subscribe(data => {
        responsePrestamosDia = data as datosPrestamoDia[];
  
       responsePrestamosDia.forEach(element  => {
        this.actividadPrestamoDia.push({
            time: element.fecha_prestamo,
            ringColor: "ring-warning",
            message: element.titulo
        });
       });
      });
    } catch(e) {
      console.log("error: ", e);
    }
  }

}
