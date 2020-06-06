import axios from "axios";
import router from "./router";
export const HTTP = axios.create({
  baseURL: `http://localhost:8000/api/`,
  headers: {
    Authorization: localStorage.getItem("token"),
    Content_Type: "application/json;charset=UTF-8"
  }
});

HTTP.interceptors.response.use(
  res => {
    if (res.status === 200 || res.status === 201) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  error => {
    //console.log(error.response.data);
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          //do something
          break;

        case 401:
          router.replace({
            path: "/pages/login"
            //query: { redirect: router.currentRoute.fullPath }
          });
          break;
        case 403:
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }
          });
          break;
        case 404:
          alert("page not exist");
          break;
        case 502:
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
      }
      return Promise.reject(error.response);
    }
  }
);
