package com.springboot.backend.usuario.modelo;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.rol.modelo.Rol;

import jakarta.persistence.*;

@Entity
@Table(name="usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name="nombre", nullable = false, length=60)
    public String nombre;

    @Column(name="apellido", nullable = false, length=60)
    public String apellido;

    public String email;
    public String password;

    @ManyToOne
    @JoinColumn(name="rol_id")
    @JsonIgnoreProperties({"usuario"})
    public Rol rol;

    public Usuario(){

    }

    public Usuario(Long id, String nombre, String apellido, String email, String password, Rol rol) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

    public Usuario(String nombre, String apellido, String email, String password, Rol rol) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.rol = rol;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    @Override
    public boolean equals(Object o){
        if(this==o) return true;
        if(o==null || getClass()!=o.getClass()) return false;
        Usuario usuario=(Usuario) o;
        return Objects.equals(id, usuario.id) && Objects.equals(nombre, usuario.nombre);
    }

    @Override
    public int hashCode(){
        return Objects.hash(id, rol);
    }
}
