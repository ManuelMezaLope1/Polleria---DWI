package com.springboot.backend.tabla.usuario.modelo;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.tabla.rol.modelo.Rol;
import com.springboot.backend.tabla.zona.modelo.Zona;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellido;
    private String direccion;
    private String telefono;

    @ManyToOne
    @JoinColumn(name="zona_id")
    @JsonIgnoreProperties({"usuario"})
    private Zona zona;

    @ManyToMany
    @JoinTable(
        name = "usuario_rol", 
        joinColumns = @JoinColumn(name = "usuario_id"), 
        inverseJoinColumns = @JoinColumn(name = "rol_id")
    )
    @JsonIgnoreProperties({"usuario"})
    private List<Rol> roles;

    private String username;
    private String password;

    public Usuario(){}

    public Usuario(Long id, String nombre, String apellido, String direccion, String telefono, Zona zona,
            List<Rol> roles, String username, String password) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
        this.zona = zona;
        this.roles = roles;
        this.username = username;
        this.password = password;
    }

    public Usuario(String nombre, String apellido, String direccion, String telefono, Zona zona, List<Rol> roles,
            String username, String password) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
        this.zona = zona;
        this.roles = roles;
        this.username = username;
        this.password = password;
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



    public String getApellido() {
        return apellido;
    }



    public void setApellido(String apellido) {
        this.apellido = apellido;
    }



    public String getDireccion() {
        return direccion;
    }



    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }



    public String getTelefono() {
        return telefono;
    }



    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }



    public Zona getZona() {
        return zona;
    }



    public void setZona(Zona zona) {
        this.zona = zona;
    }



    public List<Rol> getRoles() {
        return roles;
    }



    public void setRoles(List<Rol> roles) {
        this.roles = roles;
    }



    public String getUsername() {
        return username;
    }



    public void setUsername(String username) {
        this.username = username;
    }



    public String getPassword() {
        return password;
    }



    public void setPassword(String password) {
        this.password = password;
    }



    @Override
    public boolean equals(Object o){
        if(this==o) return true;
        if(o==null  || getClass() !=o.getClass()) return false;
        Usuario usuario=(Usuario) o;
        return Objects.equals(id, usuario.id);
    }

    @Override
    public int hashCode(){
        return Objects.hash(id);
    }
}
