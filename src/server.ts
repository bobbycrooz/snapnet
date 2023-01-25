import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

import { databaseHelper } from "./util/databaseHelper";
import {
  allCitizens,
  citizenController,
  citizenDetails,
} from "./controllers/citizens";
import { allWard, wardInsertManyController } from "./controllers/ward";
import { allLga, lgaInsertManyController } from "./controllers/lgs";
import { stateController } from "./controllers/states";
import {
  authorizeCompany,
  companyLogin,
  registerCompany,
} from "./controllers/auth";

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
  // state
  app.get("/all-states", authorizeCompany, stateController);

  // lga

  app.post("/lga", lgaInsertManyController);
  app.get("/all-lga", authorizeCompany, allLga);

  // ward
  app.post("/ward", wardInsertManyController);
  app.get("/all-ward", authorizeCompany, allWard);

  // citizen
  app.post("/create-citizen", authorizeCompany, citizenController);
  app.get("/all-citizens", authorizeCompany, allCitizens);
  app.get("/citizen", authorizeCompany, citizenDetails);

  // auth
  app.post("/register-company", registerCompany);
  app.post("/login-company", companyLogin);

  app.get("/", async (req: Request, res: Response) => {
    res.send("try GET /all-cities");
  });

  //connect to db
  await databaseHelper.connect();

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
