package com.springboot.backend.consulta.dto;

import java.math.BigDecimal;
import java.sql.Date;

public class MejorPlatoPedidoHoyDto {
   private Date fecha;
   private String nombre;
   private BigDecimal cantidad;
   private String imagen;

   
   public MejorPlatoPedidoHoyDto(Date fecha, String nombre, BigDecimal cantidad, String imagen) {
    this.fecha = fecha;
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.imagen = imagen;
   }

   public Date getFecha() {
    return fecha;
   }


   public void setFecha(Date fecha) {
    this.fecha = fecha;
   }


   public String getNombre() {
    return nombre;
   }


   public void setNombre(String nombre) {
    this.nombre = nombre;
   }


   public BigDecimal getCantidad() {
    return cantidad;
   }


   public void setCantidad(BigDecimal cantidad) {
    this.cantidad = cantidad;
   }


   public String getImagen() {
    return imagen;
   }


   public void setImagen(String imagen) {
    this.imagen = imagen;
   }
}
