import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IngredientesPlato } from '../../componentes/ingrediente/IngredientesPlatos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientePlatosServicio {
  private baseUrl="http://localhost:8080/api/v1/public/ingrediente-platos";

  constructor(private http: HttpClient){}

  guardarLote(relaciones: any[]){
    return this.http.post(this.baseUrl+'/lote',relaciones);
  }

  obtenerIngredientePlatos(): Observable<IngredientesPlato[]>{
    return this.http.get<IngredientesPlato[]>(`${this.baseUrl}`);
  }
}