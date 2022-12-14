import fetch from "isomorphic-unfetch";
import urls from "src/utils/urls";

//Function to insert an authUser into database
export const insertAuthUser = (authUser) => {
  return fetch(urls.baseUrl + urls.api.authUser, {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authUser),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
};

//Function to delete an authUser from database
export const deleteAuthUser = (authUser) => {
  return fetch(urls.baseUrl + urls.api.authUser, {
    method: "DELETE",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authUser),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
};

//Function to update an authUser in the database by finding the
//corresponding email and updating with the new information
export const updateAuthUser = (oldAuthUserEmail, newAuthUser) => {
  return fetch(urls.baseUrl + urls.api.authUser, {
    method: "PATCH",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first: oldAuthUserEmail, second: newAuthUser }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
};

//Function to get all authUsers from database
export const getAuthUsers = () => {
  return fetch(urls.baseUrl + urls.api.authUser, {
    method: "GET",
    mode: "same-origin",
    credentials: "include",
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }
      return json.payload;
    });
};
