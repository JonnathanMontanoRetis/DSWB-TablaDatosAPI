import { Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LibroModel } from 'src/app/models/libro-model';
import { LibrosService } from 'src/app/services/libros.services';
import {formatDate} from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss']
})
export class LibrosComponent {
  tituloFormulario: string = "Ingresar Libro";
  formCrearLibro!: FormGroup;
  displayedColumns: string[] = ['cod_inv', 'isbn', 'titulo', 'editorial', 'materia', 'ano_edicion', 'ciudad', 'dewey', 'editar'];
  dataSource :any;
  fechaCrea = new Date();

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private formBuilder: FormBuilder, public libroService: LibrosService) { }

  async ngOnInit() {
    this.formCrearLibro = this.formBuilder.group({
      cod_inv: [''],
      id_admin: [localStorage.getItem('user')],
      isbn: [''],
      titulo: [''],
      editorial: [''],
      ano_edicion: [''],
      materia: [''],
      dewey: [''],
      adquisicion: [''],
      ubicacion: [''],
      fecha_creacion: [formatDate(new Date(), 'dd/MM/yyyy', 'en')],
      precio: [''],
      ciudad: ['']
  });

    await this.getAllLibros();
  }

  async getAllLibros() {
    try {
      await this.libroService.obtenerLibros()
      .subscribe(async data => {
        if(data) {
          this.dataSource = new MatTableDataSource<LibroModel>(data);
          this.dataSource.paginator = this.paginator;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  showForm() {
    document.querySelector('#btnAgregar')?.classList.remove('btnAgregar');
    document.querySelector('#frmCrearLibro')?.classList.remove('hide-form');
  }

  hideForm() {
    this.formCrearLibro.reset;
    document.querySelector('#frmCrearLibro')?.classList.add('hide-form');
  }

  async crearLibro() {
    try {
      await this.libroService.crearLibro(this.formCrearLibro.value).toPromise();
    } catch (error) {
      console.log(error);
    } finally {
      this.hideForm();
      await this.getAllLibros();
    }
  }

  cargarFormularioLibro(libroAEditar: LibroModel) {
    this.formCrearLibro.setValue({
      cod_inv: libroAEditar.cod_inv,
      id_admin: libroAEditar.id_admin,
      isbn: libroAEditar.isbn,
      titulo: libroAEditar.titulo,
      editorial: libroAEditar.editorial,
      ano_edicion: libroAEditar.ano_edicion,
      materia: libroAEditar.materia,
      dewey: libroAEditar.dewey,
      adquisicion: libroAEditar.adquisicion,
      ubicacion: libroAEditar.ubicacion,
      fecha_creacion: libroAEditar.fecha_creacion,
      precio: libroAEditar.precio,
      ciudad: libroAEditar.ciudad
    });

    this.tituloFormulario = "Editar libro '" + libroAEditar.titulo + "'";
    
    document.querySelector('#btnEditar')?.classList.remove('btnEditar');
    this.showForm();
    document.querySelector('#btnAgregar')?.classList.add('btnAgregar');
  }

  async editarLibro() {
    try {
      await this.libroService.actualizarLibro(this.formCrearLibro.value).toPromise();
    } catch (error) {
      console.error(error);
    } finally  {
      this.hideForm();
      this.getAllLibros();
    }
  }
}
