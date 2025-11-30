/**
 * Hook personalizado para obtener información del usuario actual
 */
export const useAuth = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return { 
      isAuthenticated: false, 
      user: null, 
      roles: [],
      hasRole: () => false
    };
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    // Verificar expiración
    if (payload.exp && payload.exp < currentTime) {
      localStorage.removeItem('token');
      return { 
        isAuthenticated: false, 
        user: null, 
        roles: [],
        hasRole: () => false
      };
    }

    return {
      isAuthenticated: true,
      user: {
        id: payload.userId,
        email: payload.sub,
        nombre: payload.nombre,
        apellido: payload.apellido
      },
      roles: payload.roles || [],
      hasRole: (role) => {
        const userRoles = payload.roles || [];
        return userRoles.some(userRole => 
          userRole.toLowerCase() === role.toLowerCase()
        );
      }
    };

  } catch (error) {
    console.error('Error al decodificar token:', error);
    localStorage.removeItem('token');
    return { 
      isAuthenticated: false, 
      user: null, 
      roles: [],
      hasRole: () => false
    };
  }
};