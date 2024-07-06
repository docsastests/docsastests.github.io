# ReqRes API Tutorial

This tutorial covers the basics of interacting with the ReqRes API, a fake online REST API designed for testing and prototyping. We'll go through two common operations: fetching a list of users and creating a new user.

ReqRes is a free service and doesn't require authentication, making it perfect for quick testing.

## 1. Fetching a List of Users

The ReqRes API allows you to fetch a paginated list of users. This can be useful for understanding how to navigate through paginated responses in APIs.

```bash
curl https://reqres.in/api/users
```

The response is a JSON object containing an array of users, the total number of users, and pagination details.

<!--expected_similarity=0.8-->
```
{"page":1,"per_page":6,"total":12,"total_pages":2,"data":[{"id":1,"email":"george.bluth@reqres.in","first_name":"George","last_name":"Bluth","avatar":"https://reqres.in/img/faces/1-image.jpg"},{"id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://reqres.in/img/faces/2-image.jpg"},{"id":3,"email":"emma.wong@reqres.in","first_name":"Emma","last_name":"Wong","avatar":"https://reqres.in/img/faces/3-image.jpg"},{"id":4,"email":"eve.holt@reqres.in","first_name":"Eve","last_name":"Holt","avatar":"https://reqres.in/img/faces/4-image.jpg"},{"id":5,"email":"charles.morris@reqres.in","first_name":"Charles","last_name":"Morris","avatar":"https://reqres.in/img/faces/5-image.jpg"},{"id":6,"email":"tracey.ramos@reqres.in","first_name":"Tracey","last_name":"Ramos","avatar":"https://reqres.in/img/faces/6-image.jpg"}],"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}
```

## 2. Creating a New User

The ReqRes API also allows you to create a new user. This is a basic example of a POST request.

To create a new user, send a JSON payload with the user's name and job title:

```bash
curl -X POST https://reqres.in/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "job": "Developer"
  }'
```

The response contains the details of the created user along with a timestamp.

<!--expected_similarity=0.8-->
```
{"name":"Jane Doe","job":"Developer","id":"557","createdAt":"2024-07-04T21:58:42.684Z"}
```

This concludes the tutorial on how to interact with the ReqRes API, specifically focusing on fetching user data and creating a new user.
