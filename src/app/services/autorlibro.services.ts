import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { AutorLibroModel } from "../models/autorlibro-model";

@Injectable({
  providedIn: "root",
})
export class AutorLibroService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  obtenerAutorLibro(): Observable<any> {
    return this.http.get("/api/autorlibro/getAll");
  }

  crearAutorLibro (autorlibro: AutorLibroModel) {
    return this.http.post("/api/autorlibro", autorlibro);
  }

  actualizarAutorLibro(autorlibro: AutorLibroModel) {
    return this.http.put("/api/autorlibro", autorlibro);
  }
     
}