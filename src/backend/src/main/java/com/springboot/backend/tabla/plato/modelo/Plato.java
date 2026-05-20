package com.springboot.backend.tabla.plato.modelo;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.tabla.categoria.modelo.Categoria;
import com.springboot.backend.tabla.ingrediente.modelo.Ingrediente;

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

    @Column(name="descripcion", nullable = false, length=500)
    public String descripcion;

    @ManyToOne
    @JoinColumn(name="categoria_id")
    @JsonIgnoreProperties({"plato"})
    public Categoria categoria;

    @Column(name="imagen", nullable = false)
    private String imagen;

    @JsonIgnore
    @ManyToMany(mappedBy = "platos", fetch = FetchType.EAGER)
    private List<Ingrediente> ingredientes;

    public Plato(){
        
    }

    public Plato(Long id, String nombre, double precio, String descripcion, Categoria categoria, String imagen, List<Ingrediente> ingredientes) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.imagen = imagen;
        this.ingredientes = ingredientes;
    }

    public Plato(String nombre, double precio, String descripcion, Categoria categoria, String imagen, List<Ingrediente> ingredientes) {
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.imagen = imagen;
        this.ingredientes = ingredientes;
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

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public List<Ingrediente> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(List<Ingrediente> ingredientes) {
        this.ingredientes = ingredientes;
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
