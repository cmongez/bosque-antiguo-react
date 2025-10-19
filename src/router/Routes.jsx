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
import { CheckOut } from '../pages/CheckOut'
import { Categorias } from '../pages/Categoria'
import { CompraExitosa } from '../pages/CompraExitosa'
import { CompraFallida } from '../pages/CompraFallida'

export const RoutesComp = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
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
                </Routes>
            </BrowserRouter >
        </>
    )
}
