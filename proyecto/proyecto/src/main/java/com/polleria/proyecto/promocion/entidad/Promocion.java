package com.polleria.proyecto.promocion.entidad;

import jakarta.persistence.*;

@Entity
@Table(name = "promociones")
public class Promocion{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String descripcion;

    private Double descuento;

    private String imagen;

    private boolean activo = true;

    // getters y setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }

    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescripcion() { return descripcion; }

    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Double getDescuento() { return descuento; }

    public void setDescuento(Double descuento) { this.descuento = descuento; }

    public String getImagen() { return imagen; }

    public void setImagen(String imagen) { this.imagen = imagen; }

    public boolean isActivo() { return activo; }

    public void setActivo(boolean activo) { this.activo = activo; }
}