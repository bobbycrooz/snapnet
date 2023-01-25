import express, { NextFunction, Request, Response } from "express";
import LgaModel from "../models/lgaModel";

// insert 1 lgs
export const lgaInsertManyController = async (req: Request, res: Response) => {
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

export const allLga = async (req: Request, res: Response) => {
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
