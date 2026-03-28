To Do:
- Investigar que es una REST API
- Como se estructura un sistema separado en Backend Y FrontEnd
- ver los 12 factores

Vamos a construir el sistema AIDA. Emita la secretaria del DC. Posee alumnos materias y docente y nos permite ver que materias aprobo y cuales no y a partir de eso si se recibio o no

**PROMPT:** stack es Typecirp, node vanilla para el front y postregs para la base. la descripcion esta en el repo. Empeza poe l cred de lamunas de la maeris e isncirpciones. noquermsoq ue los alunos se idnetifequen con id autonumero. 
la ui tien equ emostrar una grilla con un ui para cada tabla, con un botn para borra. yeditar en cad renglon. 
tmb debe haver un buton para agrear un formulario nuevo, 
sin eguirdad n ususario por ahora. 
quiero los arhciovs sql para gera las tablas en la base y en el mimso repo el front end y bakend. 

- No es correcto poner el mail de una persona como unico, viola la privacidad de la persona.
- Dentro de la base el usuario postgress es el adamin de la misma, por lo tanto no se usa para todo. sino si alguien accede nos rompe todo. el sistema no accede como usuario postgress. cada vez que creo una base de base necesito 2 usuarios, uno va a ser el dueño de la base y otro va a ser el cual el bakend va a ausar para conectarse. Voy a crear un usuario en este casa para ser el owner de la base, solo de la bse no de todo el servidor. para hacer andar el sistema, es decir cargas almunas, obtenerlos, no necesito poder crear la tabla de alumnas, solo deberia poder escribir, leer borra o actualizar, por eso necesita otro usuario. 
 
create user aida_26 nologin
create user aida26_user password 'contraseña'
create database aida_26_db owner aida_26 owner
grant connec to database aida_26_db to aida26_user

