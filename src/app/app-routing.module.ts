import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './layouts/login/login.component';
import { FullComponent } from './layouts/full/full.component';
import { LibrosComponent } from './components/libros/libros.component';
import { AdmonusuariosComponent } from './components/admonusuarios/admonusuarios.component';
import { EjemplarlibroComponent } from './components/ejemplarlibro/ejemplarlibro.component';
import { AutorComponent } from './components/autor/autor.component';
import { AutorlibroComponent } from './components/autorlibro/autorlibro.component';
import { PrestamoComponent } from './components/prestamo/prestamo.component';




const routes: Routes = [
  {path: "login", component:LoginComponent},
  {path:"dashboard", component:FullComponent,
    children: [
      {path:"home", component:DashboardComponent},
      {path:"alerts", component:AlertsComponent},
      {path:"forms", component:FormsComponent},
      {path:"table", component:ProductComponent},
      {path:"grid-list", component:GridListComponent},
      {path:"menu", component:MenuComponent},
      {path:"tabs", component:TabsComponent},
      {path:"expansion", component:ExpansionComponent},
      {path:"chips", component:ChipsComponent},
      {path:"progress", component:ProgressComponent},
      {path:"toolbar", component:ToolbarComponent},
      {path:"progress-snipper", component:ProgressSnipperComponent},
      {path:"snackbar", component:SnackbarComponent},
      {path:"slider", component:SliderComponent},
      {path:"slide-toggle", component:SlideToggleComponent},
      {path:"tooltip", component:TooltipsComponent},
      {path:"button", component:ButtonsComponent},
      {path:"books", component:LibrosComponent},
      {path:"users", component:AdmonusuariosComponent},
      {path:"exemplary-books", component:EjemplarlibroComponent},
      {path:"autores", component:AutorComponent},
      {path:"autores-libros", component:AutorlibroComponent},
      {path:"prestamo-libros", component:PrestamoComponent},
    ]
  },
  {path:"", redirectTo:"/login", pathMatch:"full"},
  /*{path:"**", redirectTo:"/login", pathMatch:"full"},*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
