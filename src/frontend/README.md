# Getting Started

## Table of contents
- [Development Guide](#development-guide)
    - [Requirements](#requirements)
    - [Start a Development Server](#start-the-webpack-development-server)
    - [Build App](#build-app)
    - [Docker](#docker)

## Development Guide

### Requirements

It is recommended to be running a Debian or Ubuntu based Linux distribution. <br>
In order to install the requirements for another OS, please refer to the official guides.  

1. NVM
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash && source ~/.nvm/nvm.sh
```
2. Node
```sh
nvm use --lts
```
3. Yarn
```sh
npm install --global yarn
```

### Install all dependencies:

```sh
yarn install
```

### Start the Webpack Development Server:

```sh
yarn start
```

or

### Build App:

1. Install serve

```sh
yarn global add serve
```

2. Build and serve app

```sh
yarn build
serve -s build/
```

### Docker

We recommend developing with Docker. This ensures your development environment is isolated from the rest of your machine. Refer to the official documentation to install Docker. ([Docs](https://docs.docker.com/desktop/linux/install/))

```sh
docker-compose -f docker-compose-dev.yml up --build
```

qualquer coisa 22222
