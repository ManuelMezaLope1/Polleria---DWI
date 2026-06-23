import { Time } from "@angular/common";
import { Venta } from "../venta/Venta";

export class Pedido{
    id: number;
    fecha: Date;
    hora_inicio: Time;
    hora_entrega: Time;
    fecha_creacion: string;
    fecha_entrega: string;
    usuario: any;
    username: string;
    cantidad: number;
    descripcion: string;
    observacion: string;
    estado_pedido: string;
    venta: any;
}