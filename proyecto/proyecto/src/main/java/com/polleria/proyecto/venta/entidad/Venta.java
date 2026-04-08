package com.polleria.proyecto.venta.entidad;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="ventas")
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="cantidad", nullable = false)
    private int cantidad;

    @Column(name="total", nullable = false)
    private double total;

    public Venta(){

    }

    public Venta(Long id, int cantidad, double total) {
        this.id = id;
        this.cantidad = cantidad;
        this.total = total;
    }

    public Venta(int cantidad, double total) {
        this.cantidad = cantidad;
        this.total = total;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "Venta [id=" + id + ", cantidad=" + cantidad + ", total=" + total + "]";
    }
}
