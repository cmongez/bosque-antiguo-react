import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  updateProduct,
  getProductById,
} from "../../api/products";
import { useParams } from "react-router-dom";

export const AdminProductoEditar = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagenUrl: "",
    categoriaId: "",
    stock: "",
    stockCritico: "",
    disponible: true,
  });

  const { id } = useParams(); // ← aquí tienes el ID

  useEffect(() => {
    if (!id) return;

    const cargarProducto = async () => {
      try {
        const data = await getProductById(id);

        setForm({
          nombre: data.nombre ?? "",
          descripcion: data.descripcion ?? "",
          precio: data.precio ?? "",
          imagenUrl: data.imagenUrl ?? "",
          categoriaId: data.categoria?.id ?? "",
          stock: data.stock ?? "",
          stockCritico: data.stockCritico ?? "",
          disponible: data.disponible ?? true,
        });
      } catch (error) {
        console.error("Error al cargar producto por id:", error);
        alert("No se pudo cargar el producto");
      }
    };

    cargarProducto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Para inputs numéricos, asegurar que el valor se actualice correctamente
    let parsedValue = value;
    if (type === 'number') {
      parsedValue = value === '' ? '' : value;
    }
    
    
    setForm({
      ...form,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones simples
    if (!form.nombre || !form.precio || !form.categoriaId || !form.stock || !form.stockCritico) {
      alert("Completa los campos obligatorios (nombre, precio, categoría, stock y stock crítico).");
      return;
    }

    const productoEditado = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: parseFloat(form.precio),
      imagenUrl: form.imagenUrl,
      disponible: form.disponible,
      stock: parseInt(form.stock),
      stockCritico: parseInt(form.stockCritico),
      categoria: {
        id: parseInt(form.categoriaId),
      },
    };

    try {
      await updateProduct(id,productoEditado);

      alert("Producto actualizado correctamente");
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
      <h2 className="mb-4">+ Editar producto</h2>

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

        {/* Stock */}
        <div className="mb-3">
          <label className="form-label fw-bold">Stock</label>
          <input
            type="number"
            name="stock"
            className="form-control"
            placeholder="Ej: 10"
            value={form.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        {/* Stock Crítico */}
        <div className="mb-3">
          <label className="form-label fw-bold">Stock Crítico</label>
          <input
            type="number"
            name="stockCritico"
            className="form-control"
            placeholder="Ej: 5"
            value={form.stockCritico}
            onChange={handleChange}
            min="1"
            required
          />
          <div className="form-text">Cantidad mínima antes de mostrar alerta de stock bajo</div>
        </div>

        {/* Disponible */}
        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              name="disponible"
              className="form-check-input"
              id="disponible"
              checked={form.disponible}
              onChange={(e) => setForm({...form, disponible: e.target.checked})}
            />
            <label className="form-check-label fw-bold" htmlFor="disponible">
              Producto disponible para la venta
            </label>
          </div>
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
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Botones */}
        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-success" type="submit">
            Actualizar
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
