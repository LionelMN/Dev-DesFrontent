import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Users } from '../../models/users';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form):void{
    this.authService.login(form.value).subscribe(res => {
      //Falta hacer la página por defecto una vez logeado.
      this.router.navigateByUrl(`/home`);
    })
  }

}
