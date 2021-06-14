// Write your "actions" router here!
const express = require("express");

const router = express.Router();
const Actions = require("./actions-model");
const { logger } = require("../middleware.js");
console.log("Actions model => ", Actions);

// - `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
// - `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
// - `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
// - `remove()`: the remove method accepts an `id` as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.





// - [ ] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.
router.get("/", logger, (req, res) => {
    Actions.get()
      .then((actions) => {
        if (actions) {
          //   - Returns an array of projects as the body of the response.
          res.status(200).json(actions);
        } else {
          //   - If there are no projects it responds with an empty array.
          res.json([]);
        }
      })
      .catch((err) => {
        console.log("error message from router.get actions router", { err });
        res.status(500).json({ message: "Error 500 from get request actions" });
      });
  });
// - [ ] `[GET] /api/actions/:id`
router.get("/:id", logger, (req, res) => {
    const { id } = req.params;
  
    Actions.get(id)
      .then((actionID) => {
        if (actionID) {
          //   - Returns a project with the given `id` as the body of the response.
          res.status(200).json(actionID);
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
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
// - [ ] `[POST] /api/actions`
router.post("/", logger, (req, res) => {
    const newAction = req.body;
  
    if (!newAction || !newAction.project_id || !newAction.description || !newAction.notes ) {
      //   - If the request body is missing any of the required fields it responds with a status code 400.
      res
        .status(400)
        .json({ message: "Please provide name and description for the project" });
    } else {
      Actions.insert(newAction)
        .then((action) => {
          //   - Returns the newly created project as the body of the response.
          res.status(200).json(action);
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
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
// - [ ] `[PUT] /api/actions/:id`
router.put("/:id", logger, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (!changes) {
      res.status(400).json({
        message: "Please provide name and description for the project",
      });
    } else {
      Actions.update(id, changes)
        .then((actionUpdate) => {
          if (actionUpdate) {
            //   - Returns the updated action as the body of the response.
            res.status(200).json(actionUpdate);
          } else {
            //   - If there is no action with the given `id` it responds with a status code 404.
            res.status(404).json({
              message: `action with id of ${id} was not found`,
            });
          }
        })
        .catch((err) => {
          console.log("Error from put request actions-router", { err });
          res.status(400).json({
            //   - If the request body is missing any of the required fields it responds with a status code 400.
            message: "Error updating actions. Missing required fields",
          });
        });
    }
  });
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
// - [ ] `[DELETE] /api/actions/:id`
router.delete("/:id", logger, (req, res) => {
    const id = req.params.id;
    console.log("id sanity checker", id);
  
    Actions.get(id)
      .then((response) => {
        console.log("returned response from delete action actions-router:  ", response); // response is project with given id
        if (response) {
          console.log("action going byebye ", response);
          Actions.remove(id)
            .then((deleteRes) => {
              console.log("Happy path to victory started on delete action: ", deleteRes);
              res
                .status(200)
                .json({ message: `Successful deletion of action with id ${id}` });
            })
            .catch((error) => {
              console.log("error", error);
              res.status(400).json({ message: `cannot delete project.` });
            });
        } else {
          res.status(404).json({ message: `Action of ${id} not found` });
        }
      })
      .catch((error) => {
        console.log("error", error);
        res
          .status(500)
          .json({
            message: `project cannot be deleted from server: ${error}`,
          });
      });
  });
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.





module.exports = router