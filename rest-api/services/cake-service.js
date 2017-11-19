const uuidv1 = require("uuid/v1");
const { random, find, sample } = require("lodash");
const Cake = require("../models/Cake");

// In-memory collection for dev
const comments = ["Awesome!", "Check this out.", "I like cake", "FIRST!"];
const createNewCake = (name, imageUrl) =>
  new Cake(
    uuidv1(),
    name,
    `/images/${imageUrl}`,
    random(1, 5),
    sample(comments)
  );

const cakes = [
  createNewCake("R2D2 Birthday Cake", "1.jpg"),
  createNewCake("Wedding Cake", "2.jpg"),
  createNewCake("Blue Cake", "3.jpg"),
  createNewCake("Nerf Cake", "4.jpg"),
  createNewCake("Cupcake Bouquet", "5.jpg"),
  createNewCake("Thank-you Cupcakes", "6.jpg"),
  createNewCake("Ferrero Rocher Cupcakes", "7.jpg")
];

function getAll() {
  return Promise.resolve(cakes);
}

function getById(id) {
  return new Promise((resolve, reject) => {
    const match = find(cakes, x => x.id === id);
    if (match) {
      return resolve(match);
    }

    reject(`No cake with ID '${id}'`);
  });
}

module.exports = { getAll, getById };
