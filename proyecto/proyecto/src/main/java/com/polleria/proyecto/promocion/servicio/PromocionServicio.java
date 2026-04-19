package com.polleria.proyecto.promocion.servicio;

import com.polleria.proyecto.promocion.entidad.Promocion;
import java.util.List;

public interface PromocionServicio {
    List<Promocion> listar();
    Promocion guardar(Promocion promocion);
    Promocion obtenerPorId(Long id);
    void eliminar(Long id);
}