-- Datos de ejemplo para alumnos
INSERT INTO alumnos (lu, nombre, apellido, email, fecha_inscripcion, estado) VALUES
(10001, 'Juan', 'García', 'juan.garcia@uba.edu.ar', '2020-03-15', 'activo'),
(10002, 'María', 'López', 'maria.lopez@uba.edu.ar', '2021-03-10', 'activo'),
(10003, 'Carlos', 'Martínez', 'carlos.martinez@uba.edu.ar', '2019-03-20', 'egresado'),
(10004, 'Ana', 'Rodríguez', 'ana.rodriguez@uba.edu.ar', '2022-03-05', 'activo');

-- Datos de ejemplo para materias
INSERT INTO materias (codigo_materia, nombre, descripcion, creditos, horas) VALUES
('MAT101', 'Análisis Matemático I', 'Cálculo diferencial e integral', 8, 120),
('MAT102', 'Álgebra Lineal', 'Sistemas lineales y espacios vectoriales', 7, 105),
('CS101', 'Introducción a la Computación', 'Fundamentos de programación', 6, 90),
('CS102', 'Estructuras de Datos', 'Algoritmos y estructuras de datos', 8, 120),
('FIS101', 'Física I', 'Mecánica clásica', 8, 120);

-- Datos de ejemplo para inscripciones
INSERT INTO inscripciones (lu, codigo_materia, fecha_inscripcion, calificacion, estado) VALUES
(10001, 'MAT101', '2020-03-15', 8.5, 'aprobada'),
(10001, 'MAT102', '2020-09-10', 7.0, 'aprobada'),
(10001, 'CS101', '2021-03-15', 9.0, 'aprobada'),
(10002, 'MAT101', '2021-03-10', 8.0, 'aprobada'),
(10002, 'CS101', '2021-09-15', 7.5, 'aprobada'),
(10003, 'MAT101', '2019-03-20', 9.5, 'aprobada'),
(10003, 'MAT102', '2019-09-10', 8.5, 'aprobada'),
(10003, 'CS101', '2020-03-15', 9.0, 'aprobada'),
(10003, 'CS102', '2020-09-10', 8.5, 'aprobada'),
(10004, 'MAT101', '2022-03-05', NULL, 'inscripto'),
(10004, 'CS101', '2022-09-10', 8.0, 'aprobada');
