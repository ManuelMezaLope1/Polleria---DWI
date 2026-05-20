package com.springboot.backend.tabla.mensaje.modelo;

import jakarta.persistence.*;

@Entity
@Table(name="mensajes")
public class Mensaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length=100)
    private String nombre;

    @Column(name="correo", nullable = false, length=100)
    private String correo;

    @Column(name="descripcion", nullable = false, length=500)
    private String descripcion;

    public Mensaje(){}

    public Mensaje(Long id, String nombre, String correo, String descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.descripcion = descripcion;
    }

    public Mensaje(String nombre, String correo, String descripcion) {
        this.nombre = nombre;
        this.correo = correo;
        this.descripcion = descripcion;
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

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
