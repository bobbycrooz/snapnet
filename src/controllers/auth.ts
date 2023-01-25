import CompanyModel from "../models/companyModel";
import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

// }

const secretKey = "snapnetdevsecretekey";

export const registerCompany = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(email);

  try {
    if (!email) return res.send(" comapany email   is not provided").end();

    let existingcompany = await CompanyModel.find({ email });

    console.log(existingcompany);

    if (existingcompany.length > 0)
      return res
        .status(403)
        .json({
          message: "company already exist",
        })
        .end();

    const companyKey = uuidv4();

    const key = jwt.sign(email, secretKey, {
      expiresIn: "24h",
    });

    let newCompany = {
      email,
      uuid: companyKey,
    };

    let createOneComapny = await CompanyModel.create(newCompany);

    if (createOneComapny)
      return res
        .json({
          message: "company created successfully",
          key: key,
          company: createOneComapny,
        })
        .end();

    //  return res.send(allstates).end();
  } catch (error) {
    console.log(error);

    res.status(401).json({ error: error });
  }
};

export const companyLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  if (!email) return res.send(" comapany email  is not provided").end();

  try {
    const key = jwt.sign(email, secretKey);
    let existingcompany = await CompanyModel.find({ email });

    if (existingcompany)
      return res
        .json({
          message: "log in successfully",
          key: key,
          company: existingcompany,
        })
        .end();

    //  return res.send(allstates).end();
  } catch (error) {
    console.log(error);

    res.status(401).send({ error: error });
  }
  next();
};

export const authorizeCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey: string | string[] = req.headers["X-API-KEY"];

  if (!apiKey)
    return res.status(403).send("Invalid Token, Please login to continue");

  const companyEmail = jwt.verify(String(apiKey), secretKey, (err, decode) => {
    if (err)
      return res.status(403).send("Invalid Token, Please login to continue");

    //   @ts-ignore
    return String(decode.email);
  });

  console.log("AUTHORIZE COMPANY", companyEmail);

  //   @ts-ignore
  req.userEmail = companyEmail;
  //  const companyKey = requestHeader.split(" ")[1];

  next();
};
