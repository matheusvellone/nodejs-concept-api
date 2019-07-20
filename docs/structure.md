Project Structure
-----------------

This is the basic folder structure.
Some items are hidden to simplify the

```
nodejs-concept-api
├── config // Project configurations
│   ├── environment // Environment variables by environment
├── database
│   ├── migrations // Project migrations
│   └── seeders // Project seeders
├── src
│   ├── bin
│   │   └── server.js // The entrypoint
│   ├── controllers
│   ├── Errors // Custom errors
│   │   ├── BaseError.js // All custom errors should `extend` this Error
│   ├── helpers
│   │   ├── I18n
│   │   │   └── locales // Translation files are located here
│   ├── middlewares
│   │   ├── index.js // Everything being exported via index.js
│   ├── models
│   │   ├── index.js // Everything being exported via index.js
│   ├── routes
│   │   ├── appRoutes.js
│   │   ├── otherRoutes.js
│   ├── services
│   │   ├── external
│   ├── setup
│   ├── transforms
│   └── validators // Input validators
├── docker-compose.prod.yml // docker-compose file for production
├── docker-compose.yml // docker-compose file for development/test
├── dotenv.js
├── Makefile // Makefile for development/test
└── Makefile.prd // Makefile for production
```
