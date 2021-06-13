// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const { logger } = require("../middleware.js");
const e = require("express");

const router = express.Router();

// - `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
// - `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
// - `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
// - `remove()`: the remove method accepts an `id` as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

//ENDPOINTS
// - [ ] `[GET] /api/projects`
router.get("/", logger, (req, res) => {
  Projects.get()
    .then((projects) => {
      if (projects) {
        //   - Returns an array of projects as the body of the response.
        res.status(200).json(projects);
      } else {
        //   - If there are no projects it responds with an empty array.
        res.json([]);
      }
    })
    .catch((err) => {
      console.log("error message from router.get projects router", { err });
      res.status(500).json({ message: "Error 500 from get request projects" });
    });
});

// - [ X ] `[GET] /api/projects/:id`
router.get("/:id", logger, (req, res) => {
  const { id } = req.params;

  Projects.get(id)
    .then((projectID) => {
      if (projectID) {
        //   - Returns a project with the given `id` as the body of the response.
        res.status(200).json(projectID);
      } else {
        //   - If there is no project with the given `id` it responds with a status code 404.
        res
          .status(404)
          .json({ message: "The project with the specific id does not exist" });
      }
    })
    .catch((err) => {
      console.log("error message from router.get/:id projects router", { err });
      res
        .status(500)
        .json({ message: "Error 500 from get :id request projects" });
    });
});

// - [ ] `[POST] /api/projects`
router.post("/", logger, (req, res) => {

  const newProject = req.body;

  if (!newProject || !newProject.name || !newProject.description) {
    //   - If the request body is missing any of the required fields it responds with a status code 400. 
    res
      .status(400)
      .json({ message: "Please provide name and description for the project" });
  } else {
    Projects.insert(newProject)
      .then((project) => {  
        //   - Returns the newly created project as the body of the response.
        res.status(200).json(project);
      })
      .catch((err) => {
        res.status(500).json({
          message:
            "There was an error while saving the project to the database",
          error: err.message,
        });
      });
  }
});

// - [ ] `[PUT] /api/projects/:id`
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!changes || !changes.name || !changes.description) {
    res.status(400).json({
      message: "Please provide name and description for the project",
    });
  } else {
    Projects.update(id, changes)
      .then((projectUpdate) => {
        if (projectUpdate) {
          //   - Returns the updated project as the body of the response.
          res.status(200).json(projectUpdate);
        } else {
          //   - If there is no project with the given `id` it responds with a status code 404.
          res.status(404).json({
            message: `Project with id of ${id} was not found`,
          });
        }
      })
      .catch((err) => {
        console.log("Error from put request project-router", { err });
        res.status(400).json({
          //   - If the request body is missing any of the required fields it responds with a status code 400.
          message: "Error updating project. Missing required fields",
        });
      });
  }
});

// - [ ] `[DELETE] /api/projects/:id`
//   - Returns no response body.
//   - If there is no project with the given `id` it responds with a status code 404.
// - [ ] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.

module.exports = router;
