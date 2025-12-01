// tests/AdminProductos.spec.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AdminProductos } from "../src/pages/Admin/AdminProductos.jsx";
import {
  getProducts,
  updateProductDisponibilidad,
} from "../src/api/products";

vi.mock("../src/api/products", () => ({
  getProducts: vi.fn(),
  updateProductDisponibilidad: vi.fn(),
}));

describe("AdminProductos", () => {
  const productosMock = [
    {
      codigo: 1,
      nombre: "Suculenta Echeveria",
      descripcion: "Planta ornamental pequeña",
      categoria: "Plantas",
      precio: 2990,
      stock: 3,
      stockCritico: 5,
      disponible: true,
      img: "https://example.com/plant1.jpg",
    },
    {
      codigo: 2,
      nombre: "Macetero Grande",
      descripcion: "Macetero de barro",
      categoria: "Maceteros",
      precio: 4990,
      stock: 10,
      stockCritico: 5,
      disponible: false,
      img: "",
    },
  ];

  let alertMock;

  beforeEach(() => {
    vi.clearAllMocks();
    getProducts.mockResolvedValue(productosMock);
    alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <AdminProductos />
      </MemoryRouter>
    );

  it("muestra estado de carga y luego la tabla con productos", async () => {
    renderComponent();

    // Loading visible al inicio
    expect(
      screen.getByText(/Cargando productos/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/Cargando productos/i)
      ).not.toBeInTheDocument();
    });

    expect(
      await screen.findByText("Suculenta Echeveria")
    ).toBeInTheDocument();
    expect(screen.getByText("Macetero Grande")).toBeInTheDocument();

    expect(screen.getByText("Plantas")).toBeInTheDocument();
    expect(screen.getByText("Maceteros")).toBeInTheDocument();

    expect(screen.getByText(/3 unidades/i)).toBeInTheDocument();
    expect(screen.getByText(/Stock bajo/i)).toBeInTheDocument();

    expect(screen.getByText("Sí")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();

    // Botones de acción (al menos uno de cada tipo)
    expect(
      screen.getAllByRole("button", { name: /Desactivar/i })[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /Activar/i })[0]
    ).toBeInTheDocument();
  });

  it("muestra mensaje cuando no hay productos", async () => {
    getProducts.mockResolvedValueOnce([]);

    renderComponent();

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });

    expect(
      await screen.findByText(/No se han registrado productos\./i)
    ).toBeInTheDocument();
  });

  it("desactiva un producto cuando se hace clic en 'Desactivar'", async () => {
    getProducts
      .mockResolvedValueOnce(productosMock) // carga inicial
      .mockResolvedValueOnce([
        { ...productosMock[0], disponible: false },
        productosMock[1],
      ]); // después de actualizar

    renderComponent();

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });

    const botonDesactivar = await screen.findByRole("button", {
      name: /Desactivar/i,
    });

    updateProductDisponibilidad.mockResolvedValueOnce({});

    fireEvent.click(botonDesactivar);

    await waitFor(() => {
      expect(updateProductDisponibilidad).toHaveBeenCalledTimes(1);
    });

    expect(updateProductDisponibilidad).toHaveBeenCalledWith(1, false);

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(2);
    });

    expect(alertMock).toHaveBeenCalledWith(
      "Producto desactivado correctamente"
    );

    // Con que exista al menos un botón "Activar" nos basta:
    const activarButtons = await screen.findAllByRole("button", {
      name: /Activar/i,
    });
    expect(activarButtons.length).toBeGreaterThan(0);
  });

  it("muestra alerta de error si falla al actualizar la disponibilidad", async () => {
    renderComponent();

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });

    const botonDesactivar = await screen.findByRole("button", {
      name: /Desactivar/i,
    });

    const error = new Error("Falla en el servidor");
    updateProductDisponibilidad.mockRejectedValueOnce(error);

    fireEvent.click(botonDesactivar);

    await waitFor(() => {
      expect(updateProductDisponibilidad).toHaveBeenCalledTimes(1);
    });

    expect(getProducts).toHaveBeenCalledTimes(1);

    expect(alertMock).toHaveBeenCalledWith(
      "Error al actualizar el producto: " + error.message
    );
  });
});
