package com.springboot.backend.tabla.ingrediente.modelo;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.tabla.alergia.modelo.Alergia;
import com.springboot.backend.tabla.categoriaingrediente.modelo.CategoriaIngrediente;
import com.springboot.backend.tabla.estadoingrediente.modelo.EstadoIngrediente;
import com.springboot.backend.tabla.ingredienteplatos.modelo.IngredientePlatos;

import jakarta.persistence.*;

@Entity
@Table(name="ingredientes")
public class Ingrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length=100)
    private String nombre;

    @OneToMany(mappedBy = "ingrediente", fetch=FetchType.EAGER)
    @JsonIgnoreProperties({"ingrediente"})
    private List<IngredientePlatos> ingredientePlatos;

    @ManyToOne
    @JoinColumn(name="alergia_id")
    @JsonIgnoreProperties({"ingredientes"})
    private Alergia alergia;

    @ManyToOne
    @JoinColumn(name="estado_ingrediente_id")
    @JsonIgnoreProperties({"ingrediente"})
    private EstadoIngrediente estadoIngrediente;

    @ManyToOne
    @JoinColumn(name="categoria_ingrediente_id")
    @JsonIgnoreProperties({"ingrediente"})
    private CategoriaIngrediente categoriaIngrediente;

    @Column(name="imagen", nullable=false)
    private String imagen;

    public Ingrediente(){}

    public Ingrediente(Long id, String nombre, List<IngredientePlatos> ingredientePlatos, Alergia alergia,
            EstadoIngrediente estadoIngrediente, CategoriaIngrediente categoriaIngrediente, String imagen) {
        this.id = id;
        this.nombre = nombre;
        this.ingredientePlatos = ingredientePlatos;
        this.alergia = alergia;
        this.estadoIngrediente = estadoIngrediente;
        this.categoriaIngrediente = categoriaIngrediente;
        this.imagen = imagen;
    }

    public Ingrediente(String nombre, List<IngredientePlatos> ingredientePlatos, Alergia alergia,
            EstadoIngrediente estadoIngrediente, CategoriaIngrediente categoriaIngrediente, String imagen) {
        this.nombre = nombre;
        this.ingredientePlatos = ingredientePlatos;
        this.alergia = alergia;
        this.estadoIngrediente = estadoIngrediente;
        this.categoriaIngrediente = categoriaIngrediente;
        this.imagen = imagen;
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

    public List<IngredientePlatos> getIngredientePlatos() {
        return ingredientePlatos;
    }

    public void setIngredientePlatos(List<IngredientePlatos> ingredientePlatos) {
        this.ingredientePlatos = ingredientePlatos;
    }

    public Alergia getAlergia() {
        return alergia;
    }

    public void setAlergia(Alergia alergia) {
        this.alergia = alergia;
    }

    public EstadoIngrediente getEstadoIngrediente() {
        return estadoIngrediente;
    }

    public void setEstadoIngrediente(EstadoIngrediente estadoIngrediente) {
        this.estadoIngrediente = estadoIngrediente;
    }

    public CategoriaIngrediente getCategoriaIngrediente() {
        return categoriaIngrediente;
    }

    public void setCategoriaIngrediente(CategoriaIngrediente categoriaIngrediente) {
        this.categoriaIngrediente = categoriaIngrediente;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
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
