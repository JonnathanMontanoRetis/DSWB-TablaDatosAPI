import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { AdmonuserModel } from "../models/admonuser-model";

@Injectable({
  providedIn: "root",
})
export class admonuserService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  obtenerUsuarios(): Observable<any> {
    return this.http.get("/api/usuario/getAll");
  }

  crearUsuario (Admonusers: AdmonuserModel) {
    return this.http.post("/api/usuario", Admonusers);
  }

  editarUsuario (Admonusers: AdmonuserModel) {
    return this.http.put("/api/usuario", Admonusers);
  }

  eliminarUsuario (Admonusers: AdmonuserModel) {
    const options = {
      body: Admonusers,
    };
    return this.http.delete("/api/usuario", options);
  }
     
}