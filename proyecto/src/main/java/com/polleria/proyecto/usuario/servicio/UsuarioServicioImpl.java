package com.polleria.proyecto.usuario.servicio;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.polleria.proyecto.usuario.controlador.dto.UsuarioRegistroDto;
import com.polleria.proyecto.usuario.modelo.Rol;
import com.polleria.proyecto.usuario.modelo.Usuario;
import com.polleria.proyecto.usuario.repositorio.UsuarioRepositorio;

@Service
public class UsuarioServicioImpl implements UsuarioServicio {
	@Autowired
	private UsuarioRepositorio usuarioRepositorio;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public UsuarioServicioImpl() {

	}

	public UsuarioServicioImpl(BCryptPasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}

	public UsuarioServicioImpl(UsuarioRepositorio usuarioRepositorio) {
		super();
		this.usuarioRepositorio = usuarioRepositorio;
	}

	@Override
	public Usuario guardar(UsuarioRegistroDto registroDTO) {
		Usuario usuario = new Usuario(registroDTO.getNombre(),
				registroDTO.getApellido(), registroDTO.getEmail(),
				passwordEncoder.encode(registroDTO.getPassword()), Arrays.asList(new Rol("ROLE_USER")));
		return usuarioRepositorio.save(usuario);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepositorio.findByEmail(username);
		if (usuario == null) {
			throw new UsernameNotFoundException("Usuario o password inválidos");
		}
		return new User(usuario.getEmail(), usuario.getPassword(), mapearAutoridadesRoles(usuario.getRoles()));
	}

	private Collection<? extends GrantedAuthority> mapearAutoridadesRoles(Collection<Rol> roles) {
		return roles.stream().map(role -> new SimpleGrantedAuthority(role.getNombre())).collect(Collectors.toList());
	}

	@Override
	public List<Usuario> listarUsuarios() {
		return usuarioRepositorio.findAll();
	}

	@Override
	public Usuario obtenerUsuarioPorId(Long id) {
		return usuarioRepositorio.findById(id).get();
	}

	@Override
	public Usuario actualizarUsuario(Long id, UsuarioRegistroDto usuarioRegistroDto) {
		Usuario usuario = usuarioRepositorio.findById(id)
				.orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

		usuario.setNombre(usuarioRegistroDto.getNombre());
		usuario.setApellido(usuarioRegistroDto.getApellido());
		usuario.setEmail(usuarioRegistroDto.getEmail());

		return usuarioRepositorio.save(usuario);
	}

	@Override
	public void eliminarUsuario(Long id) {
		usuarioRepositorio.deleteById(id);
	}
}
