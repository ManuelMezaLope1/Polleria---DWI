package com.springboot.backend.consulta.dto;

public class IngredientesDto {
    private String nombre;
    private Long cantidad;
    private String alergia;
    private String categoria;
    private String estado;
    private String imagen;
    
    public IngredientesDto(String nombre, Long cantidad, String alergia, String categoria, String estado, String imagen) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.alergia = alergia;
        this.categoria = categoria;
        this.estado = estado;
        this.imagen=imagen;
    }

    public String getNombre() {
        return nombre;
    }


    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    public Long getCantidad() {
        return cantidad;
    }


    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }


    public String getAlergia() {
        return alergia;
    }


    public void setAlergia(String alergia) {
        this.alergia = alergia;
    }


    public String getCategoria() {
        return categoria;
    }


    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }


    public String getEstado() {
        return estado;
    }


    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getImagen(){
        return imagen;
    }

    public void setImagen(String imagen){
        this.imagen=imagen;
    }
}
