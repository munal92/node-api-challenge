const express = require("express");
const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel.js");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Action Router active");
  next();
});

router.post("/ofproject/:pid", validateId, (req, res) => {
  if (req.body.description && req.body.notes) {
    if (req.body.notes.length < 128) {
      console.log(req.body.description.length);
      const newAction = {
        project_id: Number(req.pid),
        description: req.body.description,
        notes: req.body.notes,
      };
      Actions.insert(newAction)
        .then((nwAct) => {
          res.status(200).json(nwAct);
        })
        .catch((err) => {
          console.log("ActionsUpdate: ", err);
          res.status(500).json({ errorMessage: "Server Error" });
        });
    } else {
      res
        .status(404)
        .json({ errorMessage: "description more than 128 character" });
    }
  } else {
    res
      .status(404)
      .json({ errorMessage: "description and/or notes is missing" });
  }
});

router.get("/", (req, res) => {
  Actions.get()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "Server Error" });
    });
});

router.get("/:id", validateActId, (req, res) => {
  Actions.get(req.actionID)
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "Server Error" });
    });
});

router.put(
  "/update/:id/forProj/:pid",
  validateId,
  validateActId,
  (req, res) => {
    if (req.body.description && req.body.notes) {
      const newAction = {
        project_id: req.params.pid,
        description: req.body.description,
        notes: req.body.notes,
      };
      Actions.update(req.actionID, newAction)
        .then((nwAct) => {
          res.status(200).json(nwAct);
        })
        .catch((err) => {
          console.log("ActionsUpdate: ", err);
          res.status(500).json({ errorMessage: "Server Error" });
        });
    } else {
      res
        .status(404)
        .json({ errorMessage: "description and/or notes is missing" });
    }
  }
);

router.delete("/:id", validateActId, (req, res) => {
  Actions.remove(req.actionID)
    .then((item) => {
      res.status(200).json(req.action);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "Server Error" });
    });
});

function validateActId(req, res, next) {
  const { id } = req.params;
  Actions.get(id)
    .then((action) => {
      if (action) {
        req.action = action;
        req.actionID = id;
        next();
      } else {
        res
          .status(404)
          .json({ errorMessage: "Action is not exist for this ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "Server Error" });
    });
}

function validateId(req, res, next) {
  const { pid } = req.params;
  Projects.get(pid)
    .then((project) => {
      if (project) {
        req.project = project;
        req.pid = pid;
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
