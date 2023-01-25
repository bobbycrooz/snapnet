import CitizensModel from "../models/citizensModel";
import express, { NextFunction, Request, Response } from "express";
// citizen controller

export const citizenController = async (req: Request, res: Response) => {
  const { fullname, gender, address, phone, wardId } = req.body;

  if (!fullname && !gender) return res.send(" name  is not provided").end();

  try {
    let newCitizen = {
      fullname: fullname,
      gender,
      address,
      phone,
      wardId,
    };
    let createOne = await CitizensModel.create(newCitizen);

    if (createOne) return res.send("citizen created").end();

    //  return res.send(allstates).end();
  } catch (error) {
    console.log(error);

    res.status(401).send({ error: error });
  }
};

export const allCitizens = async (req: Request, res: Response) => {
  // const { name } = req.body;

  // if (!name) return res.send(" name  provided").end();

  try {
    let allCitizens = await CitizensModel.find({}, "fullname gender _id");
    let counts = await CitizensModel.countDocuments();
    console.log(counts);

    return res.send(allCitizens).end();
  } catch (error) {
    console.log(error);

    res.status(401).send({ error: error });
  }
};

export const citizenDetails = async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id) return res.send(" no citizen id   provided").end();

  try {
    let allCitizens = await CitizensModel.find({ _id: id });

    let counts = await CitizensModel.countDocuments();
    console.log(counts);

    return res.send(allCitizens).end();
  } catch (error) {
    console.log(error);

    res.status(401).send({ error: error });
  }
};
