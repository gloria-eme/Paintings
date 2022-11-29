🚧 Proyecto en construcción 🚧

## 🔨Funcionalidades del proyecto

 📁 Acceso al proyecto

**Puedes clonar o hacer fork del repositorio: [https://github.com/gloria-eme/Paintings](https://github.com/gloria-eme/Paintings)**

🛠️ Abre y ejecuta el proyecto

**1. Instalar las dependencias del package.json con el comando `npm i`** **2. Ir a la carpeta server y arrancar el servidor con el comando `npm run dev`**

## **Introducción al proyecto**

Hemos construido el **backend** de una API de una **Galería de Arte**. La lógica de nuestro backend se desarrolla a través de cuatro modelos, algunos de ellos relacionados entre sí. Estos modelos son:

- El **usuario** que entra en nuestra página. Este `user` podrá registrarse y hacer login, de esta forma se le otorgará un rol para poder interaccionar con la página en menor o mayor grado. Más adelante explicaremos mejor este proceso.
- Las **obras de arte** que pueden consultarse, en este caso son cuadros (`paintings`), que conectan con su autor.
- Los **autores** (`authors`), que a la vez están conectados con los distintos cuadros de estos.
- Los **museos** (`museums`), que como es lógico están conectados con los cuadros que se exponen en cada uno de ellos.  Es interesante mencionar también como cada usuario puede guardar en su perfil sus museos favoritos.
    
    ### Objetivos
    

Hemos querido construir un backend con modelos relacionados entre sí pensando en que la experiencia del usuario a través de la página (de un potencial frontend) pueda ser sencilla, visual e intuitiva. De igual modo, hemos buscado otorgar al usuario una navegación segura mediante un sistema de autenticación en la navegación interna.

Por otro lado, y buscando esa mejor gestión de los recursos en nuestra base de datos hemos querido trabajar con:

- Una herramienta de gestión externa en la nube de las imágenes de los cuadros.
- Una herramienta para la compresión de nuestro proyecto.
- Paginación de los endpoints.
- Test unitarios.

En cuanto al apartado organizativo hemos querido realizar una aproximación a las metodologías agiles de trabajo asentadas y nos hemos servido de herramientas como **Trello** para la planificación y organización cooperativa.

- **Mongo Atlas**: para guardar nuestra base de datos y visualizarla de una manera más sencilla.

## Tecnologías utilizadas

En este proyecto el esqueleto del mismo lo conforma **Node.js** que como entorno de servidor nos permite trabajar con **JavaScript**, el lenguaje utilizado.

### Instalación de dependencias

Para nuestro proyecto necesitaremos instalar varias dependencias, tanto generales como de desarrollo. Las agrupamos así:

-Dependencias generales:

- **Bcrypt**: Es una librería de encriptación para proteger las contraseñas del usuario antes de almacenarla en nuestra base de datos. La instalamos escribiendo este comando en nuestra consola: `npm i bcrypt`
- **Cloudinary**: Esta dependencia nos conecta de forma fácil y rápida nuestra aplicación con Cloudinary para tener las imágenes almacenadas: `npm i cloudinary`
- **Compression**: Con esto podremos comprimir nuestro proyecto para hacerlo menos pesado: `npm i compression`
- **Cookie-parser**: Esta dependencia es requerida para hacer nuestro social login: `npm i cookie-parser`
- **CORS**: es un mecanismo que utiliza cabeceras HTTP adicionales para permitir que un usuario
 obtenga permiso para acceder a recursos seleccionados desde un servidor, en un origen distinto (dominio) al que pertenece: `npm i cors`
- **Dotenv**: Es una librería que nos permite tener variables de configuración o de entorno. `npm i dotenv --save`
- **Embedded JavaScript templates**: `npm i ejs`
- **Eslint**: Se encarga de limpiar el código: `npm i eslint`
- **Eslint-config-prettier**: Desactiva todas las reglas que son innecesarias o que pueden entrar en conflicto con Prettier. `npm i eslint-config-prettier`
- **Express y express-session**: La primera es una librería que nos ayuda a crear una Api Rest y la segunda gestiona métodos propios para el inicio de sesión `npm i express express-session`
- **Json web token**: genera un token para el usuario `npm i jsonwebtoken`
- **Mongoose**: Es una librería que me permite interactuar y conectarme a Mongo DB.
- **Mongoose-paginate-v2** para la paginación `npm i mongoose npm i mongoose-paginate-v2`
- **Multer y multer-storage-cloudinary**: Middleware para el manejo de multipart/form-data, usado sobre todo para la subida de archivos `npm i multer multer-storage-cloudinary`
- **Passport, passport-facebook, passport-google**: es un middleware de autenticación para el social login de nuestra aplicación: `npm i passport passport-facebook passport-google-oauth2`
- **Prettier**: es nuestro formateador de código `npm i prettier`
- **Axios**: Librería vinculada a los test unitarios `npm i axios`

-Dependencias de desarrollo:

- **Jest**: Librería para poder hacer testeo de nuestra aplicación `npm i jest -D`
- **Morgan**: Librería que nos ayuda a ver las peticiones lanzadas `npm i morgan -D`
- **Nodemon**: Librería que nos ayuda a transformar la data`npm i nodemon -D`

Con esto tendríamos todas las dependencias con las que vamos a trabajar. Si revisamos nuestro package.json deberían estar todas instaladas.

### Estructura de carpetas

📂 Server

    📂 node_modules

    📂 src

        📂 api

            📁 authors

                📋 controller.js

                📋 model.js

                📋 routes.js

            📁 museum

                📋 controller.js

                📋 model.js

                📋 routes.js

            📁 paintings

                📁 test

                    📋 test.js

                📋 routes.js

                📋 controller.js

                📋 model.js

                📋 routes.js

            📁 user

                📋 config.js

                📋 controller.js

                📋 model.js

                📋 routes.js

                📋 passportSetup.js

            📁 middlewares

                📋 admin.middlewares.js

                📋 basic-middlewares.js

                📋 delete-file.js

                📋 file.js

            📁 utils

                📁 cloudinary

                    📋 cloudinary.js

                📁 database

                    📋 connect.js

                📁 error

                    📋 handle.error.js

   	 📋 index.js

    📋 .env

En este caso tenemos una carpeta general llamada server que albergará todas las demás

—>En src donde estará todo nuestro proyecto. 

—>En Api tendremos nuestros endpoints. 

—>Middlewares donde controlaremos el acceso del usuario. En este caso incluiremos los archivos relacionados con Cloudinary y con el acceso de usuario en función del rol.

—>En utils tenemos 3 carpetas más: Cloudinary, Database, y error. En cloudinary tenemos un archivo js con la lógica para conectar con cloudinary. En database tenemos la función que nos conecta con la base de datos de Mongo. En error la función que “setear” errores. 

—>Generamos un archivo .env donde guardamos el Port de Mongo, la URI y las key para acceder a nuestro cluster.

—>Por último, tenemos nuestro archivo índex donde colocamos las credenciales, métodos y rutas principales de nuestra aplicación.

## Cuerpo del proyecto

### **Conexión con la base de datos**

Para la generación y conexión con nuestra base de datos nos hemos apoyado en Mongo Atlas, un servicio en la nube para bases de datos desarrollado por el equipo de *mongoDB*, el cual nos ayuda con aspectos como el hosting, instalación y actualización de nuestra base de datos.

Para ello, hemos creado un nuevo proyecto en nuestro Cluster de Atlas, llamado Paintings, el cual nos genera un *driver* que añadimos a nuestro código en el archivo .env, en el cual vamos a alojar todas la variables de entorno o de configuración (que se gestiona a través de dotenv). Nos conectamos a MongoDB en el fichero utils/database/connect.js, y luego lo importamos en el index.js.

```jsx
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const { setError } = require('../error/handle.error');
const mongoDB = process.env.MONGO_URI;

const connect = async () => {
  try {
    const db = await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { name, host } = db.connection;
    console.log(`Conectado a la base de datos : ${name} en el host: ${host}`);
  } catch (error) {
    console.error(setError(550, 'Not connect to DB'));
  }
};
module.exports = { connect };
```

### Modelos, controladores y rutas

Siguiendo la estructura marcada por Mongoose, hemos creado tres modelos temáticos y uno de users donde definimos el cuerpo de dichos objetos a crear posteriormente. 

Es en los ficheros controllers donde incluimos la lógica funcional que nos permitirá hacer las requests en base a la función y los parámetros que queramos incluir. 

Por último, nos servimos de un archivo también independiente donde exportaremos las rutas correspondientes a cada controlador, que finalmente serán de nuevo exportadas a nuestro index.

### **GET/POST/PATCH/DELETE**

- **GET**

Al tener las colecciones de nuestros endpoints relacionadas entre sí hemos usado: 

- `populate()` : un método de Mongoose que extrae la información detallada de las colecciones hijas que se relacionan con una colección padre. Eso lo hace obteniendo la información de estas entidades a través del atributo id.
- `paginate()`: paginaremos mediante una dependencia extra de mongoose para organizar los datos según las páginas e ítems que queramos mostrar en cada página de nuestro endpoint.

Además, en el modelo Painting hemos creado un GET para poder buscar a partir del año de las painting, de tal manera que añadiendo en la ruta url un determinado año, te devuelve como resultado las paintings que se hayan pintado a partir de ese año. En el modelo Museum hay un GET para poder buscarlos por ciudad, y al igual que en el anterior, los resultados se obtienen añadiendo en la ruta url la ciudad en la que quieras buscar los museums.

- **POST**

Creamos una función POST en la que podemos incluir nuevos items dentro de los diferentes endpoint en base a nuestro modelo ya creado y a través de la propiedad *body* enviamos estos datos a nuestros endpoints. Esta función la exportamos al fichero routes, donde indicamos qué queremos hacer (un POST) y qué ruta vamos a utilizar para ello. De esta manera, si hacemos una petición en ThunderClient y añadimos la información, se enviará a la base de datos.

En el modelo Paintings hemos añadido a esta función un apartado para subir al Cloudinary la imagen que añadamos a cada painting, y un segundo apartado a través del cual, cada vez que añadimos el id del author, automáticamente en dicho author se añada también el id de dicha painting.

```
try {
    const { authorId } = req.body;
    const author = await Author.findById(authorId);
    const paintingObject = { ...req.body };
    
    if (author) {
      paintingObject.author = author._id;
    }
    const newPainting = new Painting(paintingObject);
    
    if (req.file) {
      newPainting.image = req.file.path;
    }
    const newPaintingInDB = await newPainting.save();
    
    if (author) {
      author.paintings = author.paintings.concat(newPaintingInDB._id);
      await author.save();
    }
```

- **PATCH Y DELETE**: Para editar tenemos el método `findByIdAndUpdate()` usando el id como param. Hacemos igual en la función para eliminar un elemento, en este caso con el método `findByIdAndDelete(id)`. En ambas funciones implementamos `catch` de los errores.

### **Social login**

Para el social login hemos generado los headers y rutas en el archivo índex, en nuestro caso para Google y Facebook.  En el archivo passportSetup.js creamos la  configuración para conectar con las api de Facebook y google y definimos también el callback necesario.

```jsx
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.id,
      clientSecret: config.google.secret,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
 ));
```

En el archivo user.routes.js están las rutas para acceder al login de usuario por vía Facebook o Google y las rutas de callback exigidas a las cuales van a redirigir después de hacer login. Si hacemos la petición al servidor nos devuelve código html para registrarnos o logearnos.

```
UserRoutes.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] })
);
UserRoutes.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/fail',
  })
);
```

### Autenticación

En el apartado de Autenticación hemos optado por incluir en el modelo de User una key llamada `role` mediante la cual por defecto el usuario es registrado como `basic` salvo que se especifique como `admin`. En este último caso sí cuenta con el status de `admin`, dicho user podrá tener mayores credenciales en relación a los distintos modelos y las opciones de navegación y edición interna dentro de nuestra web.

¿Como hacemos esto? Pues es sencillo: Hemos creado dos middlewares distintos. En ambos nos hemos servido de la librería JWT que nos permite generar un token único asociado al usuario cuando navega en nuestra página. 

Para ello, lo primero que vamos a hacer es en el controlador de usuario incluir dentro del propio token ese rol que luego en el middleware de admin volveremos a llamar.

```jsx
const token = jwt.sign(
  {
    id: userInfo._id,
    username: userInfo.username,
    **role: userInfo.role,**
  },
	  req.app.get('secretKey'),
  { expiresIn: '3h' }
);
```

Y en el middleware de admin necesitamos dar autorización en base a JWT de la siguiente forma mediante una condición :

```jsx
const authority = {
    id: token.id,
    name: token.name,
    role: token.role,
  };

  if (token.role === 'admin') {
    req.authority = authority;
    next();
  } else {
    next(setError(401, 'Not authorized'));
  }
```

### Testing

Igualmente hemos querido incluir un apartado de Testing a modo de muestra en el endpoint de “Paintings”. En este caso se trata de un mock simple que se vale de la librería **Axios** para la realización de las peticiones, así como de Jest para la realización de los tests. En este caso, es importante destacar el uso de:

- `**jest.mock()**` con el cual Jest consigue mockear el módulo incluido dentro del paréntesis. Este método nos permite devolver funciones cuyo resultado retornado va a ser undefined.
- `**.mockResolvedValue(<mocked response>)`** .Este método nos permite  insertar los valores mockeados de retorno que queremos incluir.
## Autores

Gloria: https://github.com/gloria-eme
Álvaro: https://github.com/alvaroLZ96
María: https://github.com/mariasosaluna
