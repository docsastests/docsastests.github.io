# ReqRes API Tutorial

This tutorial covers the basics of interacting with the ReqRes API, a fake online REST API designed for testing and prototyping. We'll go through two common operations: fetching a list of users and creating a new user.

ReqRes is a free service and doesn't require authentication, making it perfect for quick testing.

## 1. Fetching a List of Users

The ReqRes API allows you to fetch a paginated list of users. This can be useful for understanding how to navigate through paginated responses in APIs.

    ```curl
    curl https://reqres.in/api/users
    ```

The response is a JSON object containing an array of users, the total number of users, and pagination details.

    ```json
    {
        "page": 1,
        "per_page": 6,
        "total": 12,
        "total_pages": 2,
        "data": [
            {
                "id": 1,
                "email": "george.bluth@reqres.in",
                "first_name": "George",
                "last_name": "Bluth",
                "avatar": "https://reqres.in/img/faces/1-image.jpg"
            },
            // More users...
        ]
    }
    ```

## 2. Creating a New User

The ReqRes API also allows you to create a new user. This is a basic example of a POST request.

To create a new user, send a JSON payload with the user's name and job title:

    ```curl
    curl -X POST https://reqres.in/api/users \
      -H "Content-Type: application/json" \
      -d '{
        "name": "Jane Doe",
        "job": "Developer"
      }'
    ```

The response contains the details of the created user along with a timestamp.

    ```json
    {
        "name": "Jane Doe",
        "job": "Developer",
        "id": "123",
        "createdAt": "2020-04-20T09:27:34.685Z"
    }
    ```

This concludes the tutorial on how to interact with the ReqRes API, specifically focusing on fetching user data and creating a new user.
