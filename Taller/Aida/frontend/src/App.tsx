import React, { useState, useEffect } from 'react';
import { alumnosAPI, materiasAPI, inscripcionesAPI } from './api';
import { TablaAlumnos, FormularioAlumno } from './AlumnosComponent';
import { TablaMaterias, FormularioMateria } from './MateriasComponent';
import { TablaInscripciones, FormularioInscripcion } from './InscripcionesComponent';
import './styles.css';

type Tab = 'alumnos' | 'materias' | 'inscripciones';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<Tab>('alumnos');
  const [alumnos, setAlumnos] = useState<unknown[]>([]);
  const [materias, setMaterias] = useState<unknown[]>([]);
  const [inscripciones, setInscripciones] = useState<unknown[]>([]);
  const [editingAlumno, setEditingAlumno] = useState<unknown | null>(null);
  const [editingMateria, setEditingMateria] = useState<unknown | null>(null);
  const [editingInscripcion, setEditingInscripcion] = useState<unknown | null>(null);
  const [showFormAlumno, setShowFormAlumno] = useState(false);
  const [showFormMateria, setShowFormMateria] = useState(false);
  const [showFormInscripcion, setShowFormInscripcion] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos
  useEffect(() => {
    loadAlumnos();
    loadMaterias();
    loadInscripciones();
  }, []);

  const loadAlumnos = async () => {
    try {
      const response = await alumnosAPI.getAll();
      setAlumnos(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar alumnos');
      console.error(err);
    }
  };

  const loadMaterias = async () => {
    try {
      const response = await materiasAPI.getAll();
      setMaterias(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar materias');
      console.error(err);
    }
  };

  const loadInscripciones = async () => {
    try {
      const response = await inscripcionesAPI.getAll();
      setInscripciones(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar inscripciones');
      console.error(err);
    }
  };

  // Operaciones Alumnos
  const handleSaveAlumno = async (data: unknown) => {
    try {
      if (editingAlumno) {
        await alumnosAPI.update((editingAlumno as {lu: number}).lu, data);
      } else {
        await alumnosAPI.create(data);
      }
      setShowFormAlumno(false);
      setEditingAlumno(null);
      loadAlumnos();
      setError(null);
    } catch (err) {
      setError('Error al guardar alumno');
      console.error(err);
    }
  };

  const handleDeleteAlumno = async (lu: number) => {
    if (window.confirm('¿Está seguro?')) {
      try {
        await alumnosAPI.delete(lu);
        loadAlumnos();
        setError(null);
      } catch (err) {
        setError('Error al eliminar alumno');
        console.error(err);
      }
    }
  };

  // Operaciones Materias
  const handleSaveMateria = async (data: unknown) => {
    try {
      if (editingMateria) {
        await materiasAPI.update((editingMateria as {codigo_materia: string}).codigo_materia, data);
      } else {
        await materiasAPI.create(data);
      }
      setShowFormMateria(false);
      setEditingMateria(null);
      loadMaterias();
      setError(null);
    } catch (err) {
      setError('Error al guardar materia');
      console.error(err);
    }
  };

  const handleDeleteMateria = async (codigo: string) => {
    if (window.confirm('¿Está seguro?')) {
      try {
        await materiasAPI.delete(codigo);
        loadMaterias();
        setError(null);
      } catch (err) {
        setError('Error al eliminar materia');
        console.error(err);
      }
    }
  };

  // Operaciones Inscripciones
  const handleSaveInscripcion = async (data: unknown) => {
    try {
      const typedData = data as {lu: number; codigo_materia: string};
      if (editingInscripcion) {
        const typedEditing = editingInscripcion as {lu: number; codigo_materia: string};
        await inscripcionesAPI.update(typedEditing.lu, typedEditing.codigo_materia, data);
      } else {
        await inscripcionesAPI.create(data);
      }
      setShowFormInscripcion(false);
      setEditingInscripcion(null);
      loadInscripciones();
      setError(null);
    } catch (err) {
      setError('Error al guardar inscripción');
      console.error(err);
    }
  };

  const handleDeleteInscripcion = async (lu: number, codigo: string) => {
    if (window.confirm('¿Está seguro?')) {
      try {
        await inscripcionesAPI.delete(lu, codigo);
        loadInscripciones();
        setError(null);
      } catch (err) {
        setError('Error al eliminar inscripción');
        console.error(err);
      }
    }
  };

  return (
    <div className="container">
      <h1>Sistema de Gestión Académica - UBA</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="tabs">
        <button
          className={`tab-button ${currentTab === 'alumnos' ? 'active' : ''}`}
          onClick={() => setCurrentTab('alumnos')}
        >
          Alumnos
        </button>
        <button
          className={`tab-button ${currentTab === 'materias' ? 'active' : ''}`}
          onClick={() => setCurrentTab('materias')}
        >
          Materias
        </button>
        <button
          className={`tab-button ${currentTab === 'inscripciones' ? 'active' : ''}`}
          onClick={() => setCurrentTab('inscripciones')}
        >
          Inscripciones
        </button>
      </div>

      <div className="content">
        {currentTab === 'alumnos' && (
          <div>
            <button
              className="btn-nuevo"
              onClick={() => {
                setEditingAlumno(null);
                setShowFormAlumno(true);
              }}
            >
              + Nuevo Alumno
            </button>
            {showFormAlumno && (
              <FormularioAlumno
                alumno={editingAlumno}
                onSubmit={handleSaveAlumno}
                onCancel={() => {
                  setShowFormAlumno(false);
                  setEditingAlumno(null);
                }}
              />
            )}
            <TablaAlumnos
              alumnos={alumnos as any[]}
              onEdit={(alumno) => {
                setEditingAlumno(alumno);
                setShowFormAlumno(true);
              }}
              onDelete={handleDeleteAlumno}
            />
          </div>
        )}

        {currentTab === 'materias' && (
          <div>
            <button
              className="btn-nuevo"
              onClick={() => {
                setEditingMateria(null);
                setShowFormMateria(true);
              }}
            >
              + Nueva Materia
            </button>
            {showFormMateria && (
              <FormularioMateria
                materia={editingMateria}
                onSubmit={handleSaveMateria}
                onCancel={() => {
                  setShowFormMateria(false);
                  setEditingMateria(null);
                }}
              />
            )}
            <TablaMaterias
              materias={materias as any[]}
              onEdit={(materia) => {
                setEditingMateria(materia);
                setShowFormMateria(true);
              }}
              onDelete={handleDeleteMateria}
            />
          </div>
        )}

        {currentTab === 'inscripciones' && (
          <div>
            <button
              className="btn-nuevo"
              onClick={() => {
                setEditingInscripcion(null);
                setShowFormInscripcion(true);
              }}
            >
              + Nueva Inscripción
            </button>
            {showFormInscripcion && (
              <FormularioInscripcion
                inscripcion={editingInscripcion}
                onSubmit={handleSaveInscripcion}
                onCancel={() => {
                  setShowFormInscripcion(false);
                  setEditingInscripcion(null);
                }}
              />
            )}
            <TablaInscripciones
              inscripciones={inscripciones as any[]}
              onEdit={(inscripcion) => {
                setEditingInscripcion(inscripcion);
                setShowFormInscripcion(true);
              }}
              onDelete={handleDeleteInscripcion}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
