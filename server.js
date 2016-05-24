var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

/*Storage.prototype.delete = function(idToRemove) {
    var idToRemove = {name: name, id: this.id};
    this.items.splice();
    this.id -= 1;
};*/

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', function(req, res) {
    var idToRemove = parseInt(req.params.id);
    if (req.params.id == (undefined || null)) {
      return res.sendStatus(400);
    } else {
      for (var i=0; i<storage.items.length; i++) {
        if (storage.items[i].id == idToRemove) {
          storage.items.splice(i, 1)};
      }
      res.status(200).json({})
    };
});

app.put('/items/:id', jsonParser, function(req, res) {
    var idToPut = req.params.id;
    var item = storage.items[idToPut];

    for (var i=0; i<storage.items.length; i++){
      if (storage.items[i].id == idToPut){
        storage.items[i].name = req.body.name;
        break;
      }
    }
    res.status(200).json({});
});

app.listen(8080);

exports.app = app;
exports.storage = storage;
