package com.springboot.backend.tabla.ingrediente.modelo;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.tabla.alergia.modelo.Alergia;
import com.springboot.backend.tabla.plato.modelo.Plato;

import jakarta.persistence.*;

@Entity
@Table(name="ingredientes")
public class Ingrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length=100)
    private String nombre;

    @ManyToMany
    @JoinTable(
        name="ingrediente_plato",
        joinColumns =@JoinColumn(name="ingrediente_id"),
        inverseJoinColumns = @JoinColumn(name="plato_id")
    )
    @JsonIgnoreProperties({"ingredientes"})
    private List<Plato> platos;

    @ManyToOne
    @JoinColumn(name="alergia_id")
    @JsonIgnoreProperties({"ingredientes"})
    private Alergia alergia;

    public Ingrediente(){}

    public Ingrediente(Long id, String nombre, List<Plato> platos, Alergia alergia) {
        this.id = id;
        this.nombre = nombre;
        this.platos = platos;
        this.alergia = alergia;
    }

    public Ingrediente(String nombre, List<Plato> platos, Alergia alergia) {
        this.nombre = nombre;
        this.platos = platos;
        this.alergia = alergia;
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

    public List<Plato> getPlatos() {
        return platos;
    }

    public void setPlatos(List<Plato> platos) {
        this.platos = platos;
    }

    public Alergia getAlergia() {
        return alergia;
    }

    public void setAlergia(Alergia alergia) {
        this.alergia = alergia;
    }

    @Override
    public boolean equals(Object o){
        if(this==o) return true;
        if(o==null  || getClass() !=o.getClass()) return false;
        Ingrediente ingrediente=(Ingrediente) o;
        return Objects.equals(id, ingrediente.id);
    }

    @Override
    public int hashCode(){
        return Objects.hash(id);
    }
}
