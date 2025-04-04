import { Request, Response, NextFunction } from 'express';
import * as __NAME__Service from './__NAME__.service';
import { __CLASS__Schema } from './__NAME__.schema';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = __CLASS__Schema.parse(req.body);
    const result = await __NAME__Service.create(data);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await __NAME__Service.getAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await __NAME__Service.getById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const data = __CLASS__Schema.parse(req.body);
    const result = await __NAME__Service.update(req.params.id, data);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await __NAME__Service.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}