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
import localVar from "../../LocalVar";
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
        location: ""
        //company: "",
        //branch: ""
      },
      isSubmitted: false
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
      }
      /* branch: {
        required
      }*/
    }
  },
  methods: {
    handleSubmit() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.addNewUser();
    },
    addNewUser() {
      console.log(this.newUser);

      this.$axios
        .post(localVar.get_api_address() + "users/", this.newUser)
        .then(res => {
          //this.$router.push({ name: "Users" });
          console.log(res.data);
        })
        .catch(() => {
          console.log("handle server error from here");
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
