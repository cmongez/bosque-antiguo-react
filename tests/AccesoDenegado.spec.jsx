import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AccesoDenegado from '../pages/AccesoDenegado'
import * as useAuthModule from '../hooks/useAuth'

// Mock del useAuth
vi.mock('../hooks/useAuth')

describe('AccesoDenegado', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock por defecto
    vi.mocked(useAuthModule.useAuth).mockReturnValue({
      isAuthenticated: false,
      user: null,
      roles: [],
      hasRole: () => false
    })
  })

  it('debe renderizar el título y mensaje principal', () => {
    render(
      <MemoryRouter>
        <AccesoDenegado />
      </MemoryRouter>
    )

    expect(screen.getByText('Acceso Denegado')).toBeInTheDocument()
    expect(screen.getByText('No tienes permisos para acceder a esta página.')).toBeInTheDocument()
  })

  it('debe mostrar información del usuario cuando está autenticado', () => {
    vi.mocked(useAuthModule.useAuth).mockReturnValue({
      isAuthenticated: true,
      user: {
        id: 1,
        email: 'test@test.com',
        nombre: 'Juan',
        apellido: 'Pérez'
      },
      roles: ['CLIENTE'],
      hasRole: (role) => role === 'CLIENTE'
    })

    render(
      <MemoryRouter initialEntries={['/acceso-denegado']} initialIndex={0}>
        <AccesoDenegado />
      </MemoryRouter>
    )

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('test@test.com')).toBeInTheDocument()
    expect(screen.getByText('CLIENTE')).toBeInTheDocument()
  })

  it('debe mostrar roles requeridos cuando están disponibles en el state', () => {
    const mockLocation = {
      state: {
        requiredRoles: ['ADMIN', 'VENDEDOR']
      }
    }

    // Mock useLocation
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom')
      return {
        ...actual,
        useLocation: () => mockLocation
      }
    })

    vi.mocked(useAuthModule.useAuth).mockReturnValue({
      isAuthenticated: true,
      user: {
        id: 1,
        email: 'test@test.com',
        nombre: 'Juan',
        apellido: 'Pérez'
      },
      roles: ['CLIENTE'],
      hasRole: () => false
    })

    render(
      <MemoryRouter>
        <AccesoDenegado />
      </MemoryRouter>
    )

    expect(screen.getByText('ADMIN, VENDEDOR')).toBeInTheDocument()
  })

  it('debe mostrar mensaje cuando no hay roles asignados', () => {
    vi.mocked(useAuthModule.useAuth).mockReturnValue({
      isAuthenticated: true,
      user: {
        id: 1,
        email: 'test@test.com',
        nombre: 'Juan',
        apellido: 'Pérez'
      },
      roles: [],
      hasRole: () => false
    })

    render(
      <MemoryRouter>
        <AccesoDenegado />
      </MemoryRouter>
    )

    expect(screen.getByText('Sin roles asignados')).toBeInTheDocument()
  })

  it('debe tener enlaces de navegación', () => {
    render(
      <MemoryRouter>
        <AccesoDenegado />
      </MemoryRouter>
    )

    expect(screen.getByText('Ir al Inicio')).toBeInTheDocument()
    expect(screen.getByText('Volver Atrás')).toBeInTheDocument()
    
    // Verificar que los enlaces tengan los href correctos
    expect(screen.getByText('Ir al Inicio').closest('a')).toHaveAttribute('href', '/')
  })

  it('debe tener elementos semánticos HTML5 correctos', () => {
    render(
      <MemoryRouter>
        <AccesoDenegado />
      </MemoryRouter>
    )

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument() // header
    expect(screen.getByRole('contentinfo')).toBeInTheDocument() // footer
    expect(screen.getByRole('alert')).toBeInTheDocument() // alert
  })

  it('debe tener atributos de accesibilidad', () => {
    render(
      <MemoryRouter>
        <AccesoDenegado />
      </MemoryRouter>
    )

    const botonVolver = screen.getByText('Volver Atrás')
    const linkInicio = screen.getByText('Ir al Inicio')
    
    expect(botonVolver).toHaveAttribute('aria-label', 'Volver a la página anterior')
    expect(linkInicio).toHaveAttribute('aria-label', 'Volver al inicio')
  })
})