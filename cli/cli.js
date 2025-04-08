import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, 'cli.config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const args = process.argv.slice(2);
const command = args[0];
const featureName = args[1];
const featureStyle = args.includes('--graphql') ? 'graphql' : config.defaultStyle;
const useTests = config.useTests;

if (command !== 'create-feature' || !featureName) {
  console.error(chalk.red('Usage: node cli.js create-feature <feature-name> [--graphql]'));
  process.exit(1);
}

const baseFeaturePath = path.join(__dirname, '..', config.featuresDir, featureName);
if (fs.existsSync(baseFeaturePath)) {
  console.error(chalk.red(`Feature "${featureName}" already exists.`));
  process.exit(1);
}

fs.mkdirSync(baseFeaturePath, { recursive: true });

const templatesPath = path.join(__dirname, 'templates', featureStyle);
if (fs.existsSync(templatesPath)) {
  const files = fs.readdirSync(templatesPath);

  files.forEach(file => {
    if (!useTests && file === 'test.ts') return;

    const content = fs.readFileSync(path.join(templatesPath, file), 'utf8')
      .replace(/__NAME__/g, featureName)
      .replace(/__CLASS__/g, capitalize(featureName));

    const filename = file.replace(/\.ts$/, `.${file}`);
    const target = path.join(baseFeaturePath, `${featureName}.${file}`);
    fs.writeFileSync(target, content);
  });
}

// Modify routes.ts for REST only
if (featureStyle === 'rest') {
  const routesPath = path.join(__dirname, '..', config.routesFile);
  let routesContent = fs.readFileSync(routesPath, 'utf8');

  const importLine = `import ${featureName}Routes from './features/${featureName}/${featureName}.routes';\n`;
  const useLine = `router.use('/${featureName}', ${featureName}Routes);`;

  if (!routesContent.includes(importLine)) {
    routesContent = importLine + routesContent;
  }

  if (!routesContent.includes(useLine)) {
    routesContent = routesContent.replace(
      /(const router = Router\(\);)/,
      `$1\n\n${useLine}`
    );
  }

  fs.writeFileSync(routesPath, routesContent);
}

console.log(chalk.green(`✅ Feature "${featureName}" created successfully.`));

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}