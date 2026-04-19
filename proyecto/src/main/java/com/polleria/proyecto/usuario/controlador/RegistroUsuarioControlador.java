package com.polleria.proyecto.usuario.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.polleria.proyecto.usuario.controlador.dto.UsuarioRegistroDto;
import com.polleria.proyecto.usuario.modelo.Usuario;
import com.polleria.proyecto.usuario.servicio.UsuarioServicio;

@Controller
public class RegistroUsuarioControlador {
	@Autowired
    private UsuarioServicio servicio;

    public RegistroUsuarioControlador(UsuarioServicio servicio){
        super();
        this.servicio=servicio;
    }

	@GetMapping("prueba/usuario")
	public String listarTodosLosUsuarios(Model modelo) {
		modelo.addAttribute("usuarios",servicio.listarUsuarios());
		return "extra/usuario";
	}
	

    @ModelAttribute("usuario")
	public UsuarioRegistroDto retornarNuevoUsuarioRegistroDTO() {
		return new UsuarioRegistroDto();
	}

	@GetMapping("/registro")
	public String mostrarFormularioDeRegistro() {
		return "registro";
	}

    @PostMapping("registro/nuevo")
	public String registrarCuentaDeUsuario(@ModelAttribute("usuario") UsuarioRegistroDto registroDTO) {
		servicio.guardar(registroDTO);
		return "redirect:/registro?exito";
	}

	@GetMapping("/prueba/usuario/editar/{id}")
	public String mostrarFormularioDeEditar(@PathVariable Long id, Model modelo) {
		modelo.addAttribute("usuario", servicio.obtenerUsuarioPorId(id));
		return "edicion/editar_usuario";
	}

	@PostMapping("/prueba/usuario/{id}")
	public String actualizarUsuario(@PathVariable Long id, @ModelAttribute("usuario") UsuarioRegistroDto registroDTO, Model modelo) {
		servicio.actualizarUsuario(id, registroDTO);

		return "redirect:/prueba/usuario";
	}
	
	@GetMapping("/prueba/usuario/eliminar/{id}")
	public String eliminarUsuario(@PathVariable Long id) {
		servicio.eliminarUsuario(id);
		return "redirect:/prueba/usuario";
	}
}
