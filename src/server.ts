import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import StateModel from "./models/stateModel";
import LgaModel from "./models/lgaModel";
import { databaseHelper } from "./util/databaseHelper";
import Ward from "./models/wardsModel";
import { allCitizens, citizenController } from "./controllers/citizens";
import { allWard, wardInsertManyController } from "./controllers/ward";

// import { filterImageFromURL, deleteLocalFiles } from "./util/util";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8080;

  console.log(process.env.NODE_ENV, "this is the env");

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // controller
  const stateController = async (req: Request, res: Response) => {
    // const { name } = req.body;

    // if (!name) return res.send(" name  provided").end();

    try {
      let allstates = await StateModel.find();
      let counts = await StateModel.countDocuments();
      console.log(counts);

      return res.send(allstates).end();
    } catch (error) {
      console.log(error);

      res.status(401).send({ error: error });
    }
  };

  // insert 1 lgs
  const lgaInsertManyController = async (req: Request, res: Response) => {
    // const { name } = req.body;
    const lgsArray = [
      {
        stateId: "63d10cc96d43deedf9f59d74",
        name: "Aba North",
      },
      {
        stateId: "63d10cd26d43deedf9f59d76",
        name: "eerinle",
      },
      {
        stateId: "63d10cdd6d43deedf9f59d78",
        name: "edejo",
      },
      {
        stateId: "63d10ce36d43deedf9f59d7a",
        name: "iragushin",
      },
      {
        stateId: "63d10ce96d43deedf9f59d7c",
        name: "poka",
      },
      {
        stateId: "63d10cf46d43deedf9f59d7e",
        name: "ojo",
      },
      {
        stateId: "63d10cf96d43deedf9f59d80",
        name: "eredo",
      },
      {
        stateId: "63d10d026d43deedf9f59d82",
        name: "Aba south",
      },
      {
        stateId: "63d10d086d43deedf9f59d84",
        name: "Aba west",
      },
      {
        stateId: "63d10d116d43deedf9f59d86",
        name: "epe",
      },
    ];

    // if (!name) return res.send(" name  provided").end();

    try {
      await LgaModel.insertMany(lgsArray);

      let counts = await LgaModel.countDocuments();
      console.log(counts);

      return res.send("state created").end();
    } catch (error) {
      console.log(error);

      res.status(401).json({ error });
    }
  };

  const allLga = async (req: Request, res: Response) => {
    // const { name } = req.body;

    // if (!name) return res.send(" name  provided").end();

    try {
      let allLga = await LgaModel.find();
      let counts = await LgaModel.countDocuments();
      console.log(counts);

      return res.send(allLga).end();
    } catch (error) {
      console.log(error);

      res.status(401).send({ error: error });
    }
  };

  // routes
  app.post("/create-state", stateController);

  app.post("/lga", lgaInsertManyController);
  app.get("/all-lga", allLga);

  app.post("/ward", wardInsertManyController);
  app.get("/all-ward", allWard);

  app.post("/create-citizen", citizenController);
  app.post("/all-citizen", allCitizens);

  // app.post("/admin", ImageFilterMiddleware, ImageController);
  // app.get("/filteredimage", ImageFilterMiddleware, ImageController);

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req: Request, res: Response) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  //connect to db
  await databaseHelper.connect();

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
