import express, { NextFunction, Request, Response } from "express";
import StateModel from "../models/stateModel";

export const stateController = async (req: Request, res: Response) => {
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
