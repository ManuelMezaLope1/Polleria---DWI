package com.springboot.backend.tabla.pedido.modelo;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.tabla.usuario.modelo.Usuario;
import com.springboot.backend.tabla.venta.modelo.Venta;

import jakarta.persistence.*;

@Entity
@Table(name="pedidos")
public class Pedido {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="venta_id")
    @JsonIgnoreProperties({"pedidos"})
    private Venta venta;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonIgnoreProperties({ "pedidos" })
    private Usuario usuario;

    @Column(name = "username", length = 100)
    private String username;

    @Column(name="fecha_creacion", nullable=false)
    private String fecha_creacion;

    @Column(name="fecha_entrega")
    private String fecha_entrega;

    @Column(name="estado_pedido", nullable=false, length=100)
    private String estado_pedido;

    @Column(name="observacion")
    private String observacion;

    public Pedido(){}

    public Pedido(Long id, Venta venta, Usuario usuario, String username, String fecha_creacion, String fecha_entrega,
            String estado_pedido, String observacion) {
        this.id = id;
        this.venta = venta;
        this.usuario = usuario;
        this.username = username;
        this.fecha_creacion = fecha_creacion;
        this.fecha_entrega = fecha_entrega;
        this.estado_pedido = estado_pedido;
        this.observacion = observacion;
    }

    public Pedido(Venta venta, Usuario usuario, String username, String fecha_creacion, String fecha_entrega,
            String estado_pedido, String observacion) {
        this.venta = venta;
        this.usuario = usuario;
        this.username = username;
        this.fecha_creacion = fecha_creacion;
        this.fecha_entrega = fecha_entrega;
        this.estado_pedido = estado_pedido;
        this.observacion = observacion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(String fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    public String getFecha_entrega() {
        return fecha_entrega;
    }

    public void setFecha_entrega(String fecha_entrega) {
        this.fecha_entrega = fecha_entrega;
    }

    public String getEstado_pedido() {
        return estado_pedido;
    }

    public void setEstado_pedido(String estado_pedido) {
        this.estado_pedido = estado_pedido;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    @Override
    public boolean equals(Object o){
        if(this==o)return true;
        if(o==null || getClass() !=o.getClass()) return false;
        Pedido pedido=(Pedido) o;
        return Objects.equals(id, pedido.id);
    }

    @Override
    public int hashCode(){
        return Objects.hash(id);
    }
}
