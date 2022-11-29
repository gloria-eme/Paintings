<h1 align="center"> API Galeria de arte </h1>

Una API sobre obras de arte, sus autores y museos donde se exponen.

:construction: Proyecto en construcción :construction:

## :hammer:Funcionalidades del proyecto

\## 📁 Acceso al proyecto

**Puedes clonar o hacer fork del repositorio: https://github.com/gloria-eme/Paintings**

\## 🛠️ Abre y ejecuta el proyecto

**1. Instalar las dependencias del package.json con el comando `npm i`**
**2. Ir a la carpeta server y arrancar el servidor con el comando `npm run dev`**

**1. Introducción al proyecto**

1. **Introducción al proyecto**

Hemos construído el **backend** de una API de una **Galería de Arte**. La lógica de nuestro backend se desarrolla a través de cuatro modelos, algunos de ellos relacionados entre sí. Estos modelos son:

- El **usuario**  que entra en nuestra página. Este `user` tendrá que pasar por un registro y un logueo a través del cuál se le otorgará un nivel de autorización para poder interaccionar con la página en menor o mayor grado. Más adelante explicaremos mejor este proceso.
- Las **obras de arte** que pueden consultarse, en este caso son cuadros (`paintings`), que conectan con su autor.
- Los **autores** (`authors`), que a la vez están conectados con sus cuadros.
- Los **museos** (`museums`) que están conectados con los cuadros que se exponen en cada uno de ellos. Cada usuario puede guardar en su perfil sus museos favoritos.
    
    
    Nuestro objetivo es crear un backend sólido, con modelos relacionados entre sí de una forma lógica y pensando en que la experiencia del usuario a través de la página (de un potencial frontend) pueda ser sencilla, visual e intuitiva.
    
    Teniendo en cuenta el tiempo del que disponíamos (una semana), nos marcamos unos objetivos base, como son la interrelación entre los modelos, la creación de rutas protegidas mediante un sistema de autorización, crear diferentes endpoints por cada modelo, o el uso de Cloudinary para subir, editar o eliminar imágenes de nuestros endpoints. Una vez definida la estructura base de nuestro proyecto, acordamos como meta poder implementar otras funcionalidades y recursos que ayudarán a tener un backend más sólido y por tanto un frontend más seguro, elaborado y atractivo. Dentro de estas metas estarían comprimir el proyecto, el uso de un social login, la paginación de los resultados, generar usuarios con diferentes roles, y testear nuestro backend con la ayuda de **Jest** y **Supertest**.
    

Otros recursos externos que hemos utilizado en el proyecto son:

- **Trello**: para la planificación y organización cooperativa del proyecto entre los tres compañeros
- **Mongo Atlas**: para guardar nuestra base de datos y visualizarla de una manera más sencilla.


\## Tecnologias utilizadas

- JavaScript
- NodeJs

\## Instalación de dependencias.

Para nuestro proyecto necesitaremos instalar varias dependencias, tanto generales como de desarrollo. Las agrupamos por aquí:

Dependencias generales:

- bcrypt: Es una librería de encriptación para proteger las contraseñas del usuario antes de almacenarla en nuestra base de datos. La instalamos escribiendo este comando en nuestra consola:
      	npm i bcrypt
- Cloudinary: Esta dependencia nos conecta de forma fácil y rápida nuestra aplicación con Cloudinary para tener las imágenes almacenadas:
      	npm i cloudinary
- Compression: Con esto podremos comprimir nuestro proyecto para hacerlo menos pesado:
      	npm I compression
- Cookie-parser: Esta dependencia es requerida para hacer nuestro social login:
       	npm I cookie-parser
- CORS: nos ayuda a regular si hay colaboración de un servidor ajeno a nuestra aplicación web:
      	Nom I cors
- dotenv: Es una librería que nos permite tener variables de configuración o de entorno.
  npm i dotenv --save
- Embedded JavaScript templates:
	npm i ejs
- Eslint: Se encarga de limpiar el código:
  npm i eslint
- Eslint-config-prettier: Desactiva todas las reglas que son innecesarias o que pueden entrar en conflicto con prettier.
  npm i eslint-config-prettier
- Express y express-session: Es una librería que nos ayuda a crear una Api Rest: Gestionar métodos propios de la librería:
  npm i express express-session
- Json web token: genera un token para el usuario
  npm i jsonwebtoken
- Mongoose: Es una librería que me permite interactuar y conectarme a Mongo DB. Y mongoose-paginate-v2 para la paginación
  npm i mongoose
  npm i mongoose-paginate-v2
- Multer y multer-storage-cloudinary: Middleware para el manejo de multipart/form-data, usado sobre todo para la subida de archivos
  npm i multer multer-storage-cloudinary
- Passport, passport-facebook, passport-google: Para el social login de nuestra aplicación:
  npm i passport passport-facebook passport-google-oauth2
- Prettier: Code formatter
  npm i prettier

Dependencias de desarrollo:

- Jest y superes: Para poder hacer test de nuestra aplicación
  npm i supertest jest -D
- Morgan: Librería que nos ayuda a ver las peticiones lanzadas.
  npm i morgan -D
- Nodemon: Librería que nos ayuda a transformar la data.
  npm i nodemon -D

Con esto tendríamos todas las dependencias con las que vamos a trabajar. Si revisamos nuestro package.json deberían estar todas instaladas.

Estructura de carpetas:

En este caso tenemos una carpeta general llamada server. Dentro de esta tendremos la carpeta de node_modules y haremos otra carpeta src donde estará todo nuestro proyecto. Dentro de esta haremos otras carpetas:
Api, donde haremos nuestros endpoints. 
Middlewares donde controlaremos el acceso del usuario. Dentro de middleware en nuestro caso tendremos 4 archivos js: admin.middlewares.js, basic.middleware.js, delete-file.js y file.js. Aqui controlaremos también la conexión con cloudinary para la gestión de archivos, en este caso imágenes de obras de arte.
También tendremos una carpeta de utils. En utils tenemos 3 carpetas más: Cloudinary, Database, y error. En cloudinary tenemos un archivo js con la lógica para conectar con cloudinary.
En database tenemos la función que nos conecta con la base de datos de Mongo.
En error la función que “settea” errores.
Nos generamos un archivo .env donde guardamos el Port de Mongo, la URI y las key para acceder a nuestro cluster

Por último, tenemos nuestro archivo índex donde colocamos las credenciales, métodos  y rutas principales. 


**Social login**

Para el social login hemos generado los headers y rutas en el archivo índex, en nuestro caso para google y Facebook.  En el archivo passportSetup.js creamos la  configuración para conectar con las api de Facebook y google y definimos también el callback necesario.

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
  )
);
```

En el archivo user.routes.js están las rutas para acceder al login de usuario por vía Facebook o google y las rutas de callback exigidas a las cuales van a redirigir después de hacer login. SI hacemos la petición al servidor nos devuelve código html para registrarnos o logarnos.

```jsx
UserRoutes.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
UserRoutes.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/fail',
  })
);
```


## Autores

Gloria: https://github.com/gloria-eme
Álvaro: https://github.com/alvaroLZ96
María: https://github.com/mariasosaluna
