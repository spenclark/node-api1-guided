
const express = require("express");

const db = require("./data/hubs-model");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send({ api: "up and running" });
});

// list of hubs GET /hubs
server.get("/hubs", (req, res) => {
  //get list of hubs from db
  db.find()
    .then(hubs => res.status(200).json(hubs))
    .catch(err => {
      console.error("error on GET /hubs", err);
      res
        .status(500)
        .json({ errorMessage: "error getting list of hubs from database" });
    });
});

// add a hub
server.post("/hubs", (req, res) => {
  // get the data from the client
  const hubData = req.body;

  // call the db and add the hub
  db.add(hubData)
    .then(hub => res.status(201).json(hub))
    .catch(err => {
      console.error("error on POST /hubs", err);
      res.status(500).json({ errorMessage: "error adding the hub" });
    });
});

// remove a hub by it's id
server.delete("/hubs/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(removed => {
      if (removed) {
        res.status(200).json({ message: "hubs removed successfully", removed });
      } else {
        res.status(404).json({ message: "hub not found" });
      }
    })
    .catch(err => {
      console.error("error on DELETE /hubs/:id", err);
      res.status(500).json({ errorMessage: "error removing the hub" });
    });
});
// update a hub, passing the id and changes

const port = 4000;
server.listen(port, () =>
  console.log(`\n ** API running