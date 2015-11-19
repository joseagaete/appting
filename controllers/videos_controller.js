var models = require('../models/miModelo.js'); //traigo el //MiModelo de la carpeta models.

exports.index = function(req, res) {
  models.Videos.findAll().then(function(listado) {//la variable //videos contiene la tabla
    res.render('videos.ejs', { listado: listado}); //devuelve lo //obtenido con la linea anterior
  })
};

exports.index1 = function(req, res) {
  models.Videos.findAll().then(function(listado) {//la variable //videos contiene la tabla
    res.render('videos1.ejs', { listado: listado}); //devuelve lo //obtenido con la linea anterior
  })
};

exports.index2 = function(req, res) {
  models.Videos.findAll().then(function(listado) {//la variable //videos contiene la tabla
    res.render('videos2.ejs', { listado: listado}); //devuelve lo //obtenido con la linea anterior
  })
};



