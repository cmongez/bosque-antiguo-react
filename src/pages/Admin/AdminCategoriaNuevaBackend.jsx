import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../api/products";

export const AdminCategoriaNuevaBackend = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validaciones simples
    if (!form.nombre.trim()) {
      alert("El nombre de la categoría es obligatorio.");
      setLoading(false);
      return;
    }

    const nuevaCategoria = {
      nombre: form.nombre.trim(),
    };

    try {
      await createCategory(nuevaCategoria);
      
      alert("Categoría creada correctamente");
      navigate("/admin/categorias");
    } catch (error) {
      console.error("Error al crear categoría:", error);
      const mensaje = error.response?.data?.message || error.message || "Error desconocido";
      alert(`Error al crear la categoría: ${mensaje}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">
                <i className="fa fa-plus me-2"></i>
                Nueva Categoría
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Nombre */}
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Nombre de la Categoría
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Ej: Árboles de Navidad"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <div className="form-text">
                    Ingresa un nombre descriptivo para la nueva categoría
                  </div>
                </div>

                {/* Botones */}
                <div className="d-flex gap-2 mt-4">
                  <button 
                    className="btn btn-success" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Creando...
                      </>
                    ) : (
                      <>
                        <i className="fa fa-save me-2"></i>
                        Crear Categoría
                      </>
                    )}
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => navigate("/admin/categorias")}
                    disabled={loading}
                  >
                    <i className="fa fa-times me-2"></i>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoriaNuevaBackend;