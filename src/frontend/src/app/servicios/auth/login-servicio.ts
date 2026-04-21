import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginServicio {
  private baseUrl="http://localhost:8080/auth/login";

  constructor(private HttpClient: HttpClient){}

  login(username:string, password:string){
    const headers=new HttpHeaders({Authorization: 'Basic' + btoa(username+':'+password)});
    return this.HttpClient.get('');
  }
}
