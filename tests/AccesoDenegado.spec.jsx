// tests/AccesoDenegado.spec.jsx
import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AccesoDenegado from "../src/pages/AccesoDenegado.jsx";
import { useAuth } from "../src/hooks/useAuth.js";

// Mock del hook useAuth
vi.mock("../src/hooks/useAuth.js");
const mockedUseAuth = vi.mocked(useAuth);

describe("AccesoDenegado", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Estado por defecto: no autenticado
    mockedUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      roles: [],
      hasRole: () => false,
    });
  });

  it("debe renderizar el título y mensaje principal", () => {
    render(
      <MemoryRouter>
        <AccesoDenegado />
      </MemoryRouter>
    );

    expect(screen.getByText("Acceso Denegado")).toBeInTheDocument();
    expect(
      screen.getByText("No tienes permisos para acceder a esta página.")
    ).toBeInTheDocument();
  });

  it("debe mostrar información del usuario cuando está autenticado", () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: {
        id: 1,
        email: "test@test.com",
        nombre: "Juan",
        apellido: "Pérez",
      },
      roles: ["CLIENTE"],
      hasRole: (role) => role === "CLIENTE",
    });

    render(
      <MemoryRouter initialEntries={["/acceso-denegado"]}>
        <AccesoDenegado />
      </MemoryRouter>
    );

    const infoTitle = screen.getByText(/Información de tu cuenta/i);
    const infoCard = infoTitle.closest(".card-body") || infoTitle.parentElement;

    expect(infoCard).toHaveTextContent(/Usuario:/i);
    expect(infoCard).toHaveTextContent(/Juan/);
    expect(infoCard).toHaveTextContent(/Pérez/);
    expect(infoCard).toHaveTextContent(/test@test\.com/i);
    expect(infoCard).toHaveTextContent(/Tus roles:/i);
    expect(infoCard).toHaveTextContent(/CLIENTE/i);
  });

  it("debe mostrar roles requeridos cuando vienen en location.state", () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: {
        id: 1,
        email: "test@test.com",
        nombre: "Juan",
        apellido: "Pérez",
      },
      roles: ["CLIENTE"],
      hasRole: () => false,
    });

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/acceso-denegado",
            state: { requiredRoles: ["ADMIN", "VENDEDOR"] },
          },
        ]}
      >
        <AccesoDenegado />
      </MemoryRouter>
    );

    // ahora buscamos solo "Roles requeridos:"
    expect(screen.getByText(/Roles requeridos:/i)).toBeInTheDocument();
    expect(screen.getByText("ADMIN, VENDEDOR")).toBeInTheDocument();
  });


  it("debe mostrar mensaje cuando no hay roles asignados", () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: {
        id: 1,
        email: "test@test.com",
        nombre: "Juan",
        apellido: "Pérez",
      },
      roles: [],
      hasRole: () => false,
    });

    render(
      <MemoryRouter>
        <AccesoDenegado />
      </MemoryRouter>
    );

    const infoTitle = screen.getByText(/Información de tu cuenta/i);
    const infoCard = infoTitle.closest(".card-body") || infoTitle.parentElement;

    expect(infoCard).toHaveTextContent(/Tus roles:/i);
    expect(infoCard).toHaveTextContent(/Sin roles asignados/i);
  });

  it("debe tener enlaces de navegación básicos", () => {
    render(
      <MemoryRouter>
        <AccesoDenegado />
      </MemoryRouter>
    );

    const linkInicio = screen.getByText("Ir al Inicio");
    const botonVolver = screen.getByText("Volver Atrás");

    expect(linkInicio).toBeInTheDocument();
    expect(botonVolver).toBeInTheDocument();

    expect(linkInicio).toHaveAttribute("aria-label", "Volver al inicio");
    expect(linkInicio.closest("a")).toHaveAttribute("href", "/");
    expect(botonVolver).toHaveAttribute(
      "aria-label",
      "Volver a la página anterior"
    );
  });
});
