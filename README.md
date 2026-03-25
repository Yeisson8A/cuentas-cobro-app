# CuentasCobroApp
Development of an application using Angular 18, Angular Material, and ECharts that integrates the KPI API for accounts receivable, as well as a webhook for uploading files using **n8n**; all of this is containerized using Docker. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

<img width="1365" height="632" alt="image" src="https://github.com/user-attachments/assets/78d17ddc-e923-4650-b5eb-84bae9e83963" />
<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/841fe08f-5623-41a0-8b32-e888ac7bf3c7" />
<img width="1365" height="633" alt="image" src="https://github.com/user-attachments/assets/e23a23a6-38b1-4b05-b5e8-d092549098e4" />
<img width="1365" height="632" alt="image" src="https://github.com/user-attachments/assets/a2e59238-d7bb-46c4-94e8-6e5aae3399cf" />
<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/8bc26bc1-fcf3-4704-8121-c90cd920144e" />
<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/7f58667f-1286-47b5-a097-6014358b95b2" />

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Execute in Docker

### Build the image
`docker-compose build`

### Create container and run
`docker-compose up -d`

## Environment variables

- **apiUrl**: This is the API URL for retrieving accounts receivable KPIs
- **webhookUrl**: This is the webhook URL for the workflow used to upload data to **n8n**
