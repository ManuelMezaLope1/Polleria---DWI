package com.springboot.backend.tabla.venta.modelo;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.tabla.detalleventa.modelo.DetalleVenta;
import com.springboot.backend.tabla.mesa.modelo.Mesa;
import com.springboot.backend.tabla.metodopago.modelo.MetodoPago;
import com.springboot.backend.tabla.usuario.modelo.Usuario;
import com.springboot.backend.tabla.zona.modelo.Zona;

import jakarta.persistence.*;

@Entity
@Table(name = "venta")
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonIgnoreProperties({ "venta" })
    private Usuario usuario;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "username", nullable = false, length = 100)
    private String username;

    @ManyToOne
    @JoinColumn(name = "zona_id")
    @JsonIgnoreProperties({ "venta" })
    private Zona zona;

    @Column(name = "fecha", nullable = false, length = 100)
    private String fecha;

    @ManyToOne
    @JoinColumn(name = "metodopago_id")
    @JsonIgnoreProperties({ "venta" })
    private MetodoPago metodopago;

    @OneToMany(mappedBy = "venta", fetch = FetchType.EAGER)
    @JsonIgnoreProperties("venta")
    private List<DetalleVenta> detalleVenta;

    @Column(name="estado_venta", nullable=false)
    private String estado_venta;

    @ManyToOne
    @JoinColumn(name="mesa_id")
    @JsonIgnoreProperties({"venta"})
    private Mesa mesa;

    public Venta() {}

    public Venta(Long id, Usuario usuario, String nombre, String username, Zona zona, String fecha,
            MetodoPago metodopago, List<DetalleVenta> detalleVenta, String estado_venta, Mesa mesa) {
        this.id = id;
        this.usuario = usuario;
        this.nombre = nombre;
        this.username = username;
        this.zona = zona;
        this.fecha = fecha;
        this.metodopago = metodopago;
        this.detalleVenta = detalleVenta;
        this.estado_venta = estado_venta;
        this.mesa = mesa;
    }

    public Venta(Usuario usuario, String nombre, String username, Zona zona, String fecha, MetodoPago metodopago,
            List<DetalleVenta> detalleVenta, String estado_venta, Mesa mesa) {
        this.usuario = usuario;
        this.nombre = nombre;
        this.username = username;
        this.zona = zona;
        this.fecha = fecha;
        this.metodopago = metodopago;
        this.detalleVenta = detalleVenta;
        this.estado_venta = estado_venta;
        this.mesa = mesa;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Zona getZona() {
        return zona;
    }

    public void setZona(Zona zona) {
        this.zona = zona;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public MetodoPago getMetodopago() {
        return metodopago;
    }

    public void setMetodopago(MetodoPago metodopago) {
        this.metodopago = metodopago;
    }

    public List<DetalleVenta> getDetalleVenta() {
        return detalleVenta;
    }

    public void setDetalleVenta(List<DetalleVenta> detalleVenta) {
        this.detalleVenta = detalleVenta;
    }

    public String getEstado_venta() {
        return estado_venta;
    }

    public void setEstado_venta(String estado_venta) {
        this.estado_venta = estado_venta;
    }

    public Mesa getMesa() {
        return mesa;
    }

    public void setMesa(Mesa mesa) {
        this.mesa = mesa;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Venta venta = (Venta) o;
        return Objects.equals(id, venta.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
