import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { AutorModel } from "../models/autor-model";

@Injectable({
  providedIn: "root",
})
export class AutorService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  obtenerAutor(): Observable<any> {
    return this.http.get("/api/autor/getAll");
  }

  crearAutor (autor: AutorModel) {
    return this.http.post("/api/autor", autor);
  }

  actualizarAutor(autor: AutorModel) {
    return this.http.put("/api/autor", autor);
  }
     
}