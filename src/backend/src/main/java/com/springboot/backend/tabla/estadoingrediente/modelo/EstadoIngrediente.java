package com.springboot.backend.tabla.estadoingrediente.modelo;

import java.util.List;
import java.util.Objects;

import com.springboot.backend.tabla.ingrediente.modelo.Ingrediente;

import jakarta.persistence.*;

@Entity
@Table(name="estado_ingrediente")
public class EstadoIngrediente {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable=false, length=50)
    private String nombre;

    @OneToMany(mappedBy = "estadoIngrediente", fetch=FetchType.EAGER)
    private List<Ingrediente> ingrediente;

    public EstadoIngrediente(){}

    public EstadoIngrediente(Long id, String nombre, List<Ingrediente> ingrediente) {
        this.id = id;
        this.nombre = nombre;
        this.ingrediente = ingrediente;
    }

    public EstadoIngrediente(String nombre, List<Ingrediente> ingrediente) {
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
        if(this==o)return true;
        if(o==null || getClass() !=o.getClass()) return false;
        EstadoIngrediente estadoIngrediente=(EstadoIngrediente) o;
        return Objects.equals(id, estadoIngrediente.id);
    }

    @Override
    public int hashCode(){
        return Objects.hash(id);
    }
}
