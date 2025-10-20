import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

//  Stubs de assets que suelen romper el import de componentes en Vitest
vi.mock("\\.(css|scss)$", () => ({}));
vi.mock("\\.(png|jpg|jpeg|svg)$", () => "");


describe("Productos", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it("muestra 'Cargando productos...' y luego renderiza cards y persiste en localStorage", async () => {
        // Mock de fetch que usa la página Productos para cargar el catálogo
        const fakeData = [
            {
                codigo: "A1",
                nombre: "Aloe",
                descripcion: "Planta",
                precio: 1000,
                stock: 5,
                stockCritico: 1,
                categoria: "Suculentas",
                img: "/img/a.jpg",
            },
            {
                codigo: "B1",
                nombre: "Bonsai",
                descripcion: "Árbol",
                precio: 2000,
                stock: 2,
                stockCritico: 1,
                categoria: "Árboles",
                img: "/img/b.jpg",
            },
        ];
        global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue(fakeData),
        });

        //  Import dinámico para que, si algún import interno (CSS/img) falla,
        // el test igual quede registrado y veamos el error aquí (no “No test suite found…”).
        const mod = await import("../src/pages/Productos");
        const Productos = mod.Productos ?? mod.default;

        render(
            <MemoryRouter>
                <Productos />
            </MemoryRouter>
        );

        // Estado de carga
        expect(screen.getByText(/cargando productos/i)).toBeInTheDocument();

        // Luego del fetch, debe aparecer el título/listado
        await waitFor(() => {
            expect(screen.getByText(/nuestros productos/i)).toBeInTheDocument();
        });

        // Renderiza alguna card
        expect(screen.getByText(/aloe/i)).toBeInTheDocument();
        expect(screen.getByText(/bonsai/i)).toBeInTheDocument();

        // y persiste el catálogo en localStorage
        const saved = JSON.parse(localStorage.getItem("productos"));
        expect(Array.isArray(saved)).toBe(true);
        expect(saved).toHaveLength(2);
    });
});
