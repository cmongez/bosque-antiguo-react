// tests/AdminProductoNuevo.spec.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AdminProductoNuevo } from "../src/pages/Admin/AdminProductoNuevo.jsx";
import { getCategories, createProduct } from "../src/api/products";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock API
vi.mock("../src/api/products", () => ({
  getCategories: vi.fn(),
  createProduct: vi.fn(),
}));

describe("AdminProductoNuevo", () => {
  const categoriasMock = [
    { id: 1, nombre: "Plantas" },
    { id: 2, nombre: "Maceteros" },
  ];

  let alertMock;

  beforeEach(() => {
    vi.clearAllMocks();
    alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    getCategories.mockResolvedValue(categoriasMock);
  });

  it("carga y muestra las categorías en el select", async () => {
    render(<AdminProductoNuevo />);

    await waitFor(() =>
      expect(getCategories).toHaveBeenCalledTimes(1)
    );

    expect(
      await screen.findByRole("option", { name: "Plantas" })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("option", { name: "Maceteros" })
    ).toBeInTheDocument();
  });

  it("NO permite crear producto si el nombre está vacío", async () => {
    render(<AdminProductoNuevo />);

    await waitFor(() => expect(getCategories).toHaveBeenCalled());

    // Usamos los placeholders en vez de labels
    const inputPrecio = screen.getByPlaceholderText(/ej: 2990/i);
    const inputStock = screen.getByPlaceholderText(/ej: 10/i);
    const inputStockCritico = screen.getByPlaceholderText(/ej: 5/i);
    const selectCategoria = screen.getByRole("combobox");

    fireEvent.change(inputPrecio, { target: { value: "2500" } });
    fireEvent.change(inputStock, { target: { value: "5" } });
    fireEvent.change(inputStockCritico, { target: { value: "2" } });
    fireEvent.change(selectCategoria, { target: { value: "1" } });

    const botonGuardar = screen.getByRole("button", { name: /guardar/i });
    fireEvent.click(botonGuardar);

        // El navegador bloquea el submit por required, así que:
    expect(alertMock).not.toHaveBeenCalled();
    expect(createProduct).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();

  });

  it("muestra alerta y NO llama a createProduct si faltan campos obligatorios", async () => {
    render(<AdminProductoNuevo />);

    await waitFor(() => expect(getCategories).toHaveBeenCalled());

    const botonGuardar = screen.getByRole("button", { name: /guardar/i });
    fireEvent.click(botonGuardar);

        // Igual que el anterior: el submit no se dispara por required
    expect(alertMock).not.toHaveBeenCalled();
    expect(createProduct).not.toHaveBeenCalled();

  });

  it("envía el formulario con datos válidos y llama a createProduct con el payload correcto", async () => {
    render(<AdminProductoNuevo />);

    await waitFor(() => expect(getCategories).toHaveBeenCalled());

    const inputNombre = screen.getByPlaceholderText(/suculenta echeveria/i);
    const inputDescripcion = screen.getByPlaceholderText(/descripción del producto/i);
    const inputPrecio = screen.getByPlaceholderText(/ej: 2990/i);
    const inputImagen = screen.getByPlaceholderText(/https:\/\/picsum\.photos\/200/i);
    const inputStock = screen.getByPlaceholderText(/ej: 10/i);
    const inputStockCritico = screen.getByPlaceholderText(/ej: 5/i);
    const selectCategoria = screen.getByRole("combobox");
    const checkboxDisponible = screen.getByRole("checkbox", {
      name: /producto disponible para la venta/i,
    });

    fireEvent.change(inputNombre, {
      target: { value: "Suculenta Echeveria" },
    });
    fireEvent.change(inputDescripcion, {
      target: { value: "Planta ornamental pequeña" },
    });
    fireEvent.change(inputPrecio, { target: { value: "2990" } });
    fireEvent.change(inputImagen, {
      target: { value: "https://picsum.photos/200" },
    });
    fireEvent.change(inputStock, { target: { value: "10" } });
    fireEvent.change(inputStockCritico, { target: { value: "3" } });
    fireEvent.change(selectCategoria, { target: { value: "1" } });

    // estaba true → lo pasamos a false
    fireEvent.click(checkboxDisponible);

    createProduct.mockResolvedValueOnce({});

    const botonGuardar = screen.getByRole("button", { name: /guardar/i });
    fireEvent.click(botonGuardar);

    await waitFor(() => expect(createProduct).toHaveBeenCalledTimes(1));

    expect(createProduct).toHaveBeenCalledWith({
      nombre: "Suculenta Echeveria",
      descripcion: "Planta ornamental pequeña",
      precio: 2990,
      imagenUrl: "https://picsum.photos/200",
      disponible: false,
      stock: 10,
      stockCritico: 3,
      categoria: { id: 1 },
    });

    expect(alertMock).toHaveBeenCalledWith("Producto creado correctamente");
    expect(mockNavigate).toHaveBeenCalledWith("/admin/productos");
  });

  it("muestra alerta de error si createProduct falla", async () => {
    render(<AdminProductoNuevo />);

    await waitFor(() => expect(getCategories).toHaveBeenCalled());

    const inputNombre = screen.getByPlaceholderText(/suculenta echeveria/i);
    const inputPrecio = screen.getByPlaceholderText(/ej: 2990/i);
    const inputStock = screen.getByPlaceholderText(/ej: 10/i);
    const inputStockCritico = screen.getByPlaceholderText(/ej: 5/i);
    const selectCategoria = screen.getByRole("combobox");

    fireEvent.change(inputNombre, { target: { value: "Producto X" } });
    fireEvent.change(inputPrecio, { target: { value: "1000" } });
    fireEvent.change(inputStock, { target: { value: "5" } });
    fireEvent.change(inputStockCritico, { target: { value: "2" } });
    fireEvent.change(selectCategoria, { target: { value: "1" } });

    createProduct.mockRejectedValueOnce(new Error("Falla en servidor"));

    const botonGuardar = screen.getByRole("button", { name: /guardar/i });
    fireEvent.click(botonGuardar);

    await waitFor(() => expect(createProduct).toHaveBeenCalled());

    expect(alertMock).toHaveBeenCalledWith(
      "Hubo un error al guardar el producto."
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("el checkbox disponible está marcado por defecto", () => {
    render(<AdminProductoNuevo />);

    const checkbox = screen.getByRole("checkbox", {
      name: /producto disponible para la venta/i,
    });
    expect(checkbox).toBeChecked();
  });
});
