package com.springboot.backend.tabla.plato.modelo;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.tabla.categoria.modelo.Categoria;
import com.springboot.backend.tabla.ingrediente.modelo.Ingrediente;
import com.springboot.backend.tabla.ingredienteplatos.modelo.IngredientePlatos;
import com.springboot.backend.tabla.ofertaplatos.modelo.OfertaPlatos;

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

    @OneToMany(mappedBy = "plato", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"plato"})
    private List<IngredientePlatos> ingredientePlatos;

    @OneToMany(mappedBy="plato", fetch=FetchType.EAGER)
    @JsonIgnoreProperties({"plato"})
    private List<OfertaPlatos> ofertaPlatos;

    public Plato(){}

    public Plato(Long id, String nombre, double precio, String descripcion, Categoria categoria, String imagen,
            List<IngredientePlatos> ingredientePlatos, List<OfertaPlatos> ofertaPlatos) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.imagen = imagen;
        this.ingredientePlatos = ingredientePlatos;
        this.ofertaPlatos = ofertaPlatos;
    }

    public Plato(String nombre, double precio, String descripcion, Categoria categoria, String imagen,
            List<IngredientePlatos> ingredientePlatos, List<OfertaPlatos> ofertaPlatos) {
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.imagen = imagen;
        this.ingredientePlatos = ingredientePlatos;
        this.ofertaPlatos = ofertaPlatos;
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

    public List<IngredientePlatos> getIngredientePlatos() {
        return ingredientePlatos;
    }

    public void setIngredientePlatos(List<IngredientePlatos> ingredientePlatos) {
        this.ingredientePlatos = ingredientePlatos;
    }

    public List<OfertaPlatos> getOfertaPlatos() {
        return ofertaPlatos;
    }

    public void setOfertaPlatos(List<OfertaPlatos> ofertaPlatos) {
        this.ofertaPlatos = ofertaPlatos;
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
