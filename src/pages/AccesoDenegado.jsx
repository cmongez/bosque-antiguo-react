import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AccesoDenegado = () => {
  const location = useLocation();
  const { user, roles } = useAuth();
  const { requiredRoles } = location.state || {};

  return (
    <main className="container my-5">
      <section className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <article className="text-center">
            <header className="mb-4">
              <i className="bi bi-exclamation-triangle-fill text-warning" 
                 style={{fontSize: '4rem'}}></i>
              <h1 className="mt-3 text-danger">Acceso Denegado</h1>
            </header>
            
            <div className="alert alert-warning" role="alert">
              <strong>No tienes permisos para acceder a esta página.</strong>
            </div>

            {user && (
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Información de tu cuenta</h5>
                  <p className="card-text">
                    <strong>Usuario:</strong> {user.nombre} {user.apellido}<br/>
                    <strong>Email:</strong> {user.email}<br/>
                    <strong>Tus roles:</strong> {
                      roles.length > 0 
                        ? roles.join(', ') 
                        : 'Sin roles asignados'
                    }
                  </p>
                  
                  {requiredRoles && (
                    <p className="card-text text-muted">
                      <strong>Roles requeridos:</strong> {requiredRoles.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link 
                to="/" 
                className="btn btn-primary"
                aria-label="Volver al inicio"
              >
                <i className="bi bi-house-fill me-2"></i>
                Ir al Inicio
              </Link>
              
              <button 
                onClick={() => window.history.back()} 
                className="btn btn-outline-secondary"
                aria-label="Volver a la página anterior"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Volver Atrás
              </button>
            </div>

            <footer className="mt-4">
              <p className="text-muted">
                Si crees que esto es un error, contacta con el administrador del sistema.
              </p>
            </footer>
          </article>
        </div>
      </section>
    </main>
  );
};

export default AccesoDenegado;