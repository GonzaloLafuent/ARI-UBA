- Clase que viene: estudiar el modelo relacional, es la parte anterior a lo que vimos. la prte de hisotria, en que año surge, por que surge y por que. parte de las operaciones. joins, sleecicon, diltro, porducto cartersiano, etc. la hsitoria del modelo tmb

Modelo relacional, historia del mismo, proyección, selección, filtro, juntas parciales, totales, producto cartesiano, equivalencias, propiedades, que son, para que sirven, para que sirven los indices, para que recibe un map

EJEMPLO DE FNBC: un ejemplo que no cumple es sobre los lugares de comprar comida. Tengo una relacion con un nombre, por ejemplo pablo y tipo de lugar, que puede ser el tipo de negocio, y nombre de locl.
Puedo tener una fila que pablo, pizzeria, burgio.
otra fila que es pablo, healderia, daniel
valentigno, parrila, lo de charly 
ema, pizzerai, las cuartetas.
aca la calve es el nombre y el tipo de local. aca las claves candidatas sera {nombre y tipo de local}, no hay otra clave candidat
En estos casos el tipo de local depedende del nombre. en este casos tenemos que un atributo que es clave depende de un atributo que no es clave.
por lo tanto va a estar en 3FN, pero no es FNBC.
Toda base de datos se puede normalizar hasta la 3FN con garantias y seguridad, sin perder datos. Este ejemplo no se puede normalizar a FNBC, se puede pero perdes informacion.