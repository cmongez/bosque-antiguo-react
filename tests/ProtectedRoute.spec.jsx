import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'

// Mock del localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  removeItem: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true
})

// Mock del componente Navigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Navigate: ({ to, state }) => (
      <div data-testid="navigate" data-to={to} data-state={JSON.stringify(state)} />
    )
  }
})

describe('ProtectedRoute', () => {
  const ChildComponent = () => <div data-testid="child">Contenido Protegido</div>
  
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe redirigir al login cuando no hay token', () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <ChildComponent />
        </ProtectedRoute>
      </MemoryRouter>
    )

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/login')
  })

  it('debe renderizar el componente hijo cuando hay token válido sin roles específicos', () => {
    const validToken = 'header.' + btoa(JSON.stringify({
      userId: 1,
      sub: 'test@test.com',
      roles: ['CLIENTE'],
      exp: Math.floor(Date.now() / 1000) + 3600 // expira en 1 hora
    })) + '.signature'
    
    mockLocalStorage.getItem.mockReturnValue(validToken)
    
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <ChildComponent />
        </ProtectedRoute>
      </MemoryRouter>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('debe redirigir cuando el token ha expirado', () => {
    const expiredToken = 'header.' + btoa(JSON.stringify({
      userId: 1,
      sub: 'test@test.com',
      roles: ['CLIENTE'],
      exp: Math.floor(Date.now() / 1000) - 3600 // expiró hace 1 hora
    })) + '.signature'
    
    mockLocalStorage.getItem.mockReturnValue(expiredToken)
    
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <ChildComponent />
        </ProtectedRoute>
      </MemoryRouter>
    )

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/login')
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token')
  })

  it('debe renderizar cuando el usuario tiene el rol requerido', () => {
    const adminToken = 'header.' + btoa(JSON.stringify({
      userId: 1,
      sub: 'admin@test.com',
      roles: ['ADMIN'],
      exp: Math.floor(Date.now() / 1000) + 3600
    })) + '.signature'
    
    mockLocalStorage.getItem.mockReturnValue(adminToken)
    
    render(
      <MemoryRouter>
        <ProtectedRoute roles={['ADMIN']}>
          <ChildComponent />
        </ProtectedRoute>
      </MemoryRouter>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('debe redirigir a acceso denegado cuando no tiene el rol requerido', () => {
    const clienteToken = 'header.' + btoa(JSON.stringify({
      userId: 1,
      sub: 'cliente@test.com',
      roles: ['CLIENTE'],
      exp: Math.floor(Date.now() / 1000) + 3600
    })) + '.signature'
    
    mockLocalStorage.getItem.mockReturnValue(clienteToken)
    
    render(
      <MemoryRouter>
        <ProtectedRoute roles={['ADMIN']}>
          <ChildComponent />
        </ProtectedRoute>
      </MemoryRouter>
    )

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/acceso-denegado')
  })

  it('debe manejar múltiples roles requeridos', () => {
    const vendedorToken = 'header.' + btoa(JSON.stringify({
      userId: 1,
      sub: 'vendedor@test.com',
      roles: ['VENDEDOR'],
      exp: Math.floor(Date.now() / 1000) + 3600
    })) + '.signature'
    
    mockLocalStorage.getItem.mockReturnValue(vendedorToken)
    
    render(
      <MemoryRouter>
        <ProtectedRoute roles={['ADMIN', 'VENDEDOR']}>
          <ChildComponent />
        </ProtectedRoute>
      </MemoryRouter>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('debe manejar token inválido correctamente', () => {
    mockLocalStorage.getItem.mockReturnValue('token-invalido')
    
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <ChildComponent />
        </ProtectedRoute>
      </MemoryRouter>
    )

    expect(screen.getByTestId('navigate')).toHaveAttribute('data-to', '/login')
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token')
  })
})