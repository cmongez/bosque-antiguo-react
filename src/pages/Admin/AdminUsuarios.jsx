import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers, getRoles, updateUserRole, toggleUserStatus } from "../../api/users";

export const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingRole, setEditingRole] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [usuariosData, rolesData] = await Promise.all([
                    getAllUsers(),
                    getRoles()
                ]);
                setUsuarios(usuariosData);
                setRoles(rolesData);
            } catch (error) {
                console.error('Error al cargar datos:', error);
                // Fallback a datos estáticos si la API falla
                setUsuarios([
                    {
                        id: 1,
                        rut: "19011022-K",
                        nombre: "Juan Pérez",
                        email: "juan@gmail.com",
                        rol: { nombre: "CLIENTE" },
                        activo: true
                    },
                    {
                        id: 2,
                        rut: "17888999-3",
                        nombre: "Ana Torres",
                        email: "ana@duoc.cl",
                        rol: { nombre: "ADMIN" },
                        activo: true
                    }
                ]);
                setRoles([
                    { id: 1, nombre: "ADMIN" },
                    { id: 2, nombre: "VENDEDOR" },
                    { id: 3, nombre: "CLIENTE" }
                ]);
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    const handleRoleChange = async (userId, newRoleId) => {
        try {
            await updateUserRole(userId, newRoleId);
            // Recargar usuarios
            const usuariosData = await getAllUsers();
            setUsuarios(usuariosData);
            setEditingRole(null);
            alert('Rol actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar rol:', error);
            alert('Error al actualizar el rol');
        }
    };

    const handleToggleStatus = async (userId) => {
        try {
            await toggleUserStatus(userId);
            // Recargar usuarios
            const usuariosData = await getAllUsers();
            setUsuarios(usuariosData);
            alert('Estado del usuario actualizado correctamente');
        } catch (error) {
            console.error('Error al cambiar estado:', error);
            alert('Error al cambiar el estado del usuario');
        }
    };

    return (
        <div className="container-fluid py-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">
                    <i className="fa fa-users me-2"></i>Usuarios
                </h2>
                <Link to="/admin/nuevo-usuario" className="btn btn-success">
                    <i className="fa fa-plus me-2"></i>Nuevo Usuario
                </Link>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    {loading ? (
                        <div className="text-center py-4">
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-2 text-muted">Cargando usuarios...</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle">
                                <thead className="table-success">
                                    <tr>
                                        <th>ID</th>
                                        <th>RUT</th>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Rol</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((u) => (
                                        <tr key={u.id}>
                                            <td>#{u.id}</td>
                                            <td>{u.rut}</td>
                                            <td>{u.nombre}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                {editingRole === u.id ? (
                                                    <select 
                                                        className="form-select form-select-sm"
                                                        defaultValue={u.rol?.id}
                                                        onBlur={() => setEditingRole(null)}
                                                        onChange={(e) => handleRoleChange(u.id, parseInt(e.target.value))}
                                                    >
                                                        {roles.map(rol => (
                                                            <option key={rol.id} value={rol.id}>
                                                                {rol.nombre}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span 
                                                        className={`badge ${u.rol?.nombre === 'ADMIN' ? 'bg-danger' : u.rol?.nombre === 'VENDEDOR' ? 'bg-warning' : 'bg-info'}`}
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => setEditingRole(u.id)}
                                                        title="Click para editar rol"
                                                    >
                                                        {u.rol?.nombre || 'Sin rol'}
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                <span className={`badge ${u.activo ? 'bg-success' : 'bg-secondary'}`}>
                                                    {u.activo ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="btn-group" role="group">
                                                    <button 
                                                        onClick={() => handleToggleStatus(u.id)}
                                                        className={`btn btn-sm ${u.activo ? 'btn-outline-warning' : 'btn-outline-success'}`}
                                                        title={u.activo ? 'Desactivar usuario' : 'Activar usuario'}
                                                    >
                                                        {u.activo ? 'Desactivar' : 'Activar'}
                                                    </button>
                                                    <Link 
                                                        to={`/admin/usuarios/editar/${u.id}`}
                                                        className="btn btn-sm btn-outline-primary"
                                                        title="Editar usuario"
                                                    >
                                                        <i className="fa fa-edit"></i>
                                                    </Link>
                                                    <Link
                                                        to={`/admin/usuarios/${u.id}/historial`}
                                                        className="btn btn-sm btn-outline-secondary"
                                                        title="Ver historial"
                                                    >
                                                        <i className="fa fa-history"></i>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            {usuarios.length === 0 && (
                                <div className="text-center py-4 text-muted">
                                    No se han registrado usuarios.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
