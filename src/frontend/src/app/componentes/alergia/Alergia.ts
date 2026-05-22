import { IIngrediente } from "../ingrediente/IIngrediente";

export class Alergia{
    id: number;
    nombre: string;
    ingredientes: IIngrediente[];
}