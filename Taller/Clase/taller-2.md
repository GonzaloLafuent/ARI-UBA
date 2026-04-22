- Mirar el esquema de la base del nuevo proyecto aida26b. hay un concepto: minimo privilegio. cada usuario debe tener los minimos permisos para hacer su trabajo. Con usuario no solo hablamos de humanos.
En linux no pregunta la password para conectarse a la base. El usuraio postgress tiene conexion por trust si estan en el mismo host. de esta forma puedeo levantar una terminal.
Si quiero usar el pgadmin me pide una clave. 

- El usuario admin o postgress en este caso no lo queremos usar para todo, solo para crear la base cuando no la tenemos, el resto hascemos solo operaciones con otro usuario.

- tenemos dos usuarios de bases: uno que es el dueño de la misma que puede levantar tablas, cosntrains o romperlas. Ottro para le backedn, que solo tiene los permisos para escribir o leer, entre otros. 

- si quier cambiar algo deberia solo gregar el campo es un archivo, no en cada cosa. en nuestro primer caso si quiero agregar un campo de DNI, tengo que cambiarlo en 4  archivos por lo menos. De esta forma lo que buscamos es reducir eso.

- El lugar donde nuestro codigo genera codigo debe ser un lugar por cada tipo de codio. De esa forma reduza los luagres donde inyecto el codigo. Luego la estructa y los daots deben ir por un lado y por el otro. 
El codigo generico por el que no tiene datos va por un lado y el que tiene por el otro.

- cuando habla de armador se refiera a caad carpeta:
- en eset caso estamos buscando limitar la inyeccion de codigo por medio de como lo estamos construyendo. En este aso el ejemplo que mesta es agregar en la desriocion de una amterias el Algo a > b. Al hacer esto pormcomo esta el frontedn falla, debido a que lo lee mal por como esta cuando lo muestra el frontend.
Eso dsp impcaata en el borrado y eliminado de personas. Al generarse esata inyecion aus vez como no tengo one source of truth falla por toods lados. 
En ese caso lo qe muestar es qeue l delete no anda para alumnas por que el codiog de alumno tiene una barra entonces se parsea mal el sql al hacer la query.
Tranferir datos del bakend la front end y viceversa tiene su dificultades. 

- lo que busco evitar es escribir el campo un monton de veces
para definirlo dentro de app.ts  define una estrutura. donde define las tablas estudiante, amteria y enrollment y cada una de sus columnas. generao uan estcrtura que gebralize todo
todo lo que este al nivel de campo lo pongo al nivel de campo. todo lo saco en una mimsa estrctura, dsp el cambio solo tengo qe hacerlo ahi.




