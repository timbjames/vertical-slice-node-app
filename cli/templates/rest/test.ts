import * as service from './__NAME__.service';

describe('__NAME__ service', () => {
  it('should create an item', async () => {
    const item = await service.create({ name: 'Test', description: 'Unit test' });
    expect(item).toHaveProperty('id');
    expect(item.name).toBe('Test');
  });

  it('should retrieve all items', async () => {
    const items = await service.getAll();
    expect(Array.isArray(items)).toBe(true);
  });

  it('should retrieve an item by ID', async () => {
    const created = await service.create({ name: 'GetMe', description: '' });
    const item = await service.getById(created.id);
    expect(item).toBeDefined();
    expect(item?.id).toBe(created.id);
  });

  it('should update an item', async () => {
    const created = await service.create({ name: 'ToUpdate', description: '' });
    const updated = await service.update(created.id, { name: 'Updated', description: 'Done' });
    expect(updated.name).toBe('Updated');
  });

  it('should delete an item', async () => {
    const created = await service.create({ name: 'ToDelete', description: '' });
    await service.remove(created.id);
    const item = await service.getById(created.id);
    expect(item).toBeNull();
  });
});