package com.springboot.backend.tabla.categoriaingrediente.modelo;

import java.util.List;
import java.util.Objects;

import com.springboot.backend.tabla.ingrediente.modelo.Ingrediente;

import jakarta.persistence.*;

@Entity
@Table(name="categoria_ingrediente")
public class CategoriaIngrediente {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable=false, length=100)
    private String nombre;

    @OneToMany(mappedBy = "categoriaIngrediente", fetch=FetchType.EAGER)
    private List<Ingrediente> ingrediente;

    public CategoriaIngrediente(){}

    public CategoriaIngrediente(Long id, String nombre, List<Ingrediente> ingrediente) {
        this.id = id;
        this.nombre = nombre;
        this.ingrediente = ingrediente;
    }

    public CategoriaIngrediente(String nombre, List<Ingrediente> ingrediente) {
        this.nombre = nombre;
        this.ingrediente = ingrediente;
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

    public List<Ingrediente> getIngrediente() {
        return ingrediente;
    }

    public void setIngrediente(List<Ingrediente> ingrediente) {
        this.ingrediente = ingrediente;
    }

    @Override
    public boolean equals(Object o){
        if (this==o) return true;
        if(o==null || getClass() !=o.getClass()) return false;
        CategoriaIngrediente categoriaIngrediente =(CategoriaIngrediente) o;
        return Objects.equals(id, categoriaIngrediente.id) && Objects.equals(nombre, categoriaIngrediente.nombre);
    }
}
