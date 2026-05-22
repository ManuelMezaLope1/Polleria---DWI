package com.springboot.backend.tabla.metodopago.modelo;

import java.util.List;
import java.util.Objects;

import com.springboot.backend.tabla.venta.modelo.Venta;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="metodopago")
public class MetodoPago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre", nullable = false, length=60)
    private String nombre;

    @OneToMany(mappedBy = "metodopago", fetch = FetchType.EAGER)
    private List<Venta> venta;

    public MetodoPago(){}

    public MetodoPago(Long id, String nombre, List<Venta> venta) {
        this.id = id;
        this.nombre = nombre;
        this.venta = venta;
    }

    public MetodoPago(String nombre, List<Venta> venta) {
        this.nombre = nombre;
        this.venta = venta;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Venta> getVenta() {
        return venta;
    }

    public void setVenta(List<Venta> venta) {
        this.venta = venta;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public boolean equals(Object o){
        if(this==o) return true;
        if(o==null  || getClass() !=o.getClass()) return false;
        MetodoPago metodoPago=(MetodoPago) o;
        return Objects.equals(id, metodoPago.id);
    }

    @Override
    public int hashCode(){
        return Objects.hash(id);
    }
}
