import React, { useState } from 'react';

interface TablaMateriasProps {
  materias: any[];
  onEdit: (materia: any) => void;
  onDelete: (codigo: string) => void;
}

export const TablaMaterias: React.FC<TablaMateriasProps> = ({ materias, onEdit, onDelete }) => {
  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Créditos</th>
          <th>Horas</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {materias.map((materia) => (
          <tr key={materia.codigo_materia}>
            <td>{materia.codigo_materia}</td>
            <td>{materia.nombre}</td>
            <td>{materia.descripcion}</td>
            <td>{materia.creditos}</td>
            <td>{materia.horas}</td>
            <td>
              <button onClick={() => onEdit(materia)} className="btn-editar">Editar</button>
              <button onClick={() => onDelete(materia.codigo_materia)} className="btn-eliminar">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface FormularioMateriaProps {
  materia: any | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const FormularioMateria: React.FC<FormularioMateriaProps> = ({ materia, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    materia || { codigo_materia: '', nombre: '', descripcion: '', creditos: '', horas: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <label>Código Materia:</label>
        <input
          type="text"
          name="codigo_materia"
          value={formData.codigo_materia}
          onChange={handleChange}
          disabled={materia !== null}
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
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows={3}
        />
      </div>
      <div className="form-group">
        <label>Créditos:</label>
        <input
          type="number"
          name="creditos"
          value={formData.creditos}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Horas:</label>
        <input
          type="number"
          name="horas"
          value={formData.horas}
          onChange={handleChange}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-guardar">Guardar</button>
        <button type="button" onClick={onCancel} className="btn-cancelar">Cancelar</button>
      </div>
    </form>
  );
};
