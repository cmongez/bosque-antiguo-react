package com.Usuario.usuario.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Usuario.usuario.Model.Usuario;
import com.Usuario.usuario.Repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository repo;

    @Override
    public List<Usuario> obtenerTodos() {
        return repo.findAll();
    }

    @Override
    public Optional<Usuario> obtenerPorId(Long id) {
        return repo.findById(id);
    }

    @Override
    public Usuario crear(Usuario usuario) {
        return repo.save(usuario);
    }

    @Override
    public Usuario actualizar(Long id, Usuario usuario) {
        usuario.setId(id);
        return repo.save(usuario);
    }

    @Override
    public void eliminar(Long id) {
        repo.deleteById(id);
    }

    @Override
    public Optional<Usuario> login(String correo, String clave) {
    return repo.findByCorreoAndClave(correo, clave);
}
}