import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/products";

export const AdminProductoNuevo = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagenUrl: "",
    categoriaId: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones simples
    if (!form.nombre || !form.precio || !form.categoriaId) {
      alert("Completa los campos obligatorios.");
      return;
    }

    const nuevoProducto = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: parseFloat(form.precio),
      imagenUrl: form.imagenUrl,
      categoria: {
        id: parseInt(form.categoriaId),
      },
    };

    try {
      // Aquí luego conectas al backend con axios
      console.log("Enviando producto:", nuevoProducto);

      // Ejemplo:
      // await api.post("/products", nuevoProducto);

      alert("Producto creado correctamente");
      navigate("/admin/productos");
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("Hubo un error al guardar el producto.");
    }
  };
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await getCategories();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categoria: ", error);
      } 
    };

    cargarCategorias();
  }, []);
  return (
    <div className="container py-3">
      <h2 className="mb-4">+ Nuevo producto</h2>

      <form className="card p-4" onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Ej: Suculenta Echeveria"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label className="form-label fw-bold">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            rows="3"
            placeholder="Descripción del producto"
            value={form.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Precio */}
        <div className="mb-3">
          <label className="form-label fw-bold">Precio</label>
          <input
            type="number"
            name="precio"
            className="form-control"
            placeholder="Ej: 2990"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>

        {/* Imagen URL */}
        <div className="mb-3">
          <label className="form-label fw-bold">URL de imagen</label>
          <input
            type="text"
            name="imagenUrl"
            className="form-control"
            placeholder="Ej: https://picsum.photos/200"
            value={form.imagenUrl}
            onChange={handleChange}
          />
        </div>

        {/* Categoría */}
        <div className="mb-3">
          <label className="form-label fw-bold">Categoría (ID)</label>
          <select
            type="number"
            name="categoriaId"
            className="form-control"
            placeholder="Ej: 1"
            value={form.categoriaId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((c)=>(
                <option key={c.id} value={c.id}>
                    {c.nombre}
                </option>
            )

            )}
          </select>
        </div>

        {/* Botones */}
        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-success" type="submit">
            Guardar
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
