<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="/images/img-01.png" alt="IMG" />
        </div>

        <form @submit.prevent="loginNow" class="login100-form">
          <span class="login100-form-title">
            تسجيل الدخول
          </span>

          <div class="wrap-input100">
            <input
              class="input100"
              v-model="user.email"
              type="text"
              name="email"
              placeholder="البريد الالكتروني"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
          </div>

          <div class="wrap-input100">
            <input
              class="input100"
              v-model="user.password"
              type="password"
              name="pass"
              placeholder="كلمة المرور"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
          </div>

          <div class="container-login100-form-btn">
            <button class="login100-form-btn">
              تأكيد
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
//import localVar from "../LocalVar";
import { HTTP } from "../http-common";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    loginNow() {
      console.log(this.user);
      HTTP.post("login", this.user /*,{errorHandle: true}*/).then(res => {
        localStorage.setItem(
          "token",
          res.data.token_type + " " + res.data.access_token
        );
        this.$router.push({ name: "Home" });
      });
      /*.catch(() => {
              //console.log(error.response.data.error);
                console.log("handle server error from here");
            })*/
    }
  }
};
</script>
<style scoped src="@/assets/styles/loginstyle.css"></style>
