import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Contacto } from '../pages/Contacto'
import { Home } from '../pages/Home'

export const RoutesComp = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                    <Route path='/' element={<Navigate to='/home' />} /> {/*Cada vez que se entra a la raíz redirige a Home*/ } 
                        <Route path='/home' element={<Home/>} />
                        <Route path='/contacto' element={<Contacto />} />

                    </Route>
                </Routes>

            </BrowserRouter >
        </>
    )
}
