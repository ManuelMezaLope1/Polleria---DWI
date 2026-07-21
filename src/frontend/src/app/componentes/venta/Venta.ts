import { DetalleVenta } from "./DetalleVenta";

export class Venta{
    id: number;
    usuario: any;
    nombre:any;
    username: any;
    zona: any;
    fecha:string;
    metodopago: any;
    estado_venta: string;
    detalleVenta: DetalleVenta[];
    mesa: any;
}