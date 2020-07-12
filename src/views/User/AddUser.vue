<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">إضافة مستخدم جديد</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1>
        <i class="fa fa-plus block-icon" aria-hidden="true"></i>إضافة مستخدم
        جديد
      </h1>

      <form
        @submit.prevent="handleSubmit"
        class="custom-form user-profile-form d-flex flex-wrap"
      >
        <div class="form-group">
          <label>اسم المستخدم</label>
          <input
            id="name"
            name="name"
            v-model="newUser.name"
            class="form-control"
            :class="{
              'error-feild': isSubmitted && $v.newUser.name.$error
            }"
            type="text"
          />
          <div
            v-if="isSubmitted && !$v.newUser.name.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
            v-if="isSubmitted && !$v.newUser.name.minLength"
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
            name="username"
            v-model="newUser.username"
            class="form-control"
            :class="{
              'error-feild': isSubmitted && $v.newUser.username.$error
            }"
            type="text"
          />
          <div
            v-if="isSubmitted && !$v.newUser.username.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
            v-if="isSubmitted && !$v.newUser.username.minLength"
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
            v-model="newUser.email"
            class="form-control"
            type="text"
            :class="{ 'error-feild': isSubmitted && $v.newUser.email.$error }"
          />
          <div
            v-if="isSubmitted && !$v.newUser.email.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
            v-if="isSubmitted && !$v.newUser.email.email"
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
            name="phone"
            v-model="newUser.phone"
            class="form-control"
            type="text"
            :class="{ 'error-feild': isSubmitted && $v.newUser.phone.$error }"
          />
          <div
            v-if="isSubmitted && !$v.newUser.phone.required"
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
            name="location"
            v-model="newUser.location"
            class="form-control"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.newUser.location.$error
            }"
          />
          <div
            v-if="isSubmitted && !$v.newUser.location.required"
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
            id="password"
            name="password"
            v-model="newUser.password"
            class="form-control"
            :class="{
              'error-feild': isSubmitted && $v.newUser.password.$error
            }"
            type="password"
          />
          <div
            v-if="isSubmitted && !$v.newUser.password.required"
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

        <div class="form-group">
          <label>تأكيد كلمة المرور</label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            v-model="newUser.password_confirmation"
            class="form-control"
            :class="{
              'error-feild':
                isSubmitted && $v.newUser.password_confirmation.$error
            }"
            type="password"
          />
          <div
            v-if="isSubmitted && !$v.newUser.password_confirmation.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
            v-if="
              isSubmitted && !$v.newUser.password_confirmation.sameAsPassword
            "
            class="invalid-feedback"
          >
            {{ msg_password_match }}
          </div>
        </div>
         <div class="form-group">
         <!--<label>اختر صلاحية المستخدم</label>-->
           <div class="style-chooser">
             <v-select
                     dir="rtl"
                     label="name"
                     :filterable="false"
                     :options="roles"
                     v-model="newUser.role"
                     placeholder="اختر صلاحية المستخدم"
                     :reduce="name => name.id"
             >
             </v-select>
           </div>
          <div
            v-if="isSubmitted && !$v.newUser.role.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
        </div>

        <!-- <div class="form-group">
          <label for="company">الشركة المطلوبة</label>
          <select
            v-on:input="showBranches($event.target.value)"
            id="company"
            name="company"
            v-model="newUser.location"
            class="form-control"
            :class="{ 'error-feild': isSubmitted && $v.newUser.location.$error }"
          >
            <option
              v-for="company in companies"
              :value="company.id"
              :key="company.id"
            >
              {{ company.name }}
            </option>
          </select>
          <div
            v-if="isSubmitted && !$v.newUser.location.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
        </div>-->

        <!-- <div class="form-group">
          <label for="branch">الفرع المطلوب</label>
          <select
            :disabled="isDisabled == true"
            id="branch"
            name="branch"
            v-model="newUser.branch"
            class="form-control"
            :class="{ 'error-feild': isSubmitted && $v.newUser.branch.$error }"
          >
            <option
              v-for="branch in branches"
              :value="branch.id"
              :key="branch.id"
            >
              {{ branch.name }}
            </option>
          </select>
          <div
            v-if="isSubmitted && !$v.newUser.branch.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
        </div>>\-->

        <div class="form-group">
          <button class="btn btn-primary">تأكيد</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
import localVar, {ROLES_API} from "../../LocalVar";
import {HTTP} from "../../http-common";
export default {
  name: "AddUser",
  data: function() {
    return {
      isDisabled: true,
      msg_req: localVar.get_msg_req(),
      msg_email: localVar.get_msg_email(),
      msg_password_match: localVar.get_msg_password_match(),
      msg_min_length: localVar.get_msg_min_length(4),
      newUser: {
        name: "",
        username: "",
        password: "",
        password_confirmation: "",
        email: "",
        phone: "",
        location: "",
        role: ""
        //company: "",
        //branch: ""
      },
      isSubmitted: false,
      roles:[],
      errors: {
        email: [],
        phone: [],
        username: [],
        name: [],
        loaction: [],
        password: []
      }
    };
  },
  validations: {
    newUser: {
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
      password_confirmation: {
        required,
        sameAsPassword: sameAs("password")
      },
      location: {
        required
      },
      role: {
        required
      }
      /* branch: {
        required
      }*/
    }
  },
  async mounted() {
    await this.getRoles();
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

          this.addNewUser();
        }
      });
    },
    getRoles(){
      HTTP
              .get( ROLES_API)
              .then(res => {
                console.log(res);

                this.roles = res.data.data;
              })
              .catch(() => {
                console.log("handle server error from here");
              });
    },
    addNewUser() {
      console.log(this.newUser);
      this.$axios
        .post(localVar.get_api_address() + "users/", this.newUser)
        .then(res => {
          //this.$router.push({ name: "Users" });

          this.$swal.fire({
            icon: "success",
            title: "تمت إضافة الموظف بنجاح!",
            showConfirmButton: false
            // timer: 1500
          });

          console.log(res.data);
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            this.errors = error.response.data.errors;
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message
            });

            //console.log(error.response.status);
            //console.log(error.response.data.errors);
            // console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
    /* showBranches(i) {
      //this.getBranches(i);
      this.isDisabled = false;
    },
    getBranches(companyID) {
      this.$axios
        .get("url" + companyID)
        .then(res => {
          console.log(res);
          if (res.data.error) {
            alert(res.data.message);
          } else {
            //console.log(res.data);
            this.branches = res.data.branches;
          }
        })
        .catch(error => console.log(error));
    }*/
  }
};
</script>
<style scoped>
  .d-center {
    display: flex;
    align-items: center;
  }

  .v-select .dropdown li {
    border-bottom: 1px solid rgba(112, 128, 144, 0.1);
  }

  .v-select .dropdown li:last-child {
    border-bottom: none;
  }

  .v-select .dropdown li a {
    padding: 10px 20px;
    width: 100%;
    font-size: 1.25em;
    color: #3c3c3c;
  }

  .v-select .dropdown-menu .active > a {
    color: #fff;
  }
</style>
