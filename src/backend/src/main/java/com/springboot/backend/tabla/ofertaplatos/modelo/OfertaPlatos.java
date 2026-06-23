package com.springboot.backend.tabla.ofertaplatos.modelo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.tabla.oferta.modelo.Oferta;
import com.springboot.backend.tabla.plato.modelo.Plato;

import jakarta.persistence.*;

@Entity
@Table(name="oferta_platos")
public class OfertaPlatos {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="oferta_id")
    @JsonIgnoreProperties({"ofertaPlatos"})
    private Oferta oferta;

    @ManyToOne
    @JoinColumn(name="plato_id")
    @JsonIgnoreProperties({"ofertaPlatos"})
    private Plato plato;

    @Column(name="cantidad_platos", nullable = false)
    private Integer cantidad_platos;

    public OfertaPlatos(){}

    public OfertaPlatos(Long id, Oferta oferta, Plato plato, Integer cantidad_platos) {
        this.id = id;
        this.oferta = oferta;
        this.plato = plato;
        this.cantidad_platos = cantidad_platos;
    }

    public OfertaPlatos(Oferta oferta, Plato plato, Integer cantidad_platos) {
        this.oferta = oferta;
        this.plato = plato;
        this.cantidad_platos = cantidad_platos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Oferta getOferta() {
        return oferta;
    }

    public void setOferta(Oferta oferta) {
        this.oferta = oferta;
    }

    public Plato getPlato() {
        return plato;
    }

    public void setPlato(Plato plato) {
        this.plato = plato;
    }

    public Integer getCantidad_platos() {
        return cantidad_platos;
    }

    public void setCantidad_platos(Integer cantidad_platos) {
        this.cantidad_platos = cantidad_platos;
    }
}
