
package com.polleria.proyecto.promocion.repositorio;

import com.polleria.proyecto.promocion.entidad.Promocion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromocionRepositorio extends JpaRepository<Promocion, Long> {
}