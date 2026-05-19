package com.springboot.backend.tabla.zona.modelo;

import java.util.List;
import java.util.Objects;

import com.springboot.backend.tabla.usuario.modelo.Usuario;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="zonas")
public class Zona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length=60)
    private String nombre;

    @Column(name="departamento", nullable = false, length=60)
    private String departamento;

    @Column(name="provincia", nullable = false, length=60)
    private String provincia;

    @Column(name="distrito", nullable = false, length=60)
    private String distrito;

    @OneToMany(mappedBy = "zona", fetch = FetchType.EAGER)
    public List<Usuario> usuario;

    public Zona(){}

    public Zona(Long id, String nombre, String departamento, String provincia, String distrito, List<Usuario> usuario) {
        this.id = id;
        this.nombre = nombre;
        this.departamento = departamento;
        this.provincia = provincia;
        this.distrito = distrito;
        this.usuario = usuario;
    }

    public Zona(String nombre, String departamento, String provincia, String distrito, List<Usuario> usuario) {
        this.nombre = nombre;
        this.departamento = departamento;
        this.provincia = provincia;
        this.distrito = distrito;
        this.usuario = usuario;
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

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public List<Usuario> getUsuario() {
        return usuario;
    }

    public void setUsuario(List<Usuario> usuario) {
        this.usuario = usuario;
    }

    @Override
    public boolean equals(Object o){
        if (this==o) return true;
        if(o==null || getClass() !=o.getClass()) return false;
        Zona zona =(Zona) o;
        return Objects.equals(id, zona.id) && Objects.equals(nombre, zona.nombre);
    }
}
