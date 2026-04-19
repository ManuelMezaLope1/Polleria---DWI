package com.polleria.proyecto.venta.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.polleria.proyecto.venta.entidad.Venta;
import com.polleria.proyecto.venta.repositorio.VentaRepositorio;

@Service
public class VentaServicioImpl implements VentaServicio{
    @Autowired
    private VentaRepositorio repositorio;

    @Override
    public List<Venta> listarTodasLasVentas(){
        return repositorio.findAll();
    }
}
