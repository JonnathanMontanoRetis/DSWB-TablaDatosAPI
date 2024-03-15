import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { EjemplarLibroModel } from "../models/ejemplalibro-model";

@Injectable({
  providedIn: "root",
})
export class EjemplarLibroService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  obtenerEjemplarLibro(): Observable<any> {
    return this.http.get("/api/ejemplarlibro/getAll");
  }

  crearEjemplarLibro (ejemplarlibro: EjemplarLibroModel) {
    return this.http.post("/api/ejemplarlibro", ejemplarlibro);
  }

  actualizarEjemplarLibro(libro: EjemplarLibroModel) {
    return this.http.put("/api/ejemplarlibro", libro);
  }
     
}