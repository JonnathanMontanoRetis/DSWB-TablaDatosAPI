import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: "root",
  })
  export class HomeService {
    constructor(private http: HttpClient, private cookies: CookieService) {}

    getPrestamosMes(year: Number) {
        return this.http.get('api/prestamos/prestamos-mes?year='+year);
    }

    getDevolucionesMes(year: Number) {
        return this.http.get('api/prestamos/devoluciones-mes?year='+year);
    }

    getPrestamosDia() {
      return this.http.get('api/prestamos/prestamos-dia');
    }
  }