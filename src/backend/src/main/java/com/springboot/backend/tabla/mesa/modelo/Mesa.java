package com.springboot.backend.tabla.mesa.modelo;

import jakarta.persistence.*;

@Entity
@Table(name="mesa")
public class Mesa {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable=false, length= 300)
    private String nombre;

    @Column(name="estado", nullable=false, length=300)
    private String estado;

    @Column(name="capacidad", nullable=false)
    private Integer capacidad;

    @Column(name="ubicacion", nullable=false, length= 300)
    private String ubicacion;

    public Mesa(){}

    public Mesa(Long id, String nombre, String estado, Integer capacidad, String ubicacion) {
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.capacidad = capacidad;
        this.ubicacion = ubicacion;
    }

    public Mesa(String nombre, String estado, Integer capacidad, String ubicacion) {
        this.nombre = nombre;
        this.estado = estado;
        this.capacidad = capacidad;
        this.ubicacion = ubicacion;
    }

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

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }
}
