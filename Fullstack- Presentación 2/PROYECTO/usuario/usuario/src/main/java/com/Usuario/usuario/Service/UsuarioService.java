package com.Usuario.usuario.Service;

import java.util.List;
import java.util.Optional;

import com.Usuario.usuario.Model.Usuario;

public interface UsuarioService {
    List<Usuario> obtenerTodos();
    Optional<Usuario> obtenerPorId(Long id);
    Usuario crear(Usuario usuario);
    Usuario actualizar(Long id, Usuario usuario);
    void eliminar(Long id);
    Optional<Usuario> login(String correo, String clave);
}