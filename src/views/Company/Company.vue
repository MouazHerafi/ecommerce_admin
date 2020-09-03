<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">ملف الشركة</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1>
        <i class="fa fa-building block-icon" aria-hidden="true"></i>ملف الشركة
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
          <label>اسم الشركة</label>
          <input
            id="name"
            v-model="clickedCompany.name"
            class="form-control"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.clickedCompany.name.$error
            }"
          />
          <div
            v-if="isSubmitted && !$v.clickedCompany.name.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
            v-if="isSubmitted && !$v.clickedCompany.name.minLength"
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
        <!--<div class="form-group">
          <label>وصف عن الشركة</label>
          <textarea
            id="description"
            v-model="clickedCompany.name"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>البريد الالكتروني</label>
          <input
            id="email"
            v-model="clickedCompany.name"
            class="form-control"
            type="text"
            value=""
          />
        </div>-->

        <div class="form-group">
          <label>رقم الهاتف</label>
          <input
            id="phone"
            v-model="clickedCompany.phone"
            class="form-control"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.clickedCompany.phone.$error
            }"
          />
          <div
            v-if="isSubmitted && !$v.clickedCompany.phone.required"
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
          <label>اختصاص الشركة الحالي</label>
          <input
                  disabled
                  class="form-control"
                  type="text"
                  v-model="oldCategory.name"
          />
        </div>

        <div class="form-group">
          <div class="style-chooser">
            <v-select
                    dir="rtl"
                    label="name"
                    :filterable="false"
                    :options="categories.data"
                    v-model="clickedCompany.category.id"
                    placeholder="اختر اختصاص الشركة إذا كنت ترغب بتغييره"
                    :reduce="name => name.id"
                    @search="onSearch"
            >
              <template slot="no-options">
                ابحث عن الفئة المطلوبة..
              </template>
              <template slot="category" slot-scope="category">
                <div class="d-center">
                  {{ category.name }}
                </div>
              </template>
              <template slot="selected-category" slot-scope="category">
                <div class="selected d-center">
                  {{ category.name }}
                </div>
              </template>
            </v-select>
          </div>
          <div
                  v-for="(error, i) in errors.category"
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
  import localVar, {CATEGORIES_API, COMPANIES_API} from "../../LocalVar";
import { HTTP } from "../../http-common";
import { minLength, required } from "vuelidate/lib/validators";
export default {
  name: "Company",
  data: function() {
    return {
      clickedCompany: {
        name: "",
        //description: "",
        // email: "",
        phone: "",
        category:{
          id:"",
          name:""
        }
      },
      categories: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      oldCategory:{
        id:"",
        name:""
      },
      isSubmitted: false,
      errors: {
        name: [],
        phone: [],
        category: []
      },
      msg_req: localVar.get_msg_req(),
      msg_min_length: localVar.get_msg_min_length(4),
      isLoading: false
    };
  },
  async mounted() {
    await this.getCompany();
  },
  validations: {
    clickedCompany: {
      name: {
        required,
        minLength: minLength(4)
      },
      phone: {
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

          this.updateCompany();
        }
      });
    },
    onSearch(search, loading) {
      if (search) {
        this.search(loading, search, this);
      }
    },
    search(loading, search /*, vm*/) {
      this.getAllCategories(search);
    },
    getAllCategories(search) {
      HTTP.get("categorySearch?name=" + search)
              .then(res => {
                this.categories = res.data;
              })
              .catch(() => {
                console.log("handle server error from here");
              });
    },
    getCategory() {
      HTTP.get(CATEGORIES_API + "/" + this.clickedCompany.category.id)
              .then(res => {
                //console.log(res);

                this.oldCategory = res.data.data[0];
              })
              .catch(() => {
                console.log("handle server error from here");
              });
    },
    getCompany() {
      this.isLoading = true;
      HTTP.get(COMPANIES_API + "/" + this.$route.params.companyID)
        .then(res => {
          //console.log(res);

          this.clickedCompany = res.data.data[0];
          this.getCategory();
          this.clickedCompany.category.id = this.oldCategory.id;
          this.isLoading = false;
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },

    updateCompany() {
      //console.log(this.clickedCompany);
      if(this.clickedCompany.category.id===""){
        this.clickedCompany.category.id = this.oldCategory.id;
      }
      let name = this.clickedCompany.name;
      let phone = this.clickedCompany.phone;
      let category_id = this.clickedCompany.category.id;
      let data = {name,phone,category_id};
      console.log(data);
      HTTP.put(COMPANIES_API + "/" + this.$route.params.companyID, data)
        .then(res => {
          this.$swal.fire({
            icon: "success",
            title: "تم تحديث الشركة بنجاح!",
          });
          console.log(res);
          this.$router.push({ name: "Companies" });
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    }
  }
};
</script>
