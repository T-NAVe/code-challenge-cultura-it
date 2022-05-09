# Cultura IT - Code Challenge

Bienvenidos!

Estamos buscando desarrolladores React para incorporar a nuestro equipo de trabajo. 
Con el fin de validar tus conocimientos, quién mejor que el código para comprobarlo. Por lo cual te proponemos que nos ayudes a resolver el siguiente problema; por favor tomate un tiempo para pensarlo y resolverlo.

## BLOG DE USUARIOS

Para un blog de usuarios se necesita desarrollar una aplicación que permita consultar las diferentes funcionalidades que ofrece el mismo desde cualquier dispositivo. La aplicación está orientada a captar futuros usuarios y futuros blogs personalizados.

Se requiere que la aplicación pueda: 
1. Consultar los usuarios del blog y sus respectivos datos.
2. Listar y filtrar los posts de los usuarios con los respectivos comentarios.
3. Listar y filtrar los álbumes de fotos de los usuarios y poder visualizarlas.
4. Listar y filtrar las tareas asignadas al usuario.
5. Generar un perfil de usuario en el cuál se puedan visualizar las tareas a completar, el último post creado, el último comentario realizado y la última foto cargada.

Para obtener los datos se deberá realizar las peticiones a la API desarrollada por JSONPlaceholder (https://jsonplaceholder.typicode.com/). No será necesario ningún formulario de carga de datos ni eliminación, se utilizarán los datos que se encuentran cargados por defecto.

###### NOTAS:
El frontend de la apliación se deberá desarrollar utilizando React.  
El backend se consumirá de https://jsonplaceholder.typicode.com/.  
Las rutas posibles para obtener datos llevan la siguiente estructura:
- GET	/posts -- https://jsonplaceholder.typicode.com/posts -- obtener todos los posts
- GET	/posts/1 -- https://jsonplaceholder.typicode.com/posts/1 -- obtener un post filtrando por id
- GET	/posts/1/comments -- https://jsonplaceholder.typicode.com/posts/1/comments  -- obtener los comentarios de un post filtrado por id

Como referencia, el modelo del backend es el siguiente:

No hay restricciones en cuanto a la disposición de los datos o las transiciones entre las diferentes pantallas, queda a criterio del desarrollador la mejor opción.
En la búsqueda de nuevos usuarios o blogs se busca que la aplicación haga hincapié en el uso de los estilos para hacerla atractiva a la vista general.

### Cómo presentar la solución
Cuando consideres que el problema está resuelto, debes subirlo a un repositorio de tu elección y enviarnos un mail a fsare@culturait.com.ar con el link del repositorio adjunto, además podes agregar cualquier comentario que creas correspondiente.


**Happy hacking!**