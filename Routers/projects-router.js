const express = require("express");

const Projects = require("../data/helpers/projectModel.js");
const Actions = require("../data/helpers/actionModel.js");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Project Router active");
  next();
});

router.post("/", (req, res) => {
  if (req.body.name && req.body.description) {
    const newProject = {
      name: req.body.name,
      description: req.body.description,
      completed: false,
    };
    Projects.insert(newProject)
      .then((newProj) => {
        res.status(200).json(newProject);
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: "Server Error" });
      });
  } else {
    res.status(404).json({ errorMessage: "Name or description is missing" });
  }
});

router.get("/", (req, res) => {
  Projects.get().then((project) => {
    res.status(200).json(project);
  });
});

router.get("/:id", validateId, (req, res) => {
  try {
    res.status(200).json(req.project);
  } catch {
    res.status(500).json({ errorMessage: "Server Error" });
  }
});

router.put("/:id", validateId, (req, res) => {
  if (req.body.name && req.body.description) {
    const newProject = {
      name: req.body.name,
      description: req.body.description,
    };

    Projects.update(req.id, newProject)
      .then((newProj) => {
        res.status(200).json(newProject);
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: "Server Error" });
      });
  } else {
    res.status(404).json({ errorMessage: "Name or description is missing" });
  }
});

router.delete("/:id", validateId, (req, res) => {
  Projects.remove(req.id)
    .then((newProj) => {
      res.status(200).json(req.project);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "Server Error" });
    });
});

function validateId(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      if (project) {
        req.project = project;
        req.id = id;
        next();
      } else {
        res
          .status(404)
          .json({ errorMessage: "Project is not exist for this ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "Server Error" });
    });
}

module.exports = router;
