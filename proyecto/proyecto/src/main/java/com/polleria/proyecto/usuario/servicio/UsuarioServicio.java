package com.polleria.proyecto.usuario.servicio;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;
import com.polleria.proyecto.usuario.controlador.dto.UsuarioRegistroDto;
import com.polleria.proyecto.usuario.modelo.Usuario;

public interface UsuarioServicio extends UserDetailsService{
    public List<Usuario> listarUsuarios();

    public Usuario guardar(UsuarioRegistroDto registroDTO);
	
	public Usuario obtenerUsuarioPorId(Long id);

    public Usuario actualizarUsuario(Long id, UsuarioRegistroDto registroDTO);

    public void eliminarUsuario(Long id);
}
