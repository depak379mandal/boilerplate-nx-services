# Project Structure

## Below explains how to create a new service and library and how to run the project

```
nx generate @nx/node:service <service-name>
nx generate @nx/node:library <library-name>
nx run <service-name>:serve
nx run <library-name>:build
nx run <service-name>:build
nx run <library-name>:build

```

## Service architecture file naming convention

```
src/
    <service-name>/
        <service-name>.controller.ts
        <service-name>.service.ts
        <service-name>.route.ts
        <service-name>.swagger.ts
        schemas/
            <service-name>.schema.ts
    <service-name>.main.ts
    <service-name>.tsconfig.json
    <service-name>.eslintrc.json
    <service-name>.prettierrc.json
    <service-name>.gitignore
```
