package com.polleria.proyecto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.polleria.proyecto.usuario.modelo.Rol;
import com.polleria.proyecto.usuario.modelo.Usuario;
import com.polleria.proyecto.usuario.repositorio.UsuarioRepositorio;

@SpringBootApplication
public class ProyectoApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(ProyectoApplication.class, args);
	}

	@Autowired
	private UsuarioRepositorio repositorio;
	private final PasswordEncoder passwordEncoder;

	public ProyectoApplication(UsuarioRepositorio repositorio,
                           PasswordEncoder passwordEncoder) {
        this.repositorio = repositorio;
        this.passwordEncoder = passwordEncoder;
    }

	@Override
	public void run(String... args) throws Exception{
		/*Usuario admin=new Usuario();

		admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin123")); // contraseña hasheada
            // Asigna roles
            Rol rolAdmin = new Rol();
			rolAdmin.setNombre("admin");
            admin.getRoles().add(rolAdmin);

		repositorio.save(admin);*/
	}
}
