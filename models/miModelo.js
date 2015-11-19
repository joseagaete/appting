 //Se requiere la variable de entorno path
var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite con new Sequelize(database, [username=null], [password=null], [options={}])
// (Aquí es donde se conecta la BD: video.sqlite)
/*var sequelize = new Sequelize(null, null, null,
                       {dialect: "sqlite", storage: "video.sqlite"}
                    );
*/
// Usar BBDD SQLite o Postgres con new Sequelize(database, [username=null], [password=null], [options={}])
// (Aquí es donde se conecta la BD: video.sqlite)
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }
);

// Importar la definicion de la tabla Videos en videos.js 
//donde estructura de la base de datos
var Videos = sequelize.import(path.join(__dirname,'videos'));

exports.Videos = Videos; // exportar definición de tabla Videos



// sequelize.sync([options={}]) crea e inicializa tabla de preguntas en DB
sequelize.sync()
  .success(function() {
        // success(..) ejecuta el manejador una vez creada la tabla
        Videos.count()
          .success(function (count){
              //if(count === 0) {   // la tabla se inicializa //solo si está vacía
                Videos.bulkCreate(
                        [
                          {etiquetaVideo: 'Taylor Swift - Shake It Off',   direccionVideo: 'https://youtu.be/nfWlot6h_JM?list=PL2NnS82s_tdU-oqbHD7PUUduA8MsL8TiD', duracion:'3 min', top: '1'},
                          { etiquetaVideo: 'Meghan Trainor - All About That Bass',   direccionVideo: 'https://youtu.be/7PCkvCPvDXk?list=PL2NnS82s_tdU-oqbHD7PUUduA8MsL8TiD', duracion: '3 min', top: '2'}
                        ]
                )

                  .success(function(){console.log('Tabla videos inicializada')});
              

//}; // if count
          }
        ); // success (function (count)...)
      }
  ); // success (function...)


