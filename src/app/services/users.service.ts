import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  loginAdmin(user: string, pass: string): Observable<any> {
    return this.http.get("/api/usuarioAdmin/login?user="+user+"&password="+pass);
  }

}