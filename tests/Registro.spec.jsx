import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { act } from "react";
import { Registro } from "../src/pages/Registro/Registro";

// Ahora acepta un "user" para funcionar bien con fake timers
const fillValidForm = async (user = userEvent) => {
  await user.type(screen.getByLabelText(/nombre/i), "Ana");
  await user.type(screen.getByLabelText(/apellidos/i), "Pérez");
  // RUN válido (sin puntos ni guion, 7-8 dígitos + dígito o K/k)
  await user.type(screen.getByLabelText(/run/i), "19011022K");
  await user.type(screen.getByLabelText(/fecha de nacimiento/i), "2000-01-01");

  // Seleccionar opción en <select>
  await user.selectOptions(screen.getByLabelText(/género/i), "Femenino");

  await user.type(
    screen.getByLabelText(/correo electrónico \(usuario\)/i),
    "ana@duoc.cl"
  );
  await user.type(screen.getByLabelText(/dirección/i), "Calle 123");
  await user.type(screen.getByLabelText(/código postal/i), "123456");
  await user.type(screen.getByLabelText(/^contraseña$/i), "Clave1");
  await user.type(screen.getByLabelText(/repetir contraseña/i), "Clave1");

  // marcar checkbox requerido
  await user.click(screen.getByLabelText(/no soy un robot/i));
};

describe("Componente Registro", () => {
  let alertSpy;

  beforeEach(() => {
    alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    alertSpy.mockRestore();
  });

  it("renderiza los campos clave y el botón Registrar", () => {
    render(<Registro />);
    // Inputs principales
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellidos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/run/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha de nacimiento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/género/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/correo electrónico \(usuario\)/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/código postal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/repetir contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/no soy un robot/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /registrar/i })
    ).toBeInTheDocument();

    // Link a login
    const link = screen.getByRole("link", { name: /inicia sesión aquí/i });
    expect(link).toHaveAttribute("href", "/login");
  });

  it("muestra error cuando las contraseñas no coinciden", async () => {
    const { container } = render(<Registro />);
    // Evita que la validación nativa bloquee el submit en JSDOM
    container.querySelector("form")?.setAttribute("noValidate", "true");

    await userEvent.type(screen.getByLabelText(/nombre/i), "Ana");
    await userEvent.type(screen.getByLabelText(/apellidos/i), "Pérez");
    await userEvent.type(screen.getByLabelText(/run/i), "19011022K");
    await userEvent.type(
      screen.getByLabelText(/fecha de nacimiento/i),
      "2000-01-01"
    );
    await userEvent.selectOptions(screen.getByLabelText(/género/i), "Femenino");
    await userEvent.type(
      screen.getByLabelText(/correo electrónico \(usuario\)/i),
      "ana@duoc.cl"
    );
    await userEvent.type(screen.getByLabelText(/dirección/i), "Calle 123");
    await userEvent.type(screen.getByLabelText(/código postal/i), "123456");
    await userEvent.type(screen.getByLabelText(/^contraseña$/i), "Clave1");
    await userEvent.type(
      screen.getByLabelText(/repetir contraseña/i),
      "Clave2"
    ); // distinta
    await userEvent.click(screen.getByLabelText(/no soy un robot/i));
    await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

    // Espera el re-render
    expect(
      await screen.findByText(/las contraseñas no coinciden/i)
    ).toBeInTheDocument();

    // No debería haberse llamado alert
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it("valida la política de contraseña y muestra alert si es inválida", async () => {
    const { container } = render(<Registro />);
    container.querySelector("form")?.setAttribute("noValidate", "true");

    await userEvent.type(screen.getByLabelText(/nombre/i), "Ana");
    await userEvent.type(screen.getByLabelText(/apellidos/i), "Pérez");
    await userEvent.type(screen.getByLabelText(/run/i), "19011022K");
    await userEvent.type(
      screen.getByLabelText(/fecha de nacimiento/i),
      "2000-01-01"
    );
    await userEvent.selectOptions(screen.getByLabelText(/género/i), "Femenino");
    await userEvent.type(
      screen.getByLabelText(/correo electrónico \(usuario\)/i),
      "ana@duoc.cl"
    );
    await userEvent.type(screen.getByLabelText(/dirección/i), "Calle 123");
    await userEvent.type(screen.getByLabelText(/código postal/i), "123456");

    // Contraseña sin mayúscula ni número -> inválida
    await userEvent.type(screen.getByLabelText(/^contraseña$/i), "invalida");
    await userEvent.type(
      screen.getByLabelText(/repetir contraseña/i),
      "invalida"
    );
    await userEvent.click(screen.getByLabelText(/no soy un robot/i)); // requerido
    await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringMatching(/contraseña.*mínimo 6.*mayúscula.*número/i)
    );
  });

  it("valida formato de RUN y muestra alert si es inválido", async () => {
    render(<Registro />);
    await fillValidForm();

    // Sobrescribir RUN con un valor inválido (con puntos/guion)
    const run = screen.getByLabelText(/run/i);
    await userEvent.clear(run);
    await userEvent.type(run, "12.345.678-9");
    await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringMatching(/run inválido/i)
    );
  });

  it("valida dominio de correo permitido y muestra alert si no corresponde", async () => {
    render(<Registro />);
    await fillValidForm();

    // Cambiar correo a dominio no permitido
    const correo = screen.getByLabelText(/correo electrónico \(usuario\)/i);
    await userEvent.clear(correo);
    await userEvent.type(correo, "ana@yahoo.com");
    await userEvent.click(screen.getByRole("button", { name: /registrar/i }));

    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringMatching(
        /correo inválido.*duoc\.cl.*profesor\.duoc\.cl.*gmail\.com/i
      )
    );
  });

  it("permite marcar/desmarcar 'No soy un robot'", async () => {
    render(<Registro />);
    const checkbox = screen.getByLabelText(/no soy un robot/i);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  
});
