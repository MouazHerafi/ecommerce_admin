<template>
  <div class="admin">
    <!-- الشريط العلوي-->
    <nav class="navbar navbar-style">
      <div class="container">
        <a @click="show = !show" class="fa fa-bars" id="open-button"></a>
        <div class="navbar-brand p-0">
          <a href="index.html"><img src="/images/logo.png" alt="لوحتي"/></a>
          <ul class="float-left p-0 m-0 list-unstyled d-flex flex-row">
            <router-link to="/" tag="li">
              <a>الرئيسية</a>
            </router-link>
            <router-link to="/companies" tag="li">
              <a>الشركات</a>
            </router-link>
            <router-link to="/users" tag="li">
              <a>الموظفين</a>
            </router-link>
            <router-link to="/categories" tag="li">
              <a>الفئات</a>
            </router-link>
            <li>
              <a href="customers.html">الزبائن</a>
            </li>
            <li>
              <a href="#">الطلبات</a>
            </li>
            <li>
              <a href="#">البطاقات</a>
            </li>
              <router-link to="/coupons" tag="li">
                  <a>الحسومات</a>
              </router-link>

          </ul>
        </div>

        <ul class="float-left p-0 m-0 list-unstyled d-flex flex-row">
          <li>
            <a href="#">
              <span class="text-center menu-notification">+9</span>
              <i class="fa fa-bell" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="#"><i class="fa fa-envelope" aria-hidden="true"></i></a>
          </li>
          <li>
            <div class="dropdown user-dropdown">
              <a data-toggle="dropdown" id="dropdownMenuButton">
                <img alt="" class="user-thumb" src="/images/user.png" />
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#"
                  ><i class="fa fa-user"></i>عبد السلام حلاوة</a
                >
                <a class="dropdown-item" href="#" @click="logoutNow()"
                  ><i class="fa fa-lock"></i>تسجيل الخروج</a
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
     <!-- القائمة الجانبية -->
        <div id="slideMenu" v-if="show">
            <ul class="list-unstyled p-0">
                  <router-link to="/">
                    <li><a><i class=" fa fa-home"></i>الرئيسية</a></li>
                  </router-link>
                <router-link to="/companies">
                    <li><a><i class=" fa fa-home"></i>الشركات و الأفرع</a></li>
                </router-link>
                <router-link to="/categories">
              <li><a><i class="fa fa-bar-chart"></i>الفئات</a></li>
            </router-link>
                <router-link to="/users">
              <li><a><i class="fa fa-users"></i>المستخدمين</a></li>
            </router-link>
                <li><a href="index.html"><i class="fa fa-shopping-cart"></i>الطلبات</a></li>
                <li><a href="customers.html"><i class="fa fa-users"></i>الزبائن</a></li>
                <li><a href="customers.html"><i class="fa fa-users"></i>البطاقات</a></li>
                
            </ul>
        </div>
        <!-- نهائة القائمة الجانبية -->
  </div>
  <!-- نهاية الشريط العلوي-->
</template>

<script>
export default {
  name: "AppHeader",
  data: function(){
    return{
      show: false
    }
  },
  mounted() {
    this.changeSidebar();
    var token = localStorage.getItem("token");
    if (!token) {
      //this.$router.push({name: "Login"});
    }
  },
  methods: {
    logoutNow() {
      localStorage.setItem("token", "");
      this.$router.push({ name: "Login" });
    },
    changeSidebar(){
      this.show = false;
    }

  },
};
</script>
