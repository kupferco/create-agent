#!/usr/bin/env node

import { execa } from 'execa';
import chalk from 'chalk';
import yargs from 'yargs/yargs';
import fs from 'fs-extra';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argv = yargs(process.argv.slice(2)).argv;

const appName = argv._[0];
if (!appName) {
    console.log(chalk.red('Please provide an app name:'));
    console.log(chalk.cyan('  npx create-agent <app-name>'));
    process.exit(1);
}

const appPath = path.join(process.cwd(), appName);

async function createApp() {
    try {
        console.log(chalk.green(`Creating a new Expo TypeScript project in ${appPath}...`));

        // Run the Expo initialization command
        await execa('npx', ['create-expo-app', appName, '--template', 'blank-typescript'], {
            stdio: 'inherit',
        });

        console.log(chalk.green('Installing Proxy Assistant SDK and web dependencies...'));

        // Navigate to the project folder
        process.chdir(appPath);

        const tgzPath = path.join(__dirname, 'proxy-assistant-sdk-1.0.0.tgz');

        if (!fs.existsSync(tgzPath)) {
            console.error(chalk.red('SDK file not found at'), tgzPath);
            process.exit(1);
        }

        // Install the SDK and web dependencies
        await execa('npm', ['install', tgzPath], { stdio: 'inherit' });
        await execa('npx', ['expo', 'install', 'react-dom', 'react-native-web', '@expo/metro-runtime'], { stdio: 'inherit' });

        console.log(chalk.green('Copying starter templates...'));

        const templatePath = path.join(__dirname, 'template');

        if (!fs.existsSync(templatePath)) {
            console.error(chalk.red('Template folder not found at'), templatePath);
            process.exit(1);
        }

        const excludedPaths = ['node_modules', '.git']; // Add any directories you want to skip

        await fs.copy(templatePath, appPath, {
            filter: (src) => {
                // Prevent copying into itself
                if (src.includes(appPath)) {
                    console.log(chalk.yellow(`Skipping ${src} (self-reference)`));
                    return false;
                }
                // Skip specific folders
                const relativePath = path.relative(templatePath, src);
                return !excludedPaths.some((p) => relativePath.startsWith(p));
            },
        });

        console.log(chalk.green('Installing dependencies for the template project...'));

        // Run npm install
        await execa('npm', ['install'], { stdio: 'inherit' });

        console.log(chalk.green('Your project is ready!'));
        console.log(chalk.cyan(`  cd ${appName}`));
        console.log(chalk.cyan('  npm start'));
    } catch (error) {
        console.error(chalk.red('Error creating the project:'), error.message);
        process.exit(1);
    }
}



createApp();
