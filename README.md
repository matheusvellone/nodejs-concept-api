NodeJS Concept Api
------------------

# Features
- Global Error Handling
- JWT Tokens
- Social Logins
  - Facebook
- Translate responses via `Accept-Language` header with I18n
- Password hashing with [bcrypt](https://www.npmjs.com/package/bcrypt)
- Input validation with [joi](https://www.npmjs.com/package/joi)
- [Production Console](/docs/console.md)

## Requirements
- `docker`
- `docker-compose`
- [`git-crypt`](https://github.com/AGWA/git-crypt)
- `make` (optional, but recommended)

## Configuration
You can configure all environment variables for your environment via the [`config/environment`](/config/environment) directory. Each environment has its own file.

> The `production` is binary because its not recommended to have the data in plain text. [git-crypt](https://github.com/AGWA/git-crypt) was used to encrypt it. You can safely it and add your own `production` file, which will be encrypted as soon as you `git commit` it.

Aplication wide configuration can be found at

## Development

Git clone this repository and run `make dev`. This will bring both API and DATABASE containers up.
Your API will be listening on port `3000` and postgres will be on `5432`.

## Test

The repo is configured to run on [CircleCI](https://circleci.com).
The workflow will also deploy the `master` branch to the server, which is identified via `SERVER_USER@SERVER_IP` environment variables in CircleCI.

## Production

Before running the repository in production, you'll need to:
- Configure your environment variables via `config/environment/production` file (remember, this file is, by default, `git-crypt`ed)
- a domain with DNS pointing to the server IP you're running the command

To run the code in production just run `make prod`.
This command will run 4 different containers:
- [`jwilder/nginx-proxy`](https://github.com/jwilder/nginx-proxy)
- [`jrcs/letsencrypt-nginx-proxy-companion`](https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion)
- the api, with pm2 as the process manager
- and the postgres database

# TODOs
- Manage JWT tokens via Redis
- GraphQL support
