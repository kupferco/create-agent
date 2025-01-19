# Create Agent

`create-agent` is a CLI tool that simplifies the setup of projects using the Proxy Assistant SDK. It automates the creation of a new Expo TypeScript project, installs necessary dependencies, and configures everything to get started immediately.

## Features

- **Quick Start**: Instantly set up a new project with a single command.
- **Pre-configured Template**: Includes TypeScript, Babel, Metro, and other configurations out of the box.
- **SDK Integration**: Automatically installs the Proxy Assistant SDK and required dependencies.
- **Customizable**: Provides a starting point for developers to build their screens without worrying about setup details.

---

## Getting Started

### Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)
- Expo CLI (optional but recommended for development)

### Installation

No installation is required! Simply use the `npx` command to run the tool directly.

---

## Usage

### Create a New Project

Run the following command to create a new project:

```bash
npx github:kupferco/create-agent <app-name>
```

Replace `<app-name>` with the desired name of your project.

### Example

```bash
npx github:kupferco/create-agent my-awesome-app
```

This command will:

- Create a new Expo TypeScript project named `my-awesome-app`.
- Install the Proxy Assistant SDK and required dependencies.
- Copy starter template files into the project.

### Start the Project

Navigate to the project folder and start the development server:

```bash
cd my-awesome-app
npm start
```

You can then run your project on a simulator, physical device, or browser.

---

## Project Structure

The generated project will have the following structure:

```
my-awesome-app/
├── App.tsx               # Main entry point
├── package.json          # Project metadata and dependencies
├── tsconfig.json         # TypeScript configuration
├── babel.config.js       # Babel configuration
├── metro.config.js       # Metro bundler configuration
├── assets/               # Static assets (e.g., images, icons)
├── components/           # Reusable components
├── screens/              # App screens
├── node_modules/         # Installed dependencies
└── ...
```
