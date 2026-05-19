package com.springboot.backend.consulta.usuariorol.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.backend.consulta.usuariorol.dto.UsuarioRolDto;
import com.springboot.backend.tabla.usuario.modelo.Usuario;

public interface UsuarioRolRepositorio extends JpaRepository<Usuario, Long>{
    @Query(value="""
           SELECT u.nombre, r.nombre from rol r JOIN usuario_rol ur ON r.id=ur.rol_id JOIN usuarios u ON u.id=ur.usuario_id WHERE ur.usuario_id=:idUsuario
            """, nativeQuery = true)
        List<UsuarioRolDto> obtenerRolesPorUsuario(@Param("idUsuario") Long idUsuario);
}
