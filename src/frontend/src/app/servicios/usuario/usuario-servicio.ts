import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { Usuario } from '../../componentes/usuario/Usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServicio {
  private usuBaseUrl = "http://localhost:8080/api/v1/usuarios";

  constructor(private HttpClient: HttpClient) {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  obtenerListaDePlatos(): Observable<Usuario[]> {
    return this.HttpClient.get<Usuario[]>(`${this.usuBaseUrl}`);
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }


  request(method: string, url: string, data: any): Promise<any> {
    let headers: any = {};

    if (this.getAuthToken() !== null) {
      headers = { "Authorization": "Bearer " + this.getAuthToken() };
    }

    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    });
  }
}
