# App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.5 and Django version=4 and sqlite as requirements


## Steps to run for local development 

- for the frontend make sure node v14.02 angular cli v14 installed for the frontend side.
- cd into app directory and run these commands:
    ```
        npm install
        npm run lint:fix
        npm run dev
    ```
it should be listening on port: 4200 by defualt 

- for the backend Django rest framework is used and Conda locally to manage the environment:
    ```
        - cd backend
        - pip install -r requirements.txt
        - python manage.py makemigrations
        - python manage.py migrate
        - python manage.py runserver
    ```
should be listening on port: 8000 by default


## Available Endpoints:

1) list movies: GET /api/movies
2) create movies: POST /api/movies
3) get movie details: GET /api/movies/:id/details
4) search movies: GET /api/movies/?search=${keyword}