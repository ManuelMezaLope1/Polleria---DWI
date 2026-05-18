import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'http://localhost:8080/api/chatbot';

  constructor(private http: HttpClient) {}

  enviarMensaje(mensaje: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recomendar`, { mensaje });
  }
}
