## Setup

1. Clone the repo
2. Run `npm install`
3. Create `.env` file
4. Run Prisma migration:
   ```bash
   npx prisma migrate dev --name init
   ```

## Start Server
```bash
npm run dev
```

## Code Gen

### Run the CLI

Now run it with
```bash
npm run feature [feature_name]
```
e.g.
```bash
npm run feature orders
```