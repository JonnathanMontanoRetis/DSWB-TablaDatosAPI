import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AutorLibroModel } from 'src/app/models/autorlibro-model';
import { AutorLibroService } from 'src/app/services/autorlibro.services';

declare function convertDataTable(): any;
@Component({
  selector: 'app-autorlibro',
  templateUrl: './autorlibro.component.html',
  styleUrls: ['./autorlibro.component.scss']
})
export class AutorlibroComponent {
  tituloFormulario: string = "Ingresar Autor Libro";
  formCrearAutorLibro!: FormGroup;
  displayedColumns: string[] = ['cod_autor','cod_inv' ];
  dataSource: any;
  fechaCrea = new Date();

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private formBuilder: FormBuilder, public autorlibroservice: AutorLibroService) { }

  async ngOnInit() {
    this.formCrearAutorLibro = this.formBuilder.group({
      cod_autor: [''],
      cod_inv: [''],
      id_admin: [localStorage.getItem('user')],
      fecha_creacion: [formatDate(new Date(), 'dd/MM/yyyy', 'en')],
      
    });

    await this.getAllAutorLibros();
  }

  async getAllAutorLibros() {
    try {
      this.autorlibroservice.obtenerAutorLibro().subscribe(data => {
        this.dataSource = new MatTableDataSource<AutorLibroModel>(data);
        this.dataSource.paginator = this.paginator;
      });
    } catch (error) {
      console.log(error);
    }
  }

  showForm() {
    document.querySelector('#btnAgregar')?.classList.remove('btnAgregar');
    document.querySelector('#frmCrearAutorLibro')?.classList.remove('hide-form');
  }

  hideForm() {
    this.formCrearAutorLibro.reset;
    document.querySelector('#frmCrearAutorLibro')?.classList.add('hide-form');
  }

  async crearAutorLibro() {
    try {
      await this.autorlibroservice.crearAutorLibro(this.formCrearAutorLibro.value).toPromise();
    } catch (error) {
      console.log(error);
    } finally {
      this.hideForm();
      await this.getAllAutorLibros();
    }
  }

  cargarFormularioAutorLibro(autorlibroAEditar: AutorLibroModel) {
    this.formCrearAutorLibro.setValue({
      cod_autor: autorlibroAEditar.cod_autor,
      cod_inv: autorlibroAEditar.cod_inv,
      
    });

    this.tituloFormulario = "Editar libro '" + autorlibroAEditar.cod_autor + "'";
    
    document.querySelector('#btnEditar')?.classList.remove('btnEditar');
    this.showForm();
    document.querySelector('#btnAgregar')?.classList.add('btnAgregar');
  }

  async editarAutorLibro() {
    try {
      await this.autorlibroservice.actualizarAutorLibro(this.formCrearAutorLibro.value).toPromise();
    } catch (error) {
      console.error(error);
    } finally  {
      this.hideForm();
      this.getAllAutorLibros;
    }
  }
}
