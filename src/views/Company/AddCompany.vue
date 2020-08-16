<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">إضافة شركة جديدة</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1>
        <i class="fa fa-plus block-icon" aria-hidden="true"></i>إضافة شركة جديدة
      </h1>

      <form
        @submit.prevent="handleSubmit"
        class="custom-form user-profile-form d-flex flex-wrap"
      >
        <div class="form-group">
          <label>اسم الشركة</label>
          <input
            id="name"
            v-model="newCompany.name"
            class="form-control"
            :class="{
              'error-feild': isSubmitted && $v.newCompany.name.$error
            }"
            type="text"
          />
          <div
            v-if="isSubmitted && !$v.newCompany.name.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
            v-if="isSubmitted && !$v.newCompany.name.minLength"
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
          <textarea id="description" class="form-control" />
        </div>
        <div class="form-group">
          <label>البريد الالكتروني</label>
          <input id="email" class="form-control" type="text" value="" />
        </div>-->

        <div class="form-group">
          <label>رقم الهاتف</label>
          <input
            id="phone"
            v-model="newCompany.phone"
            class="form-control"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.newCompany.phone.$error
            }"
          />
          <div
            v-if="isSubmitted && !$v.newCompany.phone.required"
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
          <div class="style-chooser">
            <v-select
                    dir="rtl"
                    label="name"
                    :filterable="false"
                    :options="categories.data"
                    v-model="newCompany.category_id"
                    placeholder="اختر اختصاص الشركة"
                    :reduce="name => name.id"
                    @search="onSearch"
                    :class="{
                'error-feild': isSubmitted && $v.newCompany.category_id.$error
              }"
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
                  v-if="isSubmitted && !$v.newCompany.category_id.required"
                  class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
                  v-for="(error, i) in errors.category_id"
                  :key="i"
                  class="invalid-feedback"
          >
            {{ error }}
          </div>
        </div>
        <div class="form-group">
        <label>
          <i class="fa fa-image block-icon" aria-hidden="true"></i>شعار الشركة
        </label>
        </div>
        <div class="form-group custom-file-upload">

          <img v-if="logoPreview!==null"
            class="custom-file-upload-image"
            :src=[logoPreview]
            alt=""
          />
          <input
                  v-if="logoPreview===null"
            class="form-control"
            v-on:change="onChangeFileUpload"
            type="file"
            id="file"
            accept="image/jpg , image/png, image/jpeg, image/bmp"
          />
          <label v-if="logoPreview===null" for="file" class="custom-file-upload-label">
            <i class="fa fa-plus m-auto" aria-hidden="true"></i>
          </label>
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
import { MESSAGE_ERROR, HTTP } from "../../http-common";
import localVar, { COMPANIES_API } from "../../LocalVar";
import { minLength, required } from "vuelidate/lib/validators";
export default {
  name: "AddCompany",
  data: function() {
    return {
      categories: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      msg_req: localVar.get_msg_req(),
      msg_min_length: localVar.get_msg_min_length(4),
      newCompany: {
        name: "",
        // description: "",
        // email: "",
        phone: "",
        category_id:"",
        logo: undefined
      },
      logoPreview:null,
      isSubmitted: false,
      errors: {
        name: [],
        phone: [],
        category_id: []
      }
    };
  },
  validations: {
    newCompany: {
      name: {
        required,
        minLength: minLength(4)
      },
      phone: {
        required
      },
      category_id: {
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
          let formData = new FormData();
          formData.append('name', this.newCompany.name);
          formData.append('phone', this.newCompany.phone);
          formData.append('category_id', this.newCompany.category_id);
          formData.append('logo', this.newCompany.logo);
          this.addNewCompany(formData);
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
    addNewCompany(formData) {

      HTTP.post(COMPANIES_API, formData)
        .then(res => {
          this.$swal.fire({
            icon: "success",
            title: "تمت إضافة الشركة بنجاح!"
          });
          this.$router.push({ name: "Companies" });
          console.log(res.data);
        })
        .catch(error => {
          this.errors = error.data.errors;
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: MESSAGE_ERROR
          });
        });
    },
    onChangeFileUpload(event){
      this.newCompany.logo = event.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(this.newCompany.logo);
      reader.onload = e =>{
        this.logoPreview = e.target.result;
      };
    }
  }
};
</script>
