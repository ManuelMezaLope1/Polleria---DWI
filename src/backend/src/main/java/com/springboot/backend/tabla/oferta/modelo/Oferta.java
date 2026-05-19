package com.springboot.backend.tabla.oferta.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

@Entity
@Table(name="ofertas")
public class Oferta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length = 70)
    private String nombre;

    @Column(name="descripcion",nullable = false,length = 200)
    private String descripcion;

    @Column(name="cantidad", nullable = false)
    private Integer cantidad;

    @Column(name="precio_actual", nullable = false)
    private double precio_actual;

    @Column(name="precio_nuevo", nullable = false)
    private double precio_nuevo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public double getPrecio_actual() {
        return precio_actual;
    }

    public void setPrecio_actual(double precio_actual) {
        this.precio_actual = precio_actual;
    }

    public double getPrecio_nuevo() {
        return precio_nuevo;
    }

    public void setPrecio_nuevo(double precio_nuevo) {
        this.precio_nuevo = precio_nuevo;
    }

    public Oferta(){}

    public Oferta(Long id, String nombre, String descripcion, Integer cantidad, double precio_actual,
            double precio_nuevo) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.precio_actual = precio_actual;
        this.precio_nuevo = precio_nuevo;
    }

    public Oferta(String nombre, String descripcion, Integer cantidad, double precio_actual, double precio_nuevo) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.precio_actual = precio_actual;
        this.precio_nuevo = precio_nuevo;
    }
}
