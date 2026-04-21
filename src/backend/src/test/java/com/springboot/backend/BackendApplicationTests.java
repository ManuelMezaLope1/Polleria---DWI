package com.springboot.backend;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.springboot.backend.categoria.modelo.Categoria;
import com.springboot.backend.categoria.servicio.CategoriaServicio;
import com.springboot.backend.plato.modelo.Plato;
import com.springboot.backend.plato.servicio.PlatoServicio;
import com.springboot.backend.rol.modelo.Rol;
import com.springboot.backend.rol.servicio.RolServicio;
import com.springboot.backend.usuario.modelo.Usuario;
import com.springboot.backend.usuario.servicio.UsuarioServicio;

@SpringBootTest
class BackendApplicationTests {
	/*===================================================================================*/
	/*										CATEGORIA									 */
	/*===================================================================================*/
	@Test
	void contextLoads() {
		Categoria categoria=new Categoria(1L,"Nombre","Descripcion",null);

		CategoriaServicio categoriaServicio=new CategoriaServicio();

		final Categoria resultado=categoriaServicio.crearCategoria(1L,"Nombre","Descripcion",null);

		Assertions.assertEquals(categoria.id, resultado.id);
		Assertions.assertEquals(categoria.nombre, resultado.nombre,"Los nombre son iguales");

		Assertions.assertEquals(categoria, resultado);
	}

	@Test
	void TestObtenerCategoria() {
		CategoriaServicio categoriaServicio=new CategoriaServicio();

		final Categoria resultado=categoriaServicio.obtenerCategoria(1L);

		Assertions.assertEquals(null, resultado);
	}

	/*===================================================================================*/
	/*										PLATO									 	 */
	/*===================================================================================*/

	@Test
	void TestRegistrarPlato(){
		Plato plato=new Plato(1L,"Nombre","Categoria","Descripcion",20.1);

		PlatoServicio platoServicio=new PlatoServicio();

		final Plato resultado=platoServicio.crearPlato(1L, "Nombre", "Categoria", "Descripcion", 20.1);

		Assertions.assertEquals(plato.id, resultado.id);
		Assertions.assertEquals(plato, resultado);
	}

	@Test
	void TestObtenerPlato(){
		PlatoServicio platoServicio=new PlatoServicio();

		final Plato resultado=platoServicio.obtenerPlato(1L);

		Assertions.assertEquals(null, resultado);
	}

	/*===================================================================================*/
	/*										USUARIO									 	 */
	/*===================================================================================*/

	@Test
	void TestRegistrarUsuario(){
		Usuario usuario=new Usuario(1L,"Nombre","Apellido","Email","Password",null);

		UsuarioServicio usuarioServicio=new UsuarioServicio();

		final Usuario resultado=usuarioServicio.crearUsuario(1L, "Nombre", "Apellido", "Email", "Password",null);

		Assertions.assertEquals(usuario, resultado);
	}

	@Test
	void TestObtenerUsuario(){
		UsuarioServicio usuarioServicio=new UsuarioServicio();

		final Usuario resultado=usuarioServicio.obtenerUsuario(1L);

		Assertions.assertEquals(null, resultado);
	}

	/*===================================================================================*/
	/*										ROL									 		 */
	/*===================================================================================*/

	@Test 
	void TestRegistrarRol(){
		Rol rol=new Rol(1L, "Rol",null);

		RolServicio rolServicio=new RolServicio();

		final Rol resultado=rolServicio.crearRol(1L, "Rol", null);

		Assertions.assertEquals(rol, resultado);
	}

	@Test
	void TestObtenerRol(){
		RolServicio rolServicio=new RolServicio();

		final Rol resultado=rolServicio.obtenerRol(1L);

		Assertions.assertEquals(null, resultado);
	}
}
