import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { LibroModel } from "../models/libro-model";

@Injectable({
  providedIn: "root",
})
export class LibrosService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  obtenerLibros(): Observable<any> {
    return this.http.get("/api/libros/getAll");
  }

  crearLibro (libro: LibroModel) {
    return this.http.post("/api/libros", libro);
  }

  actualizarLibro(libro: LibroModel) {
    return this.http.put("/api/libros", libro);
  }

  obtenerLibrosPorNombre(nombreLibro: String) {
    return this.http.get('api/libros/titulo?titulo='+nombreLibro);
  }

  obtenerNuevosLibros(): Observable<any> {
    return this.http.get('api/libros/nuevos');
  }
     
}