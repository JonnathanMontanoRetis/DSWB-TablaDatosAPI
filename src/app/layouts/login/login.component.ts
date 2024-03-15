import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { UsersService } from 'src/app/services/users.service';

interface desc {
  background: string,
  color: string,
  icon: string,
  iconColor: string,
  heading: string,
  title: string,
  subheading: string,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: string | undefined;
  password: string | undefined;
  errorService: string | undefined;

  constructor( private router: Router, public userService: UsersService) { }

  ngOnInit(): void { }

  desc: desc[] = [
    {
      background: "alert-danger",
      color: "alert-text-danger",
      icon: "alert-circle",
      iconColor: "text-danger",
      heading: "Error",
      title: "",
      subheading: "",
    },
  ]

  LogIn() {
    if(this.user != undefined && this.password != undefined) {
      const user = new UserModel(this.user, this.password);

      this.userService.loginAdmin(this.user, this.password).subscribe(
        data => {
          console.log(data);
          if(data != null) {
            this.router.navigate(["/dashboard/home"]); 
            localStorage.setItem('user', data.id_admin);
          } else { 
            this.ShowNotification("datanull");
          }
        },
        error => {
          this.errorService = `${error.message} : ${error.error.error}`;
          this.ShowNotification("error");
          this.user = undefined;
          this.password = undefined;
          const user = new UserModel(undefined, undefined);
        }
      );
    } else {
      this.ShowNotification("empty");
    }
  }

  ShowNotification(typeAlert: string) {
    switch(typeAlert) {
      case "empty":
        this.desc[0].title = "Los campos de usuario y contraseña no deben quedar vacios.";
        this.desc[0].subheading = " Inténtalo nuevamente!";
        break;
      case "error":
        this.desc[0].title = "Se produjo el siguente error: ";
        this.desc[0].subheading = ` [${this.errorService}]`;
        break;
      case "datanull":
        this.desc[0].title = "Usuario o contraseña incorrectos.";
        this.desc[0].subheading = " Inténtalo nuevamente!";
    }
    

    document.getElementById('alert-container')?.classList.add('alerts');
      setTimeout(()=>{
        document.getElementById('alert-container')?.classList.remove('alerts');
      }, 4000);
  }
}
