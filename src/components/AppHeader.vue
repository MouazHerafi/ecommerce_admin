<template>
  <div class="admin">
    <!-- الشريط العلوي-->
      <nav class="navbar navbar-style">
        <div class="container">
            <a
                    @click="toggle"
                     class="fa fa-bars" id="open-button"></a>
          <div class="navbar-brand p-0">
            <a href="/"><img src="/images/logo.png" alt="لوحتي"/></a>
            <!--<ul class="float-left p-0 m-0 list-unstyled d-flex flex-row">
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
                <a href="#">الزبائن</a>
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

            </ul>-->
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
                <a href="#" data-toggle="dropdown" id="dropdownMenuButton">
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
        <div id="slideMenu" class="slideMenu"
             :class="{ isOpen: isOpen }">
            <ul class="list-unstyled p-0">
                  <router-link to="/">
                    <li @click="close()"><a
                            @click="close()"
                    ><i class=" fa fa-home"></i>الرئيسية</a></li>
                  </router-link>
                <router-link to="/companies">
                    <li @click="close()"><a @click="close()"><i class=" fa fa-building"></i>الشركات</a></li>
                </router-link>
                <router-link to="/categories">
              <li @click="close()"><a @click="close()"><i class="fa fa-tags"></i>الفئات</a></li>
            </router-link>
                <router-link to="/users">
              <li @click="close()"><a @click="close()"><i class="fa fa-users"></i>الموظفين</a></li>
            </router-link>
              <router-link to="/users">
                <li @click="close()"><a @click="close()"><i class="fa fa-users"></i>الزبائن</a></li>
              </router-link>
              <router-link to="/">
                <li @click="close()"><a @click="close()"><i class="fa fa-shopping-cart"></i>الطلبات</a></li>
              </router-link>
              <router-link to="/">
                <li @click="close()"><a @click="close()"><i class="fa fa-shopping-cart"></i>البطاقات</a></li>
              </router-link>
              <router-link to="/coupons">
                <li @click="close()"><a @click="close()"><i class="fa fa-shopping-cart"></i>الحسومات</a></li>
              </router-link>

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
      isOpen: false

    }


  },
  created() {
    //this.isOpen=false;

    var token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({name: "Login"});
    }
  },
  methods: {
    open () {

      this.isOpen = true
    },
    close () {

      this.isOpen = false
    },
    toggle () {
      if (this.isOpen) {
        this.close()
      } else {
        this.open()
      }
    }
    ,
    logoutNow() {
      localStorage.setItem("token", "");
      this.$router.push({ name: "Login" });
    }


  },
};
</script>

<style scoped>

</style>