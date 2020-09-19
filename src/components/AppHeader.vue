<template>
  <div class="admin">

    <!-- الشريط العلوي-->
      <nav class="navbar navbar-style">
        <div class="container">
            <a
                    @click="toggle"
                     class="fa fa-bars" id="open-button"></a>
          <div class="navbar-brand p-0">
            <a href="/"><img src="/images/mylogo.jpg" alt="لوحتي" style="
    width: 40px;
    height: 40px;
"/></a>

          </div>

          <ul class="float-left p-0 m-0 list-unstyled d-flex flex-row">
            <router-link to="/receivables">
            <li>
              <a href="#">المستحقات</a>
            </li>
            </router-link>
            <router-link to="/deposit">
            <li>
              <a href="#">عمليات الإيداع</a>
            </li>
            </router-link>
            <router-link to="/withdraw">
              <li>
                <a href="#">عمليات السحب</a>
              </li>
            </router-link>
            <li>
              <a data-toggle="modal"
                 data-target="#queryCard" href="">
                <i class="fa fa-id-card " aria-hidden="true"></i>
              </a>
            </li>

            <li>
              <div class="dropdown user-dropdown">
                <a href="#" data-toggle="dropdown" id="dropdownMenuButton">
                  <img alt="" class="user-thumb" src="/images/user.png" />
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <button class="dropdown-item" @click="logoutNow()"
                    ><i class="fa fa-lock"></i>تسجيل الخروج</button>
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
              <router-link to="/customers">
                <li @click="close()"><a @click="close()"><i class="fa fa-users"></i>الزبائن</a></li>
              </router-link>
              <router-link to="/orders">
                <li @click="close()"><a @click="close()"><i class="fa fa-shopping-cart"></i>الطلبات</a></li>
              </router-link>
              <!--<router-link to="/coupons">
                <li @click="close()"><a @click="close()"><i class="fa fa-shopping-cart"></i>الحسومات</a></li>
              </router-link>-->
              <router-link to="/new-attribute">
                <li @click="close()"><a @click="close()"><i class="fa fa-tags"></i>إضافة صفة جديدة</a></li>
              </router-link>


            </ul>


        </div>


    <div
            class="modal fade "
            id="queryCard"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
    >
      <loading
              :active.sync="isLoading"
              :is-full-page="false"
              color="#ef3e58"
      ></loading>
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">استعلام عن رصيد بطاقة</h5>
            <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>رقم البطاقة</label>
              <input
                      id="code"
                      v-model="codeCard.code"
                      class="form-control"
                      type="text"
              />
            </div>
            <div class="form-group">
              <label>الرصيد المتوفر</label>
              <input
                      id="money"
                      disabled
                      v-model="availableMoneyCard"
                      class="form-control"
                      type="text"
              />
            </div>
            <div class="form-group">
              <button @click="getBalanceOfCard(codeCard)" class="btn btn-primary">
                استعلام
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

        <!-- نهائة القائمة الجانبية -->
  </div>

  <!-- نهاية الشريط العلوي-->
</template>

<script>
import {HTTP} from "../http-common";
import {LOGOUT_API} from "../LocalVar";

export default {
  name: "AppHeader",
  data: function(){
    return{
      isOpen: false,
      codeCard:{
        code:""
      },
      availableMoneyCard:"",
      isLoading: false
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
      HTTP.post(LOGOUT_API)
              .then(res => {
                console.log(res)
                localStorage.setItem("token","");
                this.$router.push({ name: "Login" });
              })
              .catch(() => {

              });

    },
    getBalanceOfCard(code) {
      if(code!==""){
        console.log(code);
        this.isLoading = true;
        HTTP.post(  "getCardByCode", code)
                .then(res => {
                  console.log(res);

                  this.availableMoneyCard = res.data.data[0].balance;
                  this.isLoading = false;
                })
                .catch(() => {
                  console.log("handle server error from here");
                });
      }
    },


  },
};
</script>

<style scoped>

</style>