import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { LibrosService } from 'src/app/services/libros.services';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { lastValueFrom } from 'rxjs';
import { PrestamoModel } from 'src/app/models/prestamo-model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface librosNombre {
  id_ejemplar: String,
  titulo: String
}

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.scss']
})
export class PrestamoComponent {
  [x: string]: any;
  formTitulo = "Ingresar Reserva";
  formCrearPrestamo!: FormGroup;
  displayedColumns: string[] = [
    'id_reserva',
    'id_ejemplar',
    'dias_prestamo',
    'fecha_prestamo',
    'fecha_devolucion',
    'estado',
    'entregar'
     
  ];

  dataSource:any;

  librosObtenidosPorNombre$!: Observable<librosNombre[]>;

  idEjemplarPrestamo: String = "";
  ultPrestamo: string = "";

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private formBuilder: FormBuilder, public prestamoservice: PrestamoService, public libroService: LibrosService) { 
  }

  ngOnInit() {
    this.formCrearPrestamo! = this.formBuilder.group({
      nombre_libro: [""],
      dias_prestamo: [],
      id_usuario: [""]
    });

    this.getAllPrestamos();  

    this.librosObtenidosPorNombre$ = this.formCrearPrestamo.get('nombre_libro')!.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(100),
      filter((name) => !!name),
      switchMap(name => this.libroService.obtenerLibrosPorNombre(name))
    ) as Observable<librosNombre[]>;
  }

  async getAllPrestamos() {
    try {
      this.prestamoservice.obtenerPrestamo()
        .subscribe((data) => {
          this.dataSource = new MatTableDataSource<PrestamoModel>(data);
          this.dataSource.paginator = this.paginator;
        });
    } catch (error) {
      console.log(error);
    }
    
  }

  showForm() {
    document.querySelector('#btnAgregar')?.classList.remove('btnAgregar');
    document.querySelector("#frmCrearprestamo")?.classList.remove("hide-form");
  }

  hideForm() {
    this.formCrearPrestamo!.reset;
    document.querySelector("#frmCrearprestamo")?.classList.add("hide-form");
  }

  async crearprestamo() {
    this.formTitulo = "Ingresar reserva";
    let _cuerpoPrestamo: PrestamoModel;
    const ult$ = this.prestamoservice.ultimoPrestamo();
    const response = await lastValueFrom(ult$);

    if(response != null || response != "") {
      this.ultPrestamo = (Number.parseInt(response.toString()) + 1).toString();
    } else {
      this.ultPrestamo = "1";
    }
    _cuerpoPrestamo = {
      id_reserva: this.ultPrestamo,
      id_admin: localStorage.getItem("user")!,
      id_user: String(this.formCrearPrestamo.get("id_usuario")?.value),
      id_ejemplar: this.idEjemplarPrestamo,
      dias_prestamo: this.formCrearPrestamo.get("dias_prestamo")?.value,
      fecha_prestamo: formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'en'),
      fecha_devolucion: formatDate((new Date()).setDate(new Date().getDate() + this.formCrearPrestamo.get("dias_prestamo")?.value), 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'en'),
      estado: "No disponible",
    }

    this.prestamoservice.crearPrestamo(_cuerpoPrestamo).subscribe(
      (data) => {
        console.log(data);
        this.getAllPrestamos();
        this.hideForm();
      },
      (error) => {
        console.log(`${error.message} : ${error.error.error}`);
      }
    );
  }

  cargarFormularioPrestamo(prestamo: any, isEdit: boolean) {
    this.formCrearPrestamo.setValue({
      id_reserva: prestamo.id_reserva,
      id_user: prestamo.id_user,
      id_admin: prestamo.id_admin,
      id_ejemplar: prestamo.id_ejemplar,
      dias_prestamo: prestamo.dias_prestamo,
      fecha_prestamo: prestamo.fecha_prestamo,
      fecha_devoluvion: prestamo.fecha_devoluvion,
     
    });

    if(isEdit) {
      this.formTitulo = "Editar reserva '" + prestamo.id_reserva + "'";
      document.querySelector('#btnEditar')?.classList.remove('btnEditar');
      this.showForm();
      document.querySelector('#btnAgregar')?.classList.add('btnAgregar');
    } else {
    }
  }

  editarPrestamo() {
    this.prestamoservice.editarPrestamo(this.formCrearPrestamo!.value).subscribe(
      (data) => {
        console.log(data);
        this.getAllPrestamos();
        this.hideForm();
      },
      (error) => {
        console.log(`${error.message} : ${error.error.error}`);
      }
    );
  }

  getIdEjemplar(_idEjemplar: String) {
    this.idEjemplarPrestamo = _idEjemplar;
  }

  getIdEjemplarDevolucion(prestamo: any) {
    let prestamoActualizado: PrestamoModel;
    prestamoActualizado = {
      id_reserva: prestamo.id_reserva,
      id_admin: prestamo.id_admin,
      id_user: prestamo.id_user,
      id_ejemplar: prestamo.id_ejemplar,
      fecha_prestamo: prestamo.fecha_prestamo,
      fecha_devolucion: formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'en'),
      estado: "Disponible"
    };

    console.log(prestamoActualizado);

    this.prestamoservice.registrarDevolucion(prestamoActualizado).subscribe(data => {
      this.getAllPrestamos();
    });
  }
}
