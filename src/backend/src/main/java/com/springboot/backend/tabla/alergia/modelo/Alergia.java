package com.springboot.backend.tabla.alergia.modelo;

import java.util.List;
import java.util.Objects;

import com.springboot.backend.tabla.ingrediente.modelo.Ingrediente;
import jakarta.persistence.*;

@Entity
@Table(name="alergias")
public class Alergia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length=100)
    private String nombre;

    @OneToMany(mappedBy = "alergia", fetch = FetchType.EAGER)
    private List<Ingrediente> ingredientes;

    public Alergia(){}

    public Alergia(Long id, String nombre, List<Ingrediente> ingredientes) {
        this.id = id;
        this.nombre = nombre;
        this.ingredientes = ingredientes;
    }

    public Alergia(String nombre, List<Ingrediente> ingredientes) {
        this.nombre = nombre;
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

    public List<Ingrediente> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(List<Ingrediente> ingredientes) {
        this.ingredientes = ingredientes;
    }

    @Override
    public boolean equals(Object o){
        if(this==o)return true;
        if(o==null || getClass() !=o.getClass()) return false;
        Alergia alergia=(Alergia) o;
        return Objects.equals(id, alergia.id);
    }

    @Override
    public int hashCode(){
        return Objects.hash(id);
    }
}
