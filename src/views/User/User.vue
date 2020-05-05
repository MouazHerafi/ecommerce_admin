<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">ملف المستخدم</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1>
        <i class="fa fa-user block-icon" aria-hidden="true"></i>ملف المستخدم :
      </h1>

      <form class="custom-form user-profile-form d-flex flex-wrap">
        <div class="form-group">
          <label>اسم المستخدم</label>
          <input
            id="name"
            v-model="clickedUser.name"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group">
          <label>الاسم الكامل للمستخدم</label>
          <input
            id="username"
            v-model="clickedUser.username"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group">
          <label>البريد الالكتروني</label>
          <input
            id="email"
            v-model="clickedUser.email"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group">
          <label>رقم الهاتف</label>
          <input
            id="phone"
            v-model="clickedUser.phone"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group">
          <label>العنوان</label>
          <input
            id="location"
            v-model="clickedUser.location"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group">
          <label>كلمة المرور</label>
          <input
            id="OldPassword"
            v-model="clickedUser.password"
            class="form-control"
            type="password"
          />
        </div>

        <!--<div class="form-group">
          <label>الشركة المطلوبة</label>
          <select
            id="company"
            v-model="clickedUser.location"
            class="form-control"
          >
            <option
              v-for="company in companies"
              :value="company.id"
              :key="company.id"
            >
              {{ company.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>الفرع المطلوب</label>
          <select id="branch" v-model="clickedUser.location" class="form-control">
            <option v-for="branch in branches" :value="branch.id" :key="branch.id">
              {{ branch.name }}
            </option>
          </select>
        </div>-->

        <div class="form-group change-pass">
          <p>هل تريد تغيير كلمة المرور؟</p>
          <toggle-button
            v-model="isNewPassword"
            :labels="{ checked: 'لا', unchecked: 'نعم' }"
            :width="55"
            :height="25"
          />
        </div>

        <div v-if="isNewPassword" class="form-group">
          <label>كلمة المرور الجديدة</label>
          <input
            id="newPassword"
            v-model="clickedUser.newPassword"
            class="form-control"
            type="password"
          />
        </div>

        <div v-if="isNewPassword" class="form-group">
          <label>تأكيد كلمة المرور الجديدة</label>
          <input
            id="newPassword_confirmation"
            v-model="clickedUser.newPassword_confirmation"
            class="form-control"
            type="password"
          />
        </div>
        <div class="form-group">
          <a class="btn btn-primary" @click="updateUser()">تحديث</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import localVar from "../../LocalVar";
export default {
  name: "User",
  data: function() {
    return {
      clickedUser: {
        name: "",
        email: "",
        phone: "",
        username: "",
        location: "",
        password: "",
        newPassword: "",
        newPassword_confirmation: ""
      },
      isNewPassword: false
    };
  },
  async mounted() {
    await this.getUser();
  },
  methods: {
    getUser() {
      console.log(this.$route.params.id);
      this.$axios
        .get(localVar.get_api_address() + "users/" + this.$route.params.id)
        .then(res => {
          console.log(res);

          this.clickedUser = res.data.data;
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },
    updateUser() {
      /* this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
            })*/
      console.log(this.clickedUser);
      this.$axios
        .put(
          localVar.get_api_address() + "users/" + this.$route.params.id,
          this.clickedUser
        )
        .then(res => {
          console.log(res);

          //this.$router.push({ name: "Users" });
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    }
  }
};
</script>
