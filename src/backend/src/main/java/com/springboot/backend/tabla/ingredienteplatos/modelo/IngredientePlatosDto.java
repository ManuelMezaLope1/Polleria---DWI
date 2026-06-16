package com.springboot.backend.tabla.ingredienteplatos.modelo;

public class IngredientePlatosDto {
    private Long ingredienteId;
    private Long platoId;
    
    public IngredientePlatosDto(Long ingredienteId, Long platoId) {
        this.ingredienteId = ingredienteId;
        this.platoId = platoId;
    }

    public Long getIngredienteId() {
        return ingredienteId;
    }

    public void setIngredienteId(Long ingredienteId) {
        this.ingredienteId = ingredienteId;
    }

    public Long getPlatoId() {
        return platoId;
    }

    public void setPlatoId(Long platoId) {
        this.platoId = platoId;
    }
}
