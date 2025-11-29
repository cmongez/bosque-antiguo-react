import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAuth } from '../hooks/useAuth'

// Mock del localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  removeItem: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true
})

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe devolver estado no autenticado cuando no hay token', () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useAuth())
    
    expect(result.current).toEqual({
      isAuthenticated: false,
      user: null,
      roles: [],
      hasRole: expect.any(Function)
    })
    
    expect(result.current.hasRole('ADMIN')).toBe(false)
  })

  it('debe devolver información del usuario cuando hay token válido', () => {
    const validToken = 'header.' + btoa(JSON.stringify({
      userId: 1,
      sub: 'test@test.com',
      nombre: 'Juan',
      apellido: 'Pérez',
      roles: ['CLIENTE'],
      exp: Math.floor(Date.now() / 1000) + 3600
    })) + '.signature'
    
    mockLocalStorage.getItem.mockReturnValue(validToken)
    
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user).toEqual({
      id: 1,
      email: 'test@test.com',
      nombre: 'Juan',
      apellido: 'Pérez'
    })
    expect(result.current.roles).toEqual(['CLIENTE'])
    expect(result.current.hasRole('CLIENTE')).toBe(true)
    expect(result.current.hasRole('ADMIN')).toBe(false)
  })

  it('debe limpiar token cuando ha expirado', () => {
    const expiredToken = 'header.' + btoa(JSON.stringify({
      userId: 1,
      sub: 'test@test.com',
      roles: ['CLIENTE'],
      exp: Math.floor(Date.now() / 1000) - 3600 // expiró hace 1 hora
    })) + '.signature'
    
    mockLocalStorage.getItem.mockReturnValue(expiredToken)
    
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.isAuthenticated).toBe(false)
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token')
  })

  it('debe verificar roles correctamente (case insensitive)', () => {
    const adminToken = 'header.' + btoa(JSON.stringify({
      userId: 1,
      sub: 'admin@test.com',
      roles: ['ADMIN', 'VENDEDOR'],
      exp: Math.floor(Date.now() / 1000) + 3600
    })) + '.signature'
    
    mockLocalStorage.getItem.mockReturnValue(adminToken)
    
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.hasRole('admin')).toBe(true)
    expect(result.current.hasRole('ADMIN')).toBe(true)
    expect(result.current.hasRole('vendedor')).toBe(true)
    expect(result.current.hasRole('CLIENTE')).toBe(false)
  })

  it('debe manejar token malformado correctamente', () => {
    mockLocalStorage.getItem.mockReturnValue('token-malformado')
    
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.isAuthenticated).toBe(false)
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token')
  })

  it('debe manejar payload sin roles', () => {
    const tokenSinRoles = 'header.' + btoa(JSON.stringify({
      userId: 1,
      sub: 'test@test.com',
      exp: Math.floor(Date.now() / 1000) + 3600
    })) + '.signature'
    
    mockLocalStorage.getItem.mockReturnValue(tokenSinRoles)
    
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.roles).toEqual([])
    expect(result.current.hasRole('CLIENTE')).toBe(false)
  })
})