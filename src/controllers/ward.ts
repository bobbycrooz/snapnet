import express, { NextFunction, Request, Response } from "express";
import Ward from "../models/wardsModel";

export const wardInsertManyController = async (req: Request, res: Response) => {
  // const { name } = req.body;
  const wardArray = [
    {
      stateId: "63d110d6d814e4becbeddd96",
      name: "ward10",
    },
    {
      stateId: "63d110d6d814e4becbeddd97",
      name: "random",
    },
    {
      stateId: "63d110d6d814e4becbeddd98",
      name: "edrapejo",
    },
    {
      stateId: "63d110d6d814e4becbeddd99",
      name: "ward3",
    },
    {
      stateId: "63d110d6d814e4becbeddd9a",
      name: "ward4",
    },
    {
      stateId: "63d110d6d814e4becbeddd9b",
      name: "wawrd6",
    },
    {
      stateId: "63d110d6d814e4becbeddd9c",
      name: "ward5",
    },
    {
      stateId: "63d110d6d814e4becbeddd9d",
      name: "ward7",
    },
    {
      stateId: "63d110d6d814e4becbeddd9e",
      name: "ward 8",
    },
    {
      stateId: "63d110d6d814e4becbeddd9f",
      name: "ward9",
    },
  ];

  // if (!name) return res.send(" name  provided").end();

  try {
    await Ward.insertMany(wardArray);

    let counts = await Ward.countDocuments();
    console.log(counts);

    return res.send("state created").end();
  } catch (error) {
    console.log(error);

    res.status(401).json({ error });
  }
};

export const allWard = async (req: Request, res: Response) => {
  // const { name } = req.body;

  // if (!name) return res.send(" name  provided").end();

  try {
    let allWard = await Ward.find();
    let counts = await Ward.countDocuments();
    console.log(counts);

    return res.send(allWard).end();
  } catch (error) {
    console.log(error);

    res.status(401).send({ error: error });
  }
};
