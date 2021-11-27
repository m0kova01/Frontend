import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  constructor(private loginService: LoginService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.email, Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const formValue = this.loginForm.value;
    this.loginService.login({ username: formValue.username, password: formValue.password, token: moment(new Date()).format('HHmm') })
      .subscribe((response) => {
        if (response) {
          window.location.href = 'http://onecause.com';
        }
      },
        (err: any) => {
          this.handleError(err);
        });
  }

  handleError(error: any): void {
    console.log(error);
    this.loginForm.reset();
    this.loading = false;

    this.snackBar.open('Invalid username / password', 'X', { duration: 4000 });
  }
}
