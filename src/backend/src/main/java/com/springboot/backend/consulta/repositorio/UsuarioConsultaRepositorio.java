package com.springboot.backend.consulta.repositorio;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.CantidadUsuariosDto;
import com.springboot.backend.consulta.dto.MejorUsuarioDto;
import com.springboot.backend.consulta.dto.UsuarioVentasDto;
import com.springboot.backend.tabla.usuario.modelo.Usuario;

public interface UsuarioConsultaRepositorio extends JpaRepository<Usuario, Long>{
    @Query("""
       SELECT new com.springboot.backend.consulta.dto.CantidadUsuariosDto(
       COUNT(u)
       ) FROM Usuario u     
    """)
    CantidadUsuariosDto obtenerCantidadUsuariosDto();

    @Query("""
            SELECT new com.springboot.backend.consulta.dto.UsuarioVentasDto(
            u.id, u.username, COUNT(v)
            ) FROM Usuario u
             JOIN venta v
             GROUP BY u.id, u.username
    """)
    List<UsuarioVentasDto> obtenerUsuarioVentas();

    @Query(value="""
            SELECT u.username, u.nombre, u.apellido, u.telefono, z.nombre AS zona, COUNT(*) AS cantidad, ROUND(SUM(dv.total),2) AS total FROM venta v
            JOIN detalle_venta dv ON dv.venta_id=v.id
            JOIN usuarios u ON u.id=v.usuario_id
            JOIN zonas z ON z.id=u.zona_id
            GROUP BY u.username,u.nombre,u.apellido,u.telefono,z.nombre
            ORDER BY cantidad DESC
            LIMIT 1;
            """, nativeQuery=true)
    MejorUsuarioDto obtenerMejorUsuario();
}