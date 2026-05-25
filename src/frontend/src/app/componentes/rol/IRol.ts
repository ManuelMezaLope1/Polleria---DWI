import { Usuario } from "../usuario/Usuario";

export class IRol{
    id: number;
    nombre: string;
    usuarios: Usuario[];
}