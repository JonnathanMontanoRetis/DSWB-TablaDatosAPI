import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AutorModel } from 'src/app/models/autor-model';
import { AutorLibroModel } from 'src/app/models/autorlibro-model';
import { AutorService } from 'src/app/services/autor.services';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss']
})
export class AutorComponent {
  tituloFormulario: string = "Ingresar autor ";
  formCrearAutor!: FormGroup;
  displayedColumns: string[] = ['cod_autor', 'nombre_autor'];
  dataSource:any;
  fechaCrea = new Date();

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private formBuilder: FormBuilder, public autorservice: AutorService) { }

  async ngOnInit() {
    this.formCrearAutor = this.formBuilder.group({
      cod_autor: [''],
      nombre_autor: [''],
    });

    await this.getAllAutor();
  }

  async getAllAutor() {
    try {
      this.autorservice.obtenerAutor().subscribe(data => {
        this.dataSource = new MatTableDataSource<AutorModel>(data);
        this.dataSource.paginator = this.paginator;
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  showForm() {
    document.querySelector('#btnAgregar')?.classList.remove('btnAgregar');
    document.querySelector('#formCrearAutor')?.classList.remove('hide-form');
  }

  hideForm() {
    this.formCrearAutor.reset;
    document.querySelector('#frmCrearAutor')?.classList.add('hide-form');
  }

  async crearAutor() {
    try {
      await this.autorservice.crearAutor(this.formCrearAutor.value).toPromise();
    } catch (error) {
      console.log(error);
    } finally {
      this.hideForm();
      await this.getAllAutor();
    }
  }

  cargarFormularioAutor(AutorAEditar: AutorModel) {
    this.formCrearAutor.setValue({
      cod_autor: AutorAEditar.cod_autor,
      nombre_autor: AutorAEditar.nombre_autor,
      
    });

    this.tituloFormulario = "Editar Autor '" + AutorAEditar.cod_autor + "'";

    document.querySelector('#btnEditar')?.classList.remove('btnEditar');
    this.showForm();
    document.querySelector('#btnAgregar')?.classList.add('btnAgregar');
  }

  async editarAutor() {
    try {
      await this.autorservice.actualizarAutor(this.formCrearAutor.value).toPromise();
    } catch (error) {
      console.error(error);
    } finally {
      this.hideForm();
      this.getAllAutor();
    }
  }
}

