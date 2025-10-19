import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Contacto } from '../pages/Contacto'
import { Home } from '../pages/Home'
import { Registro } from '../pages/Registro'
import { Blogs } from '../pages/Blogs'
import { Carrito } from '../pages/Carrito'
import { Detalle } from '../pages/Detalle'
import { Login } from '../pages/Login'
import { Nosotros } from '../pages/Nosotros'
import { Productos } from '../pages/Productos'
import { CheckOut } from '../pages/CheckOut'
import { Categorias } from '../pages/Categoria'


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
                        <Route path='/detalle' element={<Detalle />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/nosotros' element={<Nosotros />} />
                        <Route path='/productos' element={<Productos />} />
                        <Route path='/registro' element={<Registro />} />
                        <Route path='/checkout' element={<CheckOut />} />
                        <Route path='/Categoria' element={<Categorias/>} />

                    </Route>
                </Routes>

            </BrowserRouter >
        </>
    )
}
