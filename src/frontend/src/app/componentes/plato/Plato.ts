import { IIngrediente } from "../ingrediente/IIngrediente";

export class Plato{
    id:number;
    nombre:string;
    precio:string;
    descripcion:string;
    imagen:string;
    categoria:any;
    ingrediente: IIngrediente[];
}