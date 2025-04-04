import { Request, Response, NextFunction } from 'express';
import * as productsService from './products.service';
import { ProductsSchema } from './products.schema';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = ProductsSchema.parse(req.body);
    const result = await productsService.create(data);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await productsService.getAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await productsService.getById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const data = ProductsSchema.parse(req.body);
    const result = await productsService.update(req.params.id, data);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await productsService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}