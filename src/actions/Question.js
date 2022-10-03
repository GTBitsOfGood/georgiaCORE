import fetch from "isomorphic-unfetch";
import urls from "src/utils/urls";

export const getAllQuestions = () => {
  return fetch(urls.baseUrl + urls.api.question, {
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

export const setQuestions = (questions) => {
  return fetch(urls.baseUrl + urls.api.question, {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(questions),
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
