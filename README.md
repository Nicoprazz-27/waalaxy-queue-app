# Description

This project is built with React and Node (Express) in TypeScript.

The purpose of this project is to create a FIFO queue app. 

The user can add actions to the queue, and every 15 seconds, the first available action is executed.

Adding an action to the queue doesn't require credits, but executing it does.
 
## Prerequisites
node >= v20.12.0

npm >= 9.6.2

## Installation

Use the Node Package Manager (npm) to install all the dependencies of the project with the following commands.

```
npm run install-all
```

## Usage

After the installation, create a .ENV file within the "server" directory.

Every variable present in the .ENV.example file must be included in the .ENV file along with a corresponding value.

Then, to run the project, use the Node Package Manager (npm) with the 'start' command.

```
npm run start
```

To run the tests, use the Node Package Manager (npm) with the 'test' command.
```
npm run test
```