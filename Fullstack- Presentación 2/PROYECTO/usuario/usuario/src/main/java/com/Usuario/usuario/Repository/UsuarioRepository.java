package com.Usuario.usuario.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Usuario.usuario.Model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCorreoAndClave(String correo, String clave);

}