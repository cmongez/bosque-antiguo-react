import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories,createProduct} from "../../api/products";


export const AdminProductoNuevo = () => {
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones simples
    if (!form.nombre || !form.precio || !form.categoriaId || !form.stock || !form.stockCritico) {
      alert("Completa los campos obligatorios (nombre, precio, categoría, stock y stock crítico).");
      return;
    }

    const nuevoProducto = {
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
      // Aquí luego conectas al backend con axios
      console.log("Enviando producto:", nuevoProducto);

      
      await createProduct(nuevoProducto);

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
          <label className="form-label fw-bold">Categoría</label>
          <select
            name="categoriaId"
            className="form-control"
            value={form.categoriaId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((c)=>(
                <option key={c.id} value={c.id}>
                    {c.nombre}
                </option>
            ))}
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
