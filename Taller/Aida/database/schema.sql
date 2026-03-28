-- Tabla de alumnos
CREATE TABLE alumnos (
    lu INTEGER PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    fecha_inscripcion DATE NOT NULL,
    estado VARCHAR(50) NOT NULL DEFAULT 'activo'
);

-- Tabla de materias
CREATE TABLE materias (
    codigo_materia VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    creditos INTEGER,
    horas INTEGER
);

-- Tabla de inscripciones (clave compuesta: lu + codigo_materia)
CREATE TABLE inscripciones (
    lu INTEGER NOT NULL,
    codigo_materia VARCHAR(20) NOT NULL,
    fecha_inscripcion DATE NOT NULL,
    calificacion NUMERIC(5,2),
    estado VARCHAR(50) NOT NULL DEFAULT 'inscripto',
    PRIMARY KEY (lu, codigo_materia),
    FOREIGN KEY (lu) REFERENCES alumnos(lu) ON DELETE CASCADE,
    FOREIGN KEY (codigo_materia) REFERENCES materias(codigo_materia) ON DELETE CASCADE
);

-- Índices para mejorar búsquedas
CREATE INDEX idx_alumnos_apellido ON alumnos(apellido);
CREATE INDEX idx_alumnos_estado ON alumnos(estado);
CREATE INDEX idx_inscripciones_estado ON inscripciones(estado);
