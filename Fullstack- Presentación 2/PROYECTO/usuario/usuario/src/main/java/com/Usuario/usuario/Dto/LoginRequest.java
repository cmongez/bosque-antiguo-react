package com.Usuario.usuario.Dto;


import lombok.Data;

@Data
public class LoginRequest {
    private String correo;
    private String clave;
}

