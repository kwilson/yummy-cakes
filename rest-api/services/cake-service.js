const uuidv1 = require("uuid/v1");
const Cake = require("../models/Cake");

// In-memory collection for dev
const cakes = [];
const createNewCake = (name, imageUrl) => new Cake(uuidv1(), name);
cakes.push(createNewCake("Cake 1", ""));
cakes.push(createNewCake("Cake 1", ""));
cakes.push(createNewCake("Cake 1", ""));
cakes.push(createNewCake("Cake 1", ""));
cakes.push(createNewCake("Cake 1", ""));
cakes.push(createNewCake("Cake 1", ""));
cakes.push(createNewCake("Cake 1", ""));
cakes.push(createNewCake("Cake 1", ""));

function getAll() {
  return Promise.resolve(cakes);
}

function getById(id) {
  return new Promise((resolve, reject) => {
    const match = cakes.filter(x => x.id === id);
    if (match && match.length === 1) {
      return resolve(match[0]);
    }

    reject(`No cake with ID '${id}'`);
  });
}

module.exports = { getAll, getById };
