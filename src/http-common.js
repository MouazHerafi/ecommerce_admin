import axios from "axios";
import router from "./router";
const IP = "http://localhost";
const PORT = "8000";
const token = localStorage.getItem("token");
// eslint-disable-next-line no-unused-vars
export let MESSAGE_ERROR = "";
export let MESSAGE_WITHOUT_ERROR = "";
export const HTTP = axios.create({
  baseURL: IP + ":" + PORT +`/api/v1/`,
  headers: {
    Authorization: token,
    //Content_Type: "application/json;charset=UTF-8"
    //Content_Type: "application/x-www-form-urlencoded"
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
          localStorage.setItem("token", "");
          var Unauthorised_error_msg = error.response.data.message;
          if (Unauthorised_error_msg === "Unauthenticated.") {
            router.replace({
              path: "/pages/login"
              //query: { redirect: router.currentRoute.fullPath }
            });
          }
          break;
        case 403:
          router.replace({
            path: "/login",
            //query: { redirect: router.currentRoute.fullPath }
          });
          break;
        case 404:
          router.replace({
            path: "/pages",
            //query: { redirect: router.currentRoute.fullPath }
          });
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
          break;
        case 422:
       /*   if(error.response.data.error!==null){
            MESSAGE_WITHOUT_ERROR = error.response.data.error.message
          }
          else {*/
            MESSAGE_ERROR = error.response.data.message;
       //   }

      }
      return Promise.reject(error.response);
    }
  }
)
