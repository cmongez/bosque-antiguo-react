import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { ProductCard } from "../src/components/ProductCard"; // ajusta la ruta si difiere

// Helper para renderizar con router (por el <Link/>)
const renderWithRouter = (ui) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

const baseProducto = {
  nombre: "Sustrato Premium",
  descripcion: "Sustrato aireado con perlita para plantas",
  precio: 12990,
  stock: 20,
  stockCritico: 5,
  categoria: "Sustratos",
  codigo: "SUB-001",
  // usar una ruta relativa para que new URL(producto.img, import.meta.url) resuelva bien en JSDOM
  img: "./test-image.png",
};

describe("ProductCard", () => {
  

  it("muestra stock en verde cuando stock > stockCrítico", () => {
    const producto = { ...baseProducto, stock: 20, stockCritico: 5 };
    renderWithRouter(<ProductCard producto={producto} addToCart={vi.fn()} />);

    const stockP = screen.getByText(/stock:/i).closest("p");
    expect(stockP).toHaveTextContent("Stock: 20");
    expect(stockP).toHaveClass("text-success");
    expect(stockP).not.toHaveTextContent("¡Últimas unidades!");
  });

  it("muestra stock en rojo y la leyenda de últimas unidades cuando stock <= stockCrítico", () => {
    const producto = { ...baseProducto, stock: 5, stockCritico: 5 };
    renderWithRouter(<ProductCard producto={producto} addToCart={vi.fn()} />);

    const stockP = screen.getByText(/stock:/i).closest("p");
    expect(stockP).toHaveTextContent("Stock: 5");
    expect(stockP).toHaveClass("text-danger");
    expect(stockP).toHaveTextContent("¡Últimas unidades!");
  });

  it("el botón 'Ver detalle' navega a /detalle?codigo=<codigo>", () => {
    renderWithRouter(
      <ProductCard producto={baseProducto} addToCart={vi.fn()} />
    );
    const link = screen.getByRole("link", { name: /ver detalle/i });
    // En JSDOM, el href será absoluto (http://localhost/detalle?codigo=SUB-001)
    expect(link).toHaveAttribute("href");
    expect(link.getAttribute("href")).toContain(`/detalle?codigo=${baseProducto.codigo}`);
  });

  it("al hacer click en 'Añadir' llama a addToCart con el código del producto", async () => {
    const addToCart = vi.fn();
    renderWithRouter(
      <ProductCard producto={baseProducto} addToCart={addToCart} />
    );

    const addBtn = screen.getByRole("button", { name: /añadir/i });
    await userEvent.click(addBtn);

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(baseProducto.codigo);
  });

  it("formatea el precio en CLP con separador de miles es-CL", () => {
    const producto = { ...baseProducto, precio: 1234567 };
    renderWithRouter(<ProductCard producto={producto} addToCart={vi.fn()} />);

    // "1.234.567" en es-CL
    const precioP = screen.getByText(/precio:/i).closest("p");
    expect(precioP).toHaveTextContent("1.234.567");
  });
});
