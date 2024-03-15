import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LibroModel } from 'src/app/models/libro-model';
import { LibrosService } from 'src/app/services/libros.services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  displayedColumns: string[] = ['libro', 'materia', 'editorial'];
  dataSource: any;

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(public libroService: LibrosService) { }

  ngOnInit(): void {
    this.getNuevosLibros();
  }

  async getNuevosLibros() {
    try {
      this.libroService.obtenerNuevosLibros()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<LibroModel>(data);
          this.dataSource.paginator = this.paginator;
      });
    }
    catch (error) {
      console.log(error);
    }
  }
}
