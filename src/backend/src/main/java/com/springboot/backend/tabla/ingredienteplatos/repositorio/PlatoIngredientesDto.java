package com.springboot.backend.tabla.ingredienteplatos.repositorio;

public class PlatoIngredientesDto {
    private String plato;
    private Long id;
    private String ingrediente;
    
    public PlatoIngredientesDto(String plato, Long id, String ingrediente) {
        this.plato = plato;
        this.id = id;
        this.ingrediente = ingrediente;
    }

    public String getPlato() {
        return plato;
    }

    public void setPlato(String plato) {
        this.plato = plato;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIngrediente() {
        return ingrediente;
    }

    public void setIngrediente(String ingrediente) {
        this.ingrediente = ingrediente;
    }
}