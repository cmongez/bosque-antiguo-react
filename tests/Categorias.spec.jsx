import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

// Mocks de CSS e imágenes para evitar errores en Vitest
vi.mock("\\.(css|scss)$", () => ({}));
vi.mock("\\.(png|jpg|jpeg|svg|webp)$", () => "");

describe("Categorias", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("muestra categorías únicas y filtra por botón", async () => {
        // Catálogo simulado en localStorage
        const catalog = [
            { codigo: "1", nombre: "Rosa", categoria: "Flores", descripcion: "", precio: 1000, stock: 5, stockCritico: 1, img: "/img/r.jpg" },
            { codigo: "2", nombre: "Aloe", categoria: "Suculentas", descripcion: "", precio: 2000, stock: 2, stockCritico: 1, img: "/img/a.jpg" },
            { codigo: "3", nombre: "Ruda", categoria: "Hierbas", descripcion: "", precio: 1500, stock: 3, stockCritico: 1, img: "/img/h.jpg" },
            { codigo: "4", nombre: "Tulipán", categoria: "Flores", descripcion: "", precio: 1700, stock: 10, stockCritico: 1, img: "/img/t.jpg" },
        ];
        localStorage.setItem("productos", JSON.stringify(catalog));

        // Import dinámico del componente para evitar errores de carga
        const mod = await import("../src/pages/Categoria");
        const Categorias = mod.Categorias ?? mod.default;

        render(
            <MemoryRouter>
                <Categorias />
            </MemoryRouter>
        );

        // Botones de categorías
        const floresBtn = screen.getByRole("button", { name: /flores/i });
        const suculentasBtn = screen.getByRole("button", { name: /suculentas/i });
        const hierbasBtn = screen.getByRole("button", { name: /hierbas/i });
        const todasBtn = screen.getByRole("button", { name: /todas/i });

        expect(floresBtn).toBeInTheDocument();
        expect(suculentasBtn).toBeInTheDocument();
        expect(hierbasBtn).toBeInTheDocument();
        expect(todasBtn).toBeInTheDocument();

        // Click en "Flores": deben aparecer solo Rosa y Tulipán
        fireEvent.click(floresBtn);

        const visiblesFlores = screen.getAllByText(/rosa|tulipán/i);
        expect(visiblesFlores).toHaveLength(2);

        // Y NO deben verse productos de otras categorías
        expect(screen.queryByText(/aloe/i)).toBeNull();
        expect(screen.queryByText(/ruda/i)).toBeNull();
    });

    it("filtra por búsqueda en el input", async () => {
        const catalog = [
            { codigo: "1", nombre: "Rosa", categoria: "Flores", descripcion: "", precio: 1000, stock: 5, stockCritico: 1, img: "/img/r.jpg" },
            { codigo: "2", nombre: "Aloe", categoria: "Suculentas", descripcion: "", precio: 2000, stock: 2, stockCritico: 1, img: "/img/a.jpg" },
            { codigo: "3", nombre: "Ruda", categoria: "Hierbas", descripcion: "", precio: 1500, stock: 3, stockCritico: 1, img: "/img/h.jpg" },
        ];
        localStorage.setItem("productos", JSON.stringify(catalog));

        const mod = await import("../src/pages/Categoria");
        const Categorias = mod.Categorias ?? mod.default;

        render(
            <MemoryRouter>
                <Categorias />
            </MemoryRouter>
        );

        // Campo de búsqueda (por placeholder o textbox genérico)
        const input =
            screen.queryByPlaceholderText(/buscar|nombre|busca/i) ??
            screen.getByRole("textbox");

        await userEvent.clear(input);
        await userEvent.type(input, "aloe");

        // Debe aparecer solo Aloe
        expect(screen.getByText(/aloe/i)).toBeInTheDocument();
        expect(screen.queryByText(/rosa/i)).toBeNull();
        expect(screen.queryByText(/ruda/i)).toBeNull();
    });
});
