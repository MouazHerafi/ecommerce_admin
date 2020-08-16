<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">ملف الفرع</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1>
        <i class="fa fa-university block-icon" aria-hidden="true"></i>ملف الفرع
      </h1>

      <loading
        :active.sync="isLoading"
        :is-full-page="false"
        color="#ef3e58"
      ></loading>

      <form
        v-if="!isLoading"
        @submit.prevent="handleSubmit"
        class="custom-form user-profile-form d-flex flex-wrap"
      >
        <div class="form-group">
          <label>اسم الفرع</label>
          <input
            id="name"
            v-model="clickedBranch.name"
            class="form-control"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.clickedBranch.name.$error
            }"
          />
          <div
            v-if="isSubmitted && !$v.clickedBranch.name.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
            v-if="isSubmitted && !$v.clickedBranch.name.minLength"
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
          <label>عنوان الفرع</label>
          <textarea
            id="location"
            v-model="clickedBranch.location"
            class="form-control"
            :class="{
              'error-feild': isSubmitted && $v.clickedBranch.location.$error
            }"
          />
          <div
            v-if="isSubmitted && !$v.clickedBranch.location.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
            v-if="isSubmitted && !$v.clickedBranch.location.minLength"
            class="invalid-feedback"
          >
            {{ msg_min_length }}
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
          <label>رقم الهاتف</label>
          <input
                  id="phone"
                  v-model="clickedBranch.phone"
                  class="form-control"
                  :class="{
              'error-feild': isSubmitted && $v.clickedBranch.phone.$error
            }"
          />
          <div
                  v-if="isSubmitted && !$v.clickedBranch.phone.required"
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
          <label>الموظف الحالي</label>
          <input
                  disabled
                  class="form-control"
                  type="text"
                  v-model="oldUser.email"
          />
        </div>

        <div class="form-group">
          <div class="style-chooser">
            <v-select
              dir="rtl"
              label="email"
              :filterable="false"
              :options="users.data"
              v-model="clickedBranch.user"
              placeholder="اختر موظف إذا كنت ترغب بتغييره"
              :reduce="username => username.id"
              @search="onSearch"
            >
              <template slot="no-options">
                ابحث عن الموظف المطلوب..
              </template>
              <template slot="user" slot-scope="user">
                <div class="d-center">
                  {{ user.username }}
                </div>
              </template>
              <template slot="selected-user" slot-scope="user">
                <div class="selected d-center">
                  {{ user.username }}
                </div>
              </template>
            </v-select>
          </div>
          <div
            v-for="(error, i) in errors.user"
            :key="i"
            class="invalid-feedback"
          >
            {{ error }}
          </div>
        </div>

        <!--<div class="form-group">
          <label>البريد الالكتروني</label>
          <input
            id="email"
            v-model="clickedBranch.email"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group">
          <label>رقم الهاتف</label>
          <input
            id="phone"
            v-model="clickedBranch.phone"
            class="form-control"
            type="text"
            value=""
          />
        </div>-->

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
import { minLength, required } from "vuelidate/lib/validators";
import localVar, {BRANCHES_API, USERS_API} from "../../LocalVar";
import { HTTP } from "../../http-common";

export default {
  name: "Branch",
  data: function() {
    return {
      users: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      clickedBranch: {
        name: "",
        location: "",
        phone: "",
        company: "",
        user: undefined
      },
      oldUser: {
        name: "",
        email: "",
        id: ""
      },
      isSubmitted: false,
      errors: {
        name: [],
        location: [],
        user: [],
        phone: []
      },
      msg_req: localVar.get_msg_req(),
      msg_min_length: localVar.get_msg_min_length(4),
      isLoading: false
    };
  },
  async mounted() {
    await this.getBranch();
  },
  validations: {
    clickedBranch: {
      name: {
        required,
        minLength: minLength(4)
      },
      location: {
        required,
        minLength: minLength(4)
      },
      phone: {
        required
      }
    }
  },
  methods: {
    onSearch(search, loading) {
      if (search) {
        this.search(loading, search, this);
      }
    },
    search(loading, search /*, vm*/) {
      this.getAllUser(search);
    },
    getUser() {
      HTTP
              .get(USERS_API + "/" + this.clickedBranch.user)
              .then(res => {
                console.log(res);

                this.oldUser = res.data.data[0];
              })
              .catch(() => {
                console.log("handle server error from here");
              });
    },
    getAllUser(search) {
      HTTP.get("employeeSearchEmail?email=" + search)
        .then(res => {
          console.log(res);

          this.users = res.data;
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },
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

          this.updateBranch();
        }
      });
    },
    getBranch() {
      this.isLoading = true;
      HTTP.get(BRANCHES_API + "/" + this.$route.params.branchID)
        .then(res => {
          console.log(res);

          this.clickedBranch = res.data.data[0];
          this.isLoading = false;
          this.getUser();
          this.clickedBranch.user = this.oldUser.id;
        })
        .catch(() => {
          console.log("handle server error from here");
        });

    },
    updateBranch() {
      console.log(this.clickedBranch)
      if(this.clickedBranch.user===""){
        this.clickedBranch.user = this.oldUser.id;
      }
      HTTP.put(
        BRANCHES_API + "/" + this.$route.params.branchID,
        this.clickedBranch
      )
        .then(res => {
          this.$swal.fire({
            icon: "success",
            title: "تم تحديث الفرع بنجاح!",
            cancelButtonText: "إغلاق",
            showConfirmButton: false,
            showCancelButton: true
            // timer: 1500
          });
          console.log(res);

          this.$router.push({ name: "Branches" });
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    }
  }
};
</script>
