import React, { useState } from 'react';

interface TablaInscripcionesProps {
  inscripciones: any[];
  onEdit: (inscripcion: any) => void;
  onDelete: (lu: number, codigo: string) => void;
}

export const TablaInscripciones: React.FC<TablaInscripcionesProps> = ({ inscripciones, onEdit, onDelete }) => {
  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>LU</th>
          <th>Código Materia</th>
          <th>Fecha Inscripción</th>
          <th>Calificación</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {inscripciones.map((inscripcion) => (
          <tr key={`${inscripcion.lu}-${inscripcion.codigo_materia}`}>
            <td>{inscripcion.lu}</td>
            <td>{inscripcion.codigo_materia}</td>
            <td>{inscripcion.fecha_inscripcion}</td>
            <td>{inscripcion.calificacion || '-'}</td>
            <td>{inscripcion.estado}</td>
            <td>
              <button onClick={() => onEdit(inscripcion)} className="btn-editar">Editar</button>
              <button onClick={() => onDelete(inscripcion.lu, inscripcion.codigo_materia)} className="btn-eliminar">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface FormularioInscripcionProps {
  inscripcion: any | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const FormularioInscripcion: React.FC<FormularioInscripcionProps> = ({ inscripcion, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    inscripcion || { lu: '', codigo_materia: '', fecha_inscripcion: '', calificacion: '', estado: 'inscripto' }
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
          disabled={inscripcion !== null}
          required
        />
      </div>
      <div className="form-group">
        <label>Código Materia:</label>
        <input
          type="text"
          name="codigo_materia"
          value={formData.codigo_materia}
          onChange={handleChange}
          disabled={inscripcion !== null}
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
        <label>Calificación:</label>
        <input
          type="number"
          name="calificacion"
          value={formData.calificacion}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.1"
        />
      </div>
      <div className="form-group">
        <label>Estado:</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        >
          <option value="inscripto">Inscripto</option>
          <option value="aprobada">Aprobada</option>
          <option value="desaprobada">Desaprobada</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-guardar">Guardar</button>
        <button type="button" onClick={onCancel} className="btn-cancelar">Cancelar</button>
      </div>
    </form>
  );
};
