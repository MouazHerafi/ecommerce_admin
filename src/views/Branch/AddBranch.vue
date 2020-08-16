<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">إضافة فرع جديد</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1>
        <i class="fa fa-plus block-icon" aria-hidden="true"></i>إضافة فرع جديد
      </h1>

      <form
        @submit.prevent="handleSubmit"
        class="custom-form user-profile-form d-flex flex-wrap"
      >
        <div class="form-group">
          <label>اسم الفرع</label>
          <input
            id="name"
            v-model="newBranch.name"
            class="form-control"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.newBranch.name.$error
            }"
          />
          <div
            v-if="isSubmitted && !$v.newBranch.name.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
            v-if="isSubmitted && !$v.newBranch.name.minLength"
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
            v-model="newBranch.location"
            class="form-control"
            :class="{
              'error-feild': isSubmitted && $v.newBranch.location.$error
            }"
          />
          <div
            v-if="isSubmitted && !$v.newBranch.location.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
            v-if="isSubmitted && !$v.newBranch.location.minLength"
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
                  v-model="newBranch.phone"
                  class="form-control"
                  :class="{
              'error-feild': isSubmitted && $v.newBranch.phone.$error
            }"
          />
          <div
                  v-if="isSubmitted && !$v.newBranch.phone.required"
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
        <!--<div class="form-group">
          <label>البريد الالكتروني</label>
          <input
            id="email"
            v-model="newBranch.email"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group">
          <label>رقم الهاتف</label>
          <input
            id="phone"
            v-model="newBranch.phone"
            class="form-control"
            type="text"
            value=""
          />
        </div>-->

        <div class="form-group">
          <div class="style-chooser">
            <v-select
              dir="rtl"
              label="email"
              :filterable="false"
              :options="users.data"
              v-model="newBranch.user_id"
              placeholder="اختر موظف لهذا الفرع"
              :reduce="username => username.id"
              @search="onSearch"
              :class="{
                'error-feild': isSubmitted && $v.newBranch.user_id.$error
              }"
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
            v-if="isSubmitted && !$v.newBranch.user_id.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
            v-for="(error, i) in errors.user_id"
            :key="i"
            class="invalid-feedback"
          >
            {{ error }}
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
import localVar, { BRANCHES_API } from "../../LocalVar";
import { HTTP } from "../../http-common";
import { minLength, required } from "vuelidate/lib/validators";

export default {
  name: "AddBranch",
  data: function() {
    return {
      users: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      newBranch: {
        name: "",
        location: "",
        //email: "",
        phone: "",
        company_id: Number.parseInt(this.$route.params.id, 10),
        user_id: undefined
      },
      isSubmitted: false,
      errors: {
        name: [],
        location: [],
        phone: [],
        user_id: []
      },
      msg_req: localVar.get_msg_req(),
      msg_min_length: localVar.get_msg_min_length(4)
    };
  },
  validations: {
    newBranch: {
      name: {
        required,
        minLength: minLength(4)
      },
      location: {
        required
      },
      phone: {
        required
      },
      user_id: {
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

          this.addNewBranch();
        }
      });
    },
    onSearch(search, loading) {
      if (search) {
        this.search(loading, search, this);
      }
    },
    search(loading, search /*, vm*/) {
      this.getAllUser(search);
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
    addNewBranch() {
      console.log(this.newBranch);
      HTTP.post(BRANCHES_API, this.newBranch)
        .then(res => {
          this.$swal.fire({
            icon: "success",
            title: "تمت إضافة الفرع بنجاح!",
            cancelButtonText: "إغلاق",
            showConfirmButton: false,
            showCancelButton: true
            // timer: 1500
          });
          console.log(res);
          this.$router.push({ name: "Branches" });
        })
        .catch(error => {
          console.log(error);
          console.log("handle server error from here");
        });
    }
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
