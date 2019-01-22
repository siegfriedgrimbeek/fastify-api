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
# Using the alias
g controller my-new-component
# Your controller will be generated in src/controllers
# Your route with the same name will be generated in src/routes
# Your schema will be generated in src/schemas

# Controller support relative path generation
g controller admin/feature/new-cmp
# Your controller will be generated in src/controllers/admin/feature
# Your route with the same name will be generated in src/routes/admin/feature
# Your schema will be generated in src/schemas/admin/feature

```
You can find all possible blueprints in the table below:

Scaffold  | Usage
---       | ---
[Model]      | `g model`
[Controller, Route, Schema]      | `g controller`
