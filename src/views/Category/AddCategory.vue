<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">إضافة صنف جديد</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->
    <div class="content-block">
      <h1>
        <i class="fa fa-plus block-icon" aria-hidden="true"></i>اضافة صنف جديد
      </h1>

      <form
        @submit.prevent="handleSubmit"
        class="custom-form user-profile-form d-flex flex-wrap"
      >
        <div class="form-group">
          <label>اسم الصنف</label>
          <input
            class="form-control"
            v-model="newCategory.name"
            title="cat-title"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.newCategory.name.$error
            }"
          />
          <div
            v-if="isSubmitted && !$v.newCategory.name.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
            v-if="isSubmitted && !$v.newCategory.name.minLength"
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

        <div class="form-group change-pass">
          <p>هل هو صنف رئيسي؟</p>
          <toggle-button
                  v-model="isMainCategory"
                  :labels="{ checked: 'لا', unchecked: 'نعم' }"
                  :width="55"
                  :height="25"
          />
        </div>
        <!--<div class="form-group">
          <label>التوصيف</label>
          <textarea
            class="form-control"
            v-model="newCategory.description"
            title="cat-details"
          ></textarea>
        </div>-->
        <div v-if="!isMainCategory" class="form-group">
          <div class="style-chooser">
            <v-select
              dir="rtl"
              label="name"
              :filterable="false"
              :options="categories.data"
              v-model="newCategory.parent_id"
              placeholder="اختر مستوى لهذا الصنف"
              :reduce="name => name.id"
              @search="onSearch"
            >
              <template slot="no-options">
                ابحث عن الصنف المطلوب..
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
            v-for="(error, i) in errors.parent_id"
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
import localVar, { CATEGORIES_API } from "../../LocalVar";
import { HTTP } from "../../http-common";
import { minLength, required } from "vuelidate/lib/validators";

export default {
  name: "AddCategory",
  data: function() {
    return {
      categories: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      newCategory: {
        name: "",
        //description: "",
        parent_id: "null"
      },
      isMainCategory: true,
      isSubmitted: false,
      errors: {
        name: [],
        parent_id: []
      },
      msg_req: localVar.get_msg_req(),
      msg_min_length: localVar.get_msg_min_length(4)
    };
  },
  validations: {
    newCategory: {
      name: {
        required,
        minLength: minLength(4)
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

          this.addNewCategory();
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
    addNewCategory() {
      HTTP.post(CATEGORIES_API, this.newCategory)
        .then(res => {
          this.$swal.fire({
            icon: "success",
            title: "تمت إضافة الفئة بنجاح!",
          });
          this.$router.push({ name: "Categories" });
          console.log(res.data);
        })
        .catch(() => {
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
