import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import StateModel from "./models/stateModel";
import LgaModel from "./models/lgaModel";
import { databaseHelper } from "./util/databaseHelper";
import Ward from "./models/wardsModel";
import { allCitizens, citizenController } from "./controllers/citizens";
import { allWard, wardInsertManyController } from "./controllers/ward";
import { allLga, lgaInsertManyController } from "./controllers/lgs";
import { stateController } from "./controllers/states";
import {
  authorizeCompany,
  companyLogin,
  registerCompany,
} from "./controllers/auth";

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

  // routes
  app.get("/all-states", authorizeCompany, stateController);

  app.post("/lga", lgaInsertManyController);
  app.get("/all-lga", allLga);

  app.post("/ward", wardInsertManyController);
  app.get("/all-ward", allWard);

  app.post("/create-citizen", authorizeCompany, citizenController);
  app.get("/all-citizens", authorizeCompany, allCitizens);

  app.post("/register-company", registerCompany);
  app.post("/login-company", companyLogin);

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
