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

### To make the CLI Exacutable
In the terminal
```bash
chmod +x cli.js
```

Now run it with
```bash
node cli.js create-feature orders
```

### Create a REST feature
```bash
node cli/cli.js create-feature orders
```

### Create a graphQL feature (why would you want to?!)
```bash
node cli/cli.js create-feature inventory --graphql
```