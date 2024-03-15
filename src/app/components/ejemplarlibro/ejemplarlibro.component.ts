import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EjemplarLibroModel } from 'src/app/models/ejemplalibro-model';
import { EjemplarLibroService } from 'src/app/services/ejemplarlibro.services';
import {formatDate} from '@angular/common'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
declare function convertDataTable(): any;


@Component({
  selector: 'app-ejemplarlibro',
  templateUrl: './ejemplarlibro.component.html',
  styleUrls: ['./ejemplarlibro.component.scss']
})
export class EjemplarlibroComponent {
  tituloFormulario: string = "Ingresar ejemplarLibro";
  formCrearEjemplarLibro!: FormGroup;
  displayedColumns: string[] = ['id_ejemplar','cod_inv','numero','estatus', 'editar'];
  dataSource: any;
  fechaCrea = new Date();

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private formBuilder: FormBuilder, public ejemplarlibroservice: EjemplarLibroService) { }

  async ngOnInit() {
    this.formCrearEjemplarLibro = this.formBuilder.group({
      id_ejemplar: [''],
      cod_inv: [''],
      numero: [''],
      estatus: [''],
      id_admin: [localStorage.getItem('user')],
      fecha_creacion: [formatDate(new Date(), 'dd/MM/yyyy', 'en')],
      
    });

    await this.getAllEjemplarLibros();
  }

  async getAllEjemplarLibros() {
    try {
      this.ejemplarlibroservice.obtenerEjemplarLibro().subscribe(data => {
        this.dataSource = new MatTableDataSource<EjemplarLibroModel>(data);
        this.dataSource.paginator = this.paginator;
      });
    } catch (error) {
      console.log(error);
    }
  }

  showForm() {
    document.querySelector('#btnAgregar')?.classList.remove('btnAgregar');
    document.querySelector('#frmCrearEjemplarLibro')?.classList.remove('hide-form');
  }

  hideForm() {
    this.formCrearEjemplarLibro.reset;
    document.querySelector('#frmCrearEjemplarLibro')?.classList.add('hide-form');
  }

  async crearEjemplarLibro() {
    try {
      await this.ejemplarlibroservice.crearEjemplarLibro(this.formCrearEjemplarLibro.value).toPromise();
    } catch (error) {
      console.log(error);
    } finally {
      this.hideForm();
      await this.getAllEjemplarLibros();
    }
  }

  cargarFormularioEjemplarLibro(EjemplarlibroAEditar: EjemplarLibroModel) {
    this.formCrearEjemplarLibro.setValue({
      id_ejemplar: EjemplarlibroAEditar.id_ejemplar,
      cod_inv: EjemplarlibroAEditar.cod_inv,
      numero: EjemplarlibroAEditar.numero,
      estatus: EjemplarlibroAEditar.estatus,
      
    });

    this.tituloFormulario = "Editar ejemplar libro '" + EjemplarlibroAEditar.id_ejemplar + "'";
    
    document.querySelector('#btnEditar')?.classList.remove('btnEditar');
    this.showForm();
    document.querySelector('#btnAgregar')?.classList.add('btnAgregar');
  }

  async editarEjemplarLibro() {
    try {
      await this.ejemplarlibroservice.actualizarEjemplarLibro(this.formCrearEjemplarLibro.value).toPromise();
    } catch (error) {
      console.error(error);
    } finally  {
      this.hideForm();
      this.getAllEjemplarLibros();
    }
  }
}


