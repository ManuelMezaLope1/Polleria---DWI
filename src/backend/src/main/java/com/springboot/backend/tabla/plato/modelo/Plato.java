package com.springboot.backend.tabla.plato.modelo;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.tabla.categoria.modelo.Categoria;

import jakarta.persistence.*;

@Entity
@Table(name="platos")
public class Plato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name="nombre", nullable = false, length=60)
    public String nombre;

    @Column(name="precio", nullable = false)
    public double precio;

    @Column(name="descripcion", nullable = false, length=60)
    public String descripcion;

    @ManyToOne
    @JoinColumn(name="categoria_id")
    @JsonIgnoreProperties({"plato"})
    public Categoria categoria;

    public Plato(){
        
    }

    public Plato(Long id, String nombre, Categoria categoria, double precio, String descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio=precio;
        this.descripcion=descripcion;
    }

    public Plato(String nombre, Categoria categoria, double precio, String descripcion) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio=precio;
        this.descripcion=descripcion;
    }

    public Plato(Long id2, String nombre2, String categoria2, String descripcion2, double precio2) {
        //TODO Auto-generated constructor stub
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

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Override
    public String toString() {
        return "Plato [id=" + id + ", nombre=" + nombre + ", precio=" + precio + ", descripcion=" + descripcion
                + ", categoria=" + categoria + "]";
    }

    @Override
    public boolean equals(Object o){
        if(this==o)return true;
        if(o==null || getClass() !=o.getClass()) return false;
        Plato plato=(Plato) o;
        return Objects.equals(id, plato.id) && Objects.equals(categoria, plato.categoria);
    }

    @Override
    public int hashCode(){
        return Objects.hash(id, categoria);
    }
}
