import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router ) { }


  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "./home",
      icon: "home",
      menu: "Inicio",
    },
    {
      link: "./books",
      icon: "book",
      menu: "Gestión de libros",
    },
    {
      link: "./exemplary-books",
      icon: "book-open",
      menu: "Ejemplar",
    },
    {
      link: "./autores",
      icon: "user-check",
      menu: "Autor",
    },
    {
      link: "./autores-libros",
      icon: "user-plus",
      menu: "Autor libro",
    },
    {
      link: "./users",
      icon: "users",
      menu: "Usuarios",
    },
    {
      link: "./prestamo-libros",
      icon: "award",
      menu: "Prestamo",
    }
  ];

  LogOut() {
    this.router.navigate(["./login"]);
  }

}
