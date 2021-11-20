import express from "express";
import { Service } from "../models/service";
import { db } from "../app";
import _ from "lodash";

function instanceOfService(object: any): object is Service {
  return "path" in object;
}

export const getActiveServices = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const activeServices = db.data.filter((service) => service.active);
    res.send(activeServices);
  } catch (err) {
    next(err);
  }
};

export const addService = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    if (!req.body || !instanceOfService(req.body)) {
      res.status(422);
      throw new Error("Unprocessable Entity. Check your json data.");
    }

    if (db.data.filter((item) => item.path === req.body.path).length) {
      res.status(409);
      throw new Error("Conflict: a service with this path already exists.");
    }

    db.data.push(req.body);
    await db.write();
    res.send("Item successfully added");
  } catch (err) {
    next(err);
  }
};

export const removeService = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    if (!req.body || !instanceOfService(req.body)) {
      res.status(422);
      throw new Error(
        "Unprocessable Entity. Check your json data. Your entity must be structurally equal to the one you want deleted."
      );
    }

    if (!db.data.filter((item) => _.isEqual(item, req.body)).length) {
      res.status(404);
      throw new Error("Resource does not exist (or has already been deleted).");
    }

    db.data = db.data.filter((item) => !_.isEqual(item, req.body));
    await db.write();
    res.send("Item successfully removed.");
  } catch (err) {
    next(err);
  }
};

export const activateService = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    if (!req.body || !instanceOfService(req.body)) {
      res.status(422);
      throw new Error(
        "Unprocessable Entity. Check your json data. Your entity must be structurally equal to the one you want deleted."
      );
    }

    if (!db.data.filter((item) => item.path === req.body.path).length) {
      res.status(404);
      throw new Error(`Resource with path ${req.body.path} does not exist.`);
    }

    db.data = db.data.map((item) => {
      if (item.path === req.body.path) {
        item.active = true;
        return item;
      } else {
        return item;
      }
    });
    await db.write();
    res.send("Service successfully activated.");
  } catch (err) {
    next(err);
  }
};

export const deactivateService = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    if (!req.body || !instanceOfService(req.body)) {
      res.status(422);
      throw new Error(
        "Unprocessable Entity. Check your json data. Your entity must be structurally equal to the one you want deleted."
      );
    }

    if (!db.data.filter((item) => item.path === req.body.path).length) {
      res.status(404);
      throw new Error(`Resource with path ${req.body.path} does not exist.`);
    }

    db.data = db.data.map((item) => {
      if (item.path === req.body.path) {
        item.active = false;
        return item;
      } else {
        return item;
      }
    });
    await db.write();
    res.send("Service successfully deactivated.");
  } catch (err) {
    next(err);
  }
};
