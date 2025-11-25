import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Contacto } from '../pages/Contacto/Contacto'
import { Home } from '../pages/Home/Home'
import { Registro } from '../pages/Registro/Registro'
import { Blogs } from '../pages/Blogs/Blogs'
import { Carrito } from '../pages/Carrito'
import { DetalleProducto } from '../pages/DetalleProducto/DetalleProducto'
import { Login } from '../pages/Login/Login'
import { Nosotros } from '../pages/Nosotros/Nosotros'
import { Productos } from '../pages/Productos'
import { AdminProductos } from '../pages/Admin/AdminProductos'
import { CheckOut } from '../pages/CheckOut'
import { Categorias } from '../pages/Categoria'
import { CompraExitosa } from '../pages/CompraExitosa'
import { CompraFallida } from '../pages/CompraFallida'
import { AdminHome } from '../pages/Admin/AdminHome'
import { AdminLayout } from '../components/AdminLayout/AdminLayout'
import { AdminUsuarios } from '../pages/Admin/AdminUsuarios'
import { AdminNuevoUsuario } from '../pages/Admin/AdminNuevoUsuario'
import { AdminHistorialCompras } from '../pages/Admin/AdminHistorialCompras'
import { AdminOrdenes } from '../pages/Admin/AdminOrdenes'
import { AdminBoleta } from '../pages/Admin/AdminBoleta'
import { AdminProductosCriticos } from '../pages/Admin/AdminProductosCriticos'
import { AdminReportes } from '../pages/Admin/AdminReportes'
import { AdminPerfil } from '../pages/Admin/AdminPerfil'
import { AdminCategorias } from '../pages/admin/AdminCategorias';
import { AdminCategoriaNueva } from '../pages/admin/AdminCategoriaNueva';
import { AdminCategoriaEditar } from '../pages/admin/AdminCategoriaEditar';
import { Error404 } from '../pages/Error404'
import { AdminProductoNuevo } from '../pages/Admin/AdminProductoNuevo'
import { AdminProductoEditar } from '../pages/Admin/AdminProductoEditar'


export const RoutesComp = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path='*' element={<Error404/>}/>
                        <Route path='/' element={<Navigate to='/home' />} /> {/*Cada vez que se entra a la raíz redirige a Home*/}
                        <Route path='/home' element={<Home />} />
                        <Route path='/contacto' element={<Contacto />} />
                        <Route path='/blogs' element={<Blogs />} />
                        <Route path='/carrito' element={<Carrito />} />
                        <Route path='/detalle' element={<DetalleProducto />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/nosotros' element={<Nosotros />} />
                        <Route path='/productos' element={<Productos />} />
                        <Route path='/registro' element={<Registro />} />
                        <Route path='/checkout' element={<CheckOut />} />
                        <Route path='/categoria' element={<Categorias />} />
                        <Route path="/compra-exitosa/:orderId" element={<CompraExitosa />} />
                        <Route path="/compra-fallida/:orderId" element={<CompraFallida />} />

                    </Route>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminHome />} />
                        <Route path="usuarios" element={<AdminUsuarios />} />
                        <Route path="usuarios/nuevo" element={<AdminNuevoUsuario />} />
                        <Route path="usuarios/:id/historial" element={<AdminHistorialCompras />} />
                        <Route path="ordenes" element={<AdminOrdenes />} />
                        <Route path="ordenes/:id" element={<AdminBoleta />} />
                        <Route path="productos-criticos" element={<AdminProductosCriticos />} />
                        <Route path="productos" element={<AdminProductos />} />
                        <Route path="productos/nuevo" element={<AdminProductoNuevo />} />
                        <Route path="productos/editar/:id" element={<AdminProductoEditar />} />


                        <Route path="reportes" element={<AdminReportes />} />
                        <Route path="perfil" element={<AdminPerfil />} />
                        <Route path="categorias" element={<AdminCategorias />} />
                        <Route path="categorias/nueva" element={<AdminCategoriaNueva />} />
                        <Route path="categorias/editar/:id" element={<AdminCategoriaEditar />} />
                        <Route path="reportes" element={<AdminReportes />} />
                    </Route>

                </Routes>
            </BrowserRouter >
        </>
    )
}
