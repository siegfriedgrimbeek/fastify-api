# A Node Generating project, it uses MongoDB, Fastify and Swagger.

## Prerequisites
- Nodejs
- MongoDB

## Build Setup

#### Install dependencies
`npm install`

#### Serve with hot reload at localhost:8080
`npm start`

## Scripts for generating
#### Initial a local generating scripts
`npm link`

#### Scripts
You can use the `g` command to generate controllers:

```bash
g controller
The system will ask you enter your Controller name, then you can:

# entering the alias
new-controller-name
# Your controller named `new-controller-name.controller.js` will be generated in src/controllers
# Your route names named `new-controller-name.route.js` will be generated in src/routes
# Your schema named `new-controller-name.schema.js` will be generated in src/schemas

# or entering relative path generation
admin/feature/new-controller-name
# Your controller will be generated in src/controllers/admin/feature
# Your route will be generated in src/routes/admin/feature
# Your schema will be generated in src/schemas/admin/feature

```
You can find all possible blueprints in the table below:

Scaffold  | Usage
---       | ---
[Model]      | `g model`
[Controller, Route, Schema]      | `g controller`

`Note that, Your models always generated in src/models`
