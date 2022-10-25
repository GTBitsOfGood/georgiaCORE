const urls = {
  baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
  pages: {
    index: "/",
    ssr: "/ssr",
    login: "/login",
    app: {
      home: "/app",
    },
  },
  api: {
    example: "/api/example",
    user: {
      signUp: "/api/user/sign-up",
      login: "/api/user/login",
      logout: "/api/user/logout",
      getCurrent: "/api/user",
    },
    tree: {
      getActive: "/api/tree/get-active",
      getById: "/api/tree/get-by-id",
      getAll: "/api/tree/get-all",

      add: "/api/tree/add",
      removeById: "/api/tree/remove-by-id",
      update: "/api/tree/update",
    }
  },
};

export default urls;
