<br />
<p align="center">
  <div align="center">
    <img height="150" src="#" alt="Chachat" border="0"/>
  </div>
  <h3 align="center">Chachat (Messaging App)</h3>
  <p align="center">
    <a href="https://github.com/ikkair/chachat-be"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://chachat-fe-ikkair.vercel.app/">View Demo</a>
  </p>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisite](#prerequisites)
  - [Installation](#installation)
<!--   - [Documentation](#documentation) -->
- [Related Project](#related-project)

# About The Project

Chachat is a website that has been created to facilitate communication among users through real-time messaging. Users are able to create an account, modify their profile, and engage in text-based communication with others.

## Built With

These are the libraries and service used for building this backend API

- [Socket.io](https://socket.io/)
- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [Json Web Token](https://jwt.io)
- [Multer](https://github.com/expressjs/multer)
- [Google Cloud Platform](https://cloud.google.com)
- [Nodemailer](https://nodemailer.com/about)

# Getting Started

## Prerequisites

You'll need these programs installed before proceeding to installation

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download)

## Installation

Follow this steps to run the server locally

1. Clone this repository

```sh
git clone https://github.com/ikkair/chachat-be.git
```

2. Change directory to chatter-backend

```sh
cd chachat-be
```

3. Install all of the required modules

```sh
npm install
```

4. Create PostgreSQL database, query are provided in [chachat-database-query.sql](./query.sql)

5. Create and configure `.env` file in the root directory, example credentials are provided in [.env.example](./.env.example)

```txt
- Please note that this server requires Google Drive API credentials and Gmail service account
- Otherwise API endpoint with image upload and account register won't work properly
```

6. Run this command to run the server

```sh
npm run server
```

- Or run this command for running in development environment

```sh
npm run dev
```

- Run this command for debugging and finding errors

```sh
npm run lint
```

<!-- ## Documentation

Documentation files are provided in the [docs](./docs) folder

- [Postman API colletion](./docs/Chatter.postman_collection.json)
- [PostgreSQL database query](./docs/chatter-database-query.sql)
- [Database diagram](./docs/chatter-database-diagram.drawio.png)

API endpoint list are also available as published postman documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/26309865/2s93Xu1Qik) -->

# Related Project

:rocket: [`Frontend Chachat`](https://github.com/ikkair/chachat-fe)

:rocket: [`Backend Chachat`](https://github.com/ikkair/chachat-be)

:rocket: [`Demo Chachat`](https://chachat-fe-ikkair.vercel.app/)
