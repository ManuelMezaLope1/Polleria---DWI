package com.springboot.backend.tabla.ingredienteplatos.modelo;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.tabla.ingrediente.modelo.Ingrediente;
import com.springboot.backend.tabla.plato.modelo.Plato;

import jakarta.persistence.*;

@Entity
@Table(name="ingrediente_platos")
public class IngredientePlatos {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="ingrediente_id")
    @JsonIgnoreProperties({"ingredientePlatos"})
    private Ingrediente ingrediente;

    @ManyToOne
    @JoinColumn(name="plato_id")
    @JsonIgnoreProperties({"ingredientePlatos"})
    private Plato plato;

    public IngredientePlatos(){}

    public IngredientePlatos(Long id, Ingrediente ingrediente, Plato plato) {
        this.id = id;
        this.ingrediente = ingrediente;
        this.plato = plato;
    }

    public IngredientePlatos(Ingrediente ingrediente, Plato plato) {
        this.ingrediente = ingrediente;
        this.plato = plato;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ingrediente getIngrediente() {
        return ingrediente;
    }

    public void setIngrediente(Ingrediente ingrediente) {
        this.ingrediente = ingrediente;
    }

    public Plato getPlato() {
        return plato;
    }

    public void setPlato(Plato plato) {
        this.plato = plato;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        IngredientePlatos ingredientePlatos = (IngredientePlatos) o;
        return Objects.equals(id, ingredientePlatos.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
