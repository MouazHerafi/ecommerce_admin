<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="/images/img-01.png" alt="IMG" />
        </div>

        <form class="login100-form">
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
            <button class="login100-form-btn" @click="loginNow()">
              تأكيد
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
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
      //console.log(this.user);
      //this.$axios.post("url",this.user)
      //.then(res=>{
      //console.log(res);
      //if(res.data.error){
      //	alert(res.data.message);
      //	}else{
      //console.log(res.data);
      //	localStorage.setItem("token",res.data.token);
      this.$router.push({ name: "Home" });
      //	}

      //});
    }
  }
};
</script>
<style scoped src="@/assets/styles/loginstyle.css"></style>
