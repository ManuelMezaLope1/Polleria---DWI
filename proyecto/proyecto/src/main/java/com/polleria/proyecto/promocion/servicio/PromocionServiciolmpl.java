package com.polleria.proyecto.promocion.servicio;

import com.polleria.proyecto.promocion.entidad.Promocion;
import com.polleria.proyecto.promocion.repositorio.PromocionRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromocionServiciolmpl implements PromocionServicio {

    @Autowired
    private PromocionRepositorio repositorio;

    @Override
    public List<Promocion> listar() {
        return repositorio.findAll();
    }

    @Override
    public Promocion guardar(Promocion promocion) {
        return repositorio.save(promocion);
    }

    @Override
    public Promocion obtenerPorId(Long id) {
        return repositorio.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        repositorio.deleteById(id);
    }
}