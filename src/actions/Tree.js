import fetch from "isomorphic-unfetch";
import urls from "src/utils/urls";

export const getQuestionTreeById = async (id) => {
  return fetch(`${urls.baseUrl}${urls.api.tree.getById}?id=${id}`, {
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
      } 
      return json.payload;
    });
};

export const getActiveQuestionTree = async () => {
  return fetch(urls.baseUrl + urls.api.tree.getActive, {
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

export const getAllQuestionTrees = async () => {
  return fetch(urls.baseUrl + urls.api.tree.getAll, {
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
      const newTrees = json.payload.map(tree => {
        if (tree.editedOn) {
          tree.editedOn = new Date(tree.editedOn);
        }
        if (tree.lastActive) {
          tree.lastActive = new Date(tree.lastActive);
        }
        return tree;
      });
      return newTrees;
    });
};

export const addQuestionTree = async (tree, username) => {
  return fetch(urls.baseUrl + urls.api.tree.add, {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tree,
      username,
    }),
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

export const removeQuestionTreeById =  async(id) => {
  return fetch(urls.baseUrl + urls.api.tree.removeById, {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
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

export const updateQuestionTree = async (tree, username) => {
  return fetch(urls.baseUrl + urls.api.tree.update, {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tree,
      username,
    }),
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
