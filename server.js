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

Storage.prototype.delete = function(name) {
    var item = {name: name, id: this.id};
    this.items.delete(item);
    this.id -= 1;
};

Storage.prototype.update = function(name, id) {
  this.items.forEach(function(item) {
    if (item.id == id) {
      item.name = name;
    }
  });
};

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
    if (req.params.id == (undefined || null)) {
      return res.sendStatus(400);
    } else {
      for (vari=0; i<storage.items.length; i++) {
        if (storage.items[i].id == req.params.id) {
          storage.items.splice(i, 1);
        }
      }
      res.send(200);
    }
});

app.listen(process.env.PORT || 8080);
