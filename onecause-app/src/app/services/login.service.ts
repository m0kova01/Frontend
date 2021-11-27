import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  apiURl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  login(creds: any): Observable<any> {
    return this.http.post(this.apiURl, { username: creds.username, password: creds.password, token: creds.token }, httpOptions);
  }
}

