import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { PrestamoModel } from "../models/prestamo-model";


@Injectable({
  providedIn: "root",
})
export class PrestamoService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  obtenerPrestamo(): Observable<any> {
    return this.http.get("/api/prestamos/lista-prestamos");
  }

  crearPrestamo (prestamo: PrestamoModel) {
    return this.http.post("/api/prestamos", prestamo);
  }

  actualizarPrestamo(prestamo: PrestamoModel) {
    return this.http.put("/api/prestamos", prestamo);
  }

  eliminarPrestamo (prestamo: PrestamoModel) {
    const options = {
      body: prestamo,
    };
    return this.http.delete("/api/prestamos", options);
  }

  editarPrestamo (prestamo: PrestamoModel) {
    return this.http.put("/api/prestamos", prestamo);
  }
  
  ultimoPrestamo() {
    return this.http.get("/api/prestamos/getLastId");
  }

  registrarDevolucion(prestamoActualizado: PrestamoModel) {
    return this.http.put("/api/prestamos", prestamoActualizado);
  }
}