package com.springboot.backend.categoria.modelo;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.backend.plato.modelo.Plato;

import jakarta.persistence.*;

@Entity
@Table(name="categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length=60)
    private String nombre;

    @Column(name="descripcion", nullable = false, length=200)
    private String descripcion;

    @OneToMany(mappedBy = "categoria", fetch=FetchType.EAGER)
    @JsonManagedReference
    private List<Plato> plato;

    public Categoria(){

    }

    public Categoria(Long id, String nombre, String descripcion, List<Plato> plato) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.descripcion=descripcion;
        this.plato = plato;
    }

    public Categoria(String nombre, String descripcion, List<Plato> plato) {
        super();
        this.nombre = nombre;
        this.descripcion=descripcion;
        this.plato = plato;
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<Plato> getPlato() {
        return plato;
    }

    public void setPlato(List<Plato> plato) {
        this.plato = plato;
    }

    @Override
    public String toString() {
        return "Categoria [id=" + id + ", nombre=" + nombre + ", descripcion=" + descripcion + "]";
    }

    @Override
    public boolean equals(Object o){
        if (this==o) return true;
        if(o==null || getClass() !=o.getClass()) return false;
        Categoria categoria =(Categoria) o;
        return Objects.equals(id, categoria.id) && Objects.equals(nombre, categoria.nombre);
    }
}
