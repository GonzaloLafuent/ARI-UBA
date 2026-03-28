import React, { useState } from 'react';

interface TablaAlumnosProps {
  alumnos: any[];
  onEdit: (alumno: any) => void;
  onDelete: (lu: number) => void;
}

export const TablaAlumnos: React.FC<TablaAlumnosProps> = ({ alumnos, onEdit, onDelete }) => {
  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>LU</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Fecha Inscripción</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {alumnos.map((alumno) => (
          <tr key={alumno.lu}>
            <td>{alumno.lu}</td>
            <td>{alumno.nombre}</td>
            <td>{alumno.apellido}</td>
            <td>{alumno.email}</td>
            <td>{alumno.fecha_inscripcion}</td>
            <td>{alumno.estado}</td>
            <td>
              <button onClick={() => onEdit(alumno)} className="btn-editar">Editar</button>
              <button onClick={() => onDelete(alumno.lu)} className="btn-eliminar">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface FormularioAlumnoProps {
  alumno: any | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const FormularioAlumno: React.FC<FormularioAlumnoProps> = ({ alumno, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    alumno || { lu: '', nombre: '', apellido: '', email: '', fecha_inscripcion: '', estado: 'activo' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div className="form-group">
        <label>LU:</label>
        <input
          type="number"
          name="lu"
          value={formData.lu}
          onChange={handleChange}
          disabled={alumno !== null}
          required
        />
      </div>
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Fecha Inscripción:</label>
        <input
          type="date"
          name="fecha_inscripcion"
          value={formData.fecha_inscripcion}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Estado:</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        >
          <option value="activo">Activo</option>
          <option value="egresado">Egresado</option>
          <option value="interrumpido">Interrumpido</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-guardar">Guardar</button>
        <button type="button" onClick={onCancel} className="btn-cancelar">Cancelar</button>
      </div>
    </form>
  );
};
