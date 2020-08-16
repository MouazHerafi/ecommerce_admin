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

      <loading
              :active.sync="isLoading"
              :is-full-page="false"
              color="#ef3e58"
      ></loading>

      <form
              @submit.prevent="handleSubmit"
              v-if="!isLoading" class="custom-form user-profile-form d-flex flex-wrap">
        <div class="form-group">
          <label>اسم المستخدم</label>
          <input
            id="name"
            v-model="clickedUser.name"
            class="form-control"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.clickedUser.name.$error
            }"
          />
          <div
                  v-if="isSubmitted && !$v.clickedUser.name.required"
                  class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
                  v-if="isSubmitted && !$v.clickedUser.name.minLength"
                  class="invalid-feedback"
          >
            {{ msg_min_length }}
          </div>
          <div
                  v-for="(error, i) in errors.name"
                  :key="i"
                  class="invalid-feedback"
          >
            {{ error }}
          </div>
        </div>

        <div class="form-group">
          <label>الاسم الكامل للمستخدم</label>
          <input
            id="username"
            v-model="clickedUser.username"
            class="form-control"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.clickedUser.username.$error
            }"
          />
          <div
                  v-if="isSubmitted && !$v.clickedUser.username.required"
                  class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
                  v-if="isSubmitted && !$v.clickedUser.username.minLength"
                  class="invalid-feedback"
          >
            {{ msg_min_length }}
          </div>
          <div
                  v-for="(error, i) in errors.username"
                  :key="i"
                  class="invalid-feedback"
          >
            {{ error }}
          </div>
        </div>

        <div class="form-group">
          <label>البريد الالكتروني</label>
          <input
            id="email"
            v-model="clickedUser.email"
            class="form-control"
            type="text"
            :class="{ 'error-feild': isSubmitted && $v.clickedUser.email.$error }"
          />
          <div
                  v-if="isSubmitted && !$v.clickedUser.email.required"
                  class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
                  v-if="isSubmitted && !$v.clickedUser.email.email"
                  class="invalid-feedback"
          >
            {{ msg_email }}
          </div>
          <div
                  v-for="(error, i) in errors.email"
                  :key="i"
                  class="invalid-feedback"
          >
            {{ error }}
          </div>
        </div>

        <div class="form-group">
          <label>رقم الهاتف</label>
          <input
            id="phone"
            v-model="clickedUser.phone"
            class="form-control"
            type="text"
            :class="{ 'error-feild': isSubmitted && $v.clickedUser.phone.$error }"
          />
          <div
                  v-if="isSubmitted && !$v.clickedUser.phone.required"
                  class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
                  v-for="(error, i) in errors.phone"
                  :key="i"
                  class="invalid-feedback"
          >
            {{ error }}
          </div>
        </div>

        <div class="form-group">
          <label>العنوان</label>
          <input
            id="location"
            v-model="clickedUser.location"
            class="form-control"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.clickedUser.location.$error
            }"
          />
          <div
                  v-if="isSubmitted && !$v.clickedUser.location.required"
                  class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
                  v-for="(error, i) in errors.location"
                  :key="i"
                  class="invalid-feedback"
          >
            {{ error }}
          </div>
        </div>


        <div class="form-group">
          <label>كلمة المرور</label>
          <input
            id="OldPassword"
            v-model="clickedUser.password"
            class="form-control"
            type="password"
            :class="{
              'error-feild': isSubmitted && $v.clickedUser.password.$error
            }"
          />
          <div
                  v-if="isSubmitted && !$v.clickedUser.password.required"
                  class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
                  v-for="(error, i) in errors.password"
                  :key="i"
                  class="invalid-feedback"
          >
            {{ error }}
          </div>
        </div>


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
            :class="{
              'error-feild': isSubmitted && $v.clickedUser.newPassword.$error
            }"
          />
          <div
                  v-for="(error, i) in errors.newPassword"
                  :key="i"
                  class="invalid-feedback"
          >
            {{ error }}
          </div>
        </div>

        <div v-if="isNewPassword" class="form-group">
          <label>تأكيد كلمة المرور الجديدة</label>
          <input
            id="newPassword_confirmation"
            v-model="clickedUser.newPassword_confirmation"
            class="form-control"
            type="password"
            :class="{
              'error-feild': isSubmitted && $v.clickedUser.newPassword_confirmation.$error
            }"
          />
          <div
                  v-if="
              isSubmitted && !$v.clickedUser.newPassword_confirmation.sameAsPassword
            "
                  class="invalid-feedback"
          >
            {{ msg_password_match }}
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary">
            تأكيد
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { USERS_API} from "../../LocalVar";
  import {HTTP, MESSAGE_ERROR, MESSAGE_WITHOUT_ERROR} from "../../http-common";
  import {email, minLength, required, sameAs} from "vuelidate/lib/validators";
export default {
  name: "User",
  /*props: {
    id: {
      type: String,
      required: true
    }
  },*/
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

      isSubmitted: false,
      errors: {
        email: [],
        phone: [],
        username: [],
        name: [],
        loaction: [],
        password: [],
        newPassword: [],
        newPassword_confirmation: []
      },
      isNewPassword: false,
      isLoading: false
    };
  },
  async mounted() {
    await this.getUser();
  },
  validations: {
    clickedUser: {
      name: {
        required,
        minLength: minLength(4)
      },
      username: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      phone: {
        required
      },
      password: {
        required
      },
      newPassword: {

      },
      newPassword_confirmation: {
        sameAsPassword: sameAs("newPassword")
      },
      location: {
        required
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$swal.fire({
        title: "هل تريد الاستمرار؟",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "نعم",
        cancelButtonText: "لا",
        showCancelButton: true,
        showCloseButton: true,
        preConfirm: () => {
          this.isSubmitted = true;
          this.$v.$touch();
          if (this.$v.$invalid) {
            return;
          }
          this.updateUser();
        }
      });
    },
    getUser() {
      this.isLoading = true;
      //console.log("helooo  : " + this.$props.id);
      HTTP
        .get(USERS_API + "/" + this.$route.params.id)
        .then(res => {
          console.log(res);

          this.clickedUser = res.data.data[0];
          this.isLoading = false;
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },
    updateUser() {
      console.log(this.clickedUser);
      HTTP
        .put(
                USERS_API + "/" + this.$route.params.id,
          this.clickedUser
        )
        .then(res => {
          console.log(res);

          this.$router.push({ name: "Users" });
          this.$swal.fire({
            icon: "success",
            title: "تمت تحديث الموظف بنجاح!",
          });
        })
        .catch(error => {
          console.log(error)
          if(MESSAGE_WITHOUT_ERROR!==""){
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: MESSAGE_WITHOUT_ERROR
            });
          }
          else if(MESSAGE_ERROR!==""){
            this.errors = error.data.errors;
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: MESSAGE_ERROR
            });
          }

        });
    }
  }
};
</script>
