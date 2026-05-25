import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotServicio {
  /*private apiUrl = 'http://localhost:8080/api/chatbot';

  constructor(private http: HttpClient) {}

  enviarMensaje(mensaje: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recomendar`, { mensaje });
  }*/

  apiUrl='http://localhost:8080/api/v1/public/chat';

  constructor(private http:HttpClient) { }

  obtenerInicio(){
    return this.http.get<any>('http://localhost:8080/api/v1/public/chat/inicio');
  }

  enviarMensaje(mensaje:string){
    return this.http.post<any>(this.apiUrl,
      {
        mensaje:mensaje
      }
    );
  }
}
