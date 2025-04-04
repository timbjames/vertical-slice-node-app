import { Request, Response, NextFunction } from 'express';
import * as ordersService from './orders.service';
import { OrdersSchema } from './orders.schema';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = OrdersSchema.parse(req.body);
    const result = await ordersService.create(data);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await ordersService.getAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await ordersService.getById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const data = OrdersSchema.parse(req.body);
    const result = await ordersService.update(req.params.id, data);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await ordersService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}