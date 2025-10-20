import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/react";
import { vi } from "vitest";

// Mocks de CSS/imágenes para evitar errores en jsdom
vi.mock("\\.(css|scss)$", () => ({}));
vi.mock("\\.(png|jpg|jpeg|svg|webp)$", () => "");

describe("CheckOut", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();

        // Catálogo + carrito (para que el checkout calcule total)
        const products = [
            { codigo: "P1", nombre: "Aloe", precio: 1000 },
            { codigo: "P2", nombre: "Bonsai", precio: 2500 },
        ];
        const cart = [
            { codigo: "P1", cantidad: 2 }, // 2*1000 = 2000
            { codigo: "P2", cantidad: 1 }, // 1*2500 = 2500
        ];
        localStorage.setItem("productos", JSON.stringify(products));
        localStorage.setItem("carrito", JSON.stringify(cart));
    });

    it("calcula total (2*1000 + 1*2500 = 4500) y muestra filas del resumen", async () => {
        // Import dinámico para evitar que un import falle y corte la suite
        const mod = await import("../src/pages/CheckOut");
        const CheckOut = mod.CheckOut ?? mod.default;

        render(
            <MemoryRouter>
                <CheckOut />
            </MemoryRouter>
        );

        // Subtotales por fila
        expect(screen.getByText(/\$?\s*2\.000/)).toBeInTheDocument();
        expect(screen.getByText(/\$?\s*2\.500/)).toBeInTheDocument();

        // Total 4.500 — aparece en más de un lugar (botón y tfoot).
        // Acotamos a la tabla para no chocar con el botón.
        const table = screen.getByRole("table");
        const totalMatches = within(table).getAllByText(/\$?\s*4\.500/);
        expect(totalMatches.length).toBeGreaterThanOrEqual(1);

        // Además, el botón también puede incluir el total ("Pagar $4.500")
        // Chequeo no estricto por si cambia el formato.
        const pagarBtn = screen.getByRole("button", { name: /pagar/i });
        expect(pagarBtn).toBeInTheDocument();
    });

    it("mantiene el botón deshabilitado con datos vacíos o email inválido", async () => {
        const mod = await import("../src/pages/CheckOut");
        const CheckOut = mod.CheckOut ?? mod.default;

        render(
            <MemoryRouter>
                <CheckOut />
            </MemoryRouter>
        );

        const pagarBtn = screen.getByRole("button", { name: /pagar/i });
        // Estado inicial: deshabilitado
        expect(pagarBtn).toBeDisabled();

        // Rellena con nombre y dirección válidos pero email inválido
        await userEvent.type(
            screen.getByPlaceholderText(/constanza contador/i),
            "Constanza Contador"
        );
        await userEvent.type(
            screen.getByPlaceholderText(/tucorreo@/i),
            "correo-invalido"
        );
        await userEvent.type(
            screen.getByPlaceholderText(/calle, número|calle, número, comuna, región/i),
            "Av. Siempre Viva 123"
        );

        // Con email inválido, seguimos esperando que NO permita pagar
        expect(pagarBtn).toBeDisabled();
    });

    it("guarda checkoutUser en localStorage cuando el formulario es válido", async () => {
        const mod = await import("../src/pages/CheckOut");
        const CheckOut = mod.CheckOut ?? mod.default;

        render(
            <MemoryRouter>
                <CheckOut />
            </MemoryRouter>
        );

        // Completar con datos válidos
        await userEvent.type(
            screen.getByPlaceholderText(/constanza contador/i),
            "Constanza Contador"
        );
        await userEvent.type(
            screen.getByPlaceholderText(/tucorreo@/i),
            "coco@example.com"
        );
        await userEvent.type(
            screen.getByPlaceholderText(/calle, número|calle, número, comuna, región/i),
            "Av. Siempre Viva 123"
        );

        const pagarBtn = screen.getByRole("button", { name: /pagar/i });
        // Debe habilitarse cuando los campos son válidos
        expect(pagarBtn).not.toBeDisabled();

        await userEvent.click(pagarBtn);

        const saved = JSON.parse(localStorage.getItem("checkoutUser"));
        expect(saved).toMatchObject({
            name: "Constanza Contador",
            email: "coco@example.com",
            address: "Av. Siempre Viva 123",
        });
    });
});
