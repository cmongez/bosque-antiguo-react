import React from 'react'
import { Footer } from './Footer/Footer'
import { Navbar } from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { ModalBusqueda } from './ModalBusqueda'


export const Layout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <ModalBusqueda />
            <Footer />
        </div>
    )
}
