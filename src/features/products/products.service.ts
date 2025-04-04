import { ProductsInput } from './products.schema';

const db: Record<string, any> = {}; // fake in-memory db
let idCounter = 1;

export async function create(data: ProductsInput) {
  const id = String(idCounter++);
  db[id] = { id, ...data };
  return db[id];
}

export async function getAll() {
  return Object.values(db);
}

export async function getById(id: string) {
  return db[id] || null;
}

export async function update(id: string, data: ProductsInput) {
  if (!db[id]) throw new Error('Not found');
  db[id] = { id, ...data };
  return db[id];
}

export async function remove(id: string) {
  delete db[id];
}