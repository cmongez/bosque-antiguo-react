import React from "react";
import imagen from './../assets/img/aire-puro.png'

export const ProductCard = ({ producto }) => {
  const {
    
    nombre,
    descripcion,
    precio,
    stock,
    stockCritico,
    categoria,
    codigo,
  } = producto;
  const imageUrl = new URL(producto.img, import.meta.url).href;
  return (
    <div className="col-md-4 col-lg-3">
      {" "}
      <div className="card h-100">
        <img src={imageUrl} className="card-img-top" alt={nombre} />
        <div className="card-body  d-flex flex-column justify-content-between">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text small">{descripcion}</p>
          <p className="mb-1">
            <strong>Precio:</strong> ${precio.toLocaleString("es-CL")}
          </p>
          <p
            className={`mb-1 ${
              stock <= stockCritico ? "text-danger" : "text-success"
            }`}
          >
            Stock: {stock}
            {stock <= stockCritico ? "(Ultimas unidades)" : ""}
          </p>
          <p className="text-muted mb-1">
            <strong>Categoría:</strong>
            {categoria}
          </p>
          <div className="d-flex justify-content-between">
            <a
              href="detalle.html?codigo=${p.codigo}"
              className="btn btn-outline-primary btn-sm"
            >
              Ver detalle
            </a>
            <button
              className="btn btn-success btn-sm"
              onclick="addToCart('${p.codigo}')"
            >
              Añadir <i className="fa fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
