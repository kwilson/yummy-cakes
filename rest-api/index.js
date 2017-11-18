const restify = require("restify");
const cakeService = require("./services/cake-service");

function getAllCakes(req, res, next) {
  cakeService
    .getAll()
    .then(cakes => res.send(cakes))
    .then(() => next());
}

function getById(req, res, next) {
  cakeService
    .getById(req.params.id)
    .then(cake => res.send(cake))
    .then(() => next())
    .catch(err => {
      console.error(err);
      res.status(404);
      res.send(err);
      next();
    });
}

var server = restify.createServer();
server.get("/cakes", getAllCakes);
server.head("/cakes", getAllCakes);

server.get("/cakes/:id", getById);
server.head("/cakes/:id", getById);

process.on("unhandledRejection", error => {
  console.error("unhandledRejection", error.message);
});

server.listen(process.env.PORT || 8080, () => {
  console.log("%s listening at %s", server.name, server.url);
});
