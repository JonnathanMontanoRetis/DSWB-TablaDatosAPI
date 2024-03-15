import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdmonuserModel } from "src/app/models/admonuser-model";
import { admonuserService } from "src/app/services/admonusers.services";

@Component({
  selector: "app-admonusuarios",
  templateUrl: "./admonusuarios.component.html",
  styleUrls: ["./admonusuarios.component.scss"],
})
export class AdmonusuariosComponent {
  formTitulo = "Ingresar Usuario";
  formCrearUsuario!: FormGroup;
  displayedColumns: string[] = [
    "id_user",
    "descripcion_user",
    "nombre",
    "apellido",
    "telefono",
    "curso",
    "editar",
    "eliminar"
  ];
  dataSource: any;

  nameUser: string | undefined;

  @ViewChild('paginator') paginator!: MatPaginator;
  
  constructor(
    private formBuilder: FormBuilder,
    public admonusersService: admonuserService,
  ) {}

  ngOnInit() {
    this.formCrearUsuario! = this.formBuilder.group({
      id_user: [""],
      id_admin: [localStorage.getItem("user")],
      descripcion_user: [""],
      nombre: [""],
      apellido: [""],
      correo: [""],
      telefono: [],
      direccion: [""],
      curso: [""],
    });

    this.getAllAdmonusuarios();
  }

  getAllAdmonusuarios() {
    try {
      this.admonusersService.obtenerUsuarios().subscribe((data) => {
        this.dataSource = new MatTableDataSource<AdmonuserModel>(data);
        this.dataSource.paginator = this.paginator;
      });
    
    } catch (error) {
      console.log(error);
    }
  }

  showForm() {
    document.querySelector('#btnAgregar')?.classList.remove('btnAgregar');
    document.querySelector("#frmCrearUsuario")?.classList.remove("hide-form");
  }

  hideForm() {
    this.formCrearUsuario!.reset;
    document.querySelector("#frmCrearUsuario")?.classList.add("hide-form");
  }

  crearUsuario() {
    this.formTitulo = "Ingresar Usuario";
    this.admonusersService.crearUsuario(this.formCrearUsuario!.value).subscribe(
      (data) => {
        console.log(data);
        this.getAllAdmonusuarios();
        this.hideForm();
      },
      (error) => {
        console.log(`${error.message} : ${error.error.error}`);
      }
    );
  }

  cargarFormularioUsuario(usuario: any, isEdit: boolean) {
    this.formCrearUsuario.setValue({
      id_user: usuario.id_user,
      id_admin: usuario.id_admin,
      descripcion_user: usuario.descripcion_user,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      telefono: usuario.telefono,
      direccion: usuario.direccion,
      curso: usuario.curso,
    });

    if(isEdit) {
      this.formTitulo = "Editar Usuario '" + usuario.nombre + "'";
      document.querySelector('#btnEditar')?.classList.remove('btnEditar');
      this.showForm();
      document.querySelector('#btnAgregar')?.classList.add('btnAgregar');
    } else {
      this.openDialog(usuario);
    }
  }

  editarUsuario() {
    this.admonusersService.editarUsuario(this.formCrearUsuario!.value).subscribe(
      (data) => {
        console.log(data);
        this.getAllAdmonusuarios();
        this.hideForm();
      },
      (error) => {
        console.log(`${error.message} : ${error.error.error}`);
      }
    );
  }

  openDialog(user: any) {
    this.nameUser = user.nombre;
    var modal = document.getElementById("myModal");
    modal!.style.display = "block";
  }

  closeDialog() {
    var modal = document.getElementById("myModal");
    modal!.style.display = "none";
  }

  async eliminarUsuario() {
    try {
      await this.admonusersService.eliminarUsuario(this.formCrearUsuario!.value).subscribe();
    } finally {
      setTimeout(() => {
        this.getAllAdmonusuarios();
        this.closeDialog();
      }, 3000);
    }
  }
}
