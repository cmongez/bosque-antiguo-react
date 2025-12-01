import React from 'react'
import { Footer } from './Footer/Footer'
import { Navbar } from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { ModalBusqueda } from './ModalBusqueda'


export const Layout = () => {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Navbar />
            <main className='flex-grow-1'>
                <Outlet />
            </main>
            <ModalBusqueda />
            <Footer />
        </div>
    )
}
