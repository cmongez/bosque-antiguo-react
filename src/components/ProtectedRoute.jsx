import { Navigate, useLocation } from 'react-router-dom';

/**
 * Componente para proteger rutas basado en roles de usuario
 * @param {Object} props - Props del componente
 * @param {React.Component} props.children - Componente hijo a renderizar si tiene acceso
 * @param {string|Array<string>} props.roles - Rol(es) requerido(s) para acceder
 * @param {string} props.redirectTo - Ruta de redirección por defecto
 */
export const ProtectedRoute = ({ 
  children, 
  roles = [], 
  redirectTo = '/login' 
}) => {
  const location = useLocation();
  
  // Obtener token del localStorage
  const token = localStorage.getItem('token');
  
  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate 
      to={redirectTo} 
      state={{ from: location }} 
      replace 
    />;
  }

  try {
    // Decodificar el JWT para obtener los roles
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRoles = payload.roles || [];
    
    // Verificar si el token ha expirado
    const currentTime = Date.now() / 1000;
    if (payload.exp && payload.exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate 
        to={redirectTo} 
        state={{ from: location }} 
        replace 
      />;
    }

    // Si no se especifican roles, solo verificar autenticación
    if (!roles || roles.length === 0) {
      return children;
    }

    // Convertir roles a array si es string
    const requiredRoles = Array.isArray(roles) ? roles : [roles];
    
    // Verificar si el usuario tiene al menos uno de los roles requeridos
    const hasRequiredRole = requiredRoles.some(role => 
      userRoles.some(userRole => 
        userRole.toLowerCase() === role.toLowerCase()
      )
    );

    if (!hasRequiredRole) {
      // Redirigir a página de acceso denegado o home
      return <Navigate 
        to="/acceso-denegado" 
        state={{ from: location, requiredRoles }} 
        replace 
      />;
    }

    return children;

  } catch (error) {
    console.error('Error al verificar token:', error);
    localStorage.removeItem('token');
    return <Navigate 
      to={redirectTo} 
      state={{ from: location }} 
      replace 
    />;
  }
};

