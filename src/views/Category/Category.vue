<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">ملف الفئة</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1><i class="fa fa-user block-icon" aria-hidden="true"></i>ملف الفئة</h1>

      <loading
        :active.sync="isLoading"
        :is-full-page="false"
        color="#ef3e58"
      ></loading>

      <form
        @submit.prevent="handleSubmit"
        class="custom-form user-profile-form d-flex flex-wrap"
      >
        <div class="form-group">
          <label>اسم الفئة</label>
          <input
            id="name"
            v-model="clickedCategory.name"
            class="form-control"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.clickedCategory.name.$error
            }"
          />
          <div
            v-if="isSubmitted && !$v.clickedCategory.name.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
            v-if="isSubmitted && !$v.clickedCategory.name.minLength"
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
          <div class="style-chooser">
            <v-select
              dir="rtl"
              label="name"
              :filterable="false"
              :options="categories.data"
              v-model="clickedCategory.parent_id"
              placeholder="اختر مستوى لهذه الفئة"
              :reduce="name => name.id"
              @search="onSearch"
              :class="{
                'error-feild':
                  isSubmitted && $v.clickedCategory.parent_id.$error
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
            v-if="isSubmitted && !$v.clickedCategory.parent_id.required"
            class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
            v-for="(error, i) in errors.parent_id"
            :key="i"
            class="invalid-feedback"
          >
            {{ error }}
          </div>
        </div>
        <!--<div class="form-group">
          <label>التوصيف</label>
          <textarea
            class="form-control"
            v-model="clickedCategory.description"
            title="cat-details"
          ></textarea>
        </div>
        <div class="form-group">
          <label>مستوى الفئة</label>
          <select
            id="level"
            class="form-control"
            v-model="clickedCategory.parent"
          >
          </select>
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
import localVar, { CATEGORIES_API } from "../../LocalVar";
import { minLength, required } from "vuelidate/lib/validators";
import { HTTP } from "../../http-common";

export default {
  name: "Category",
  data: function() {
    return {
      categories: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      clickedCategory: {
        name: "",
        //description: "123",
        parent: ""
      },
      isSubmitted: false,
      errors: {
        name: [],
        parent_id: []
      },
      msg_req: localVar.get_msg_req(),
      msg_min_length: localVar.get_msg_min_length(4),
      isLoading: false
    };
  },
  async mounted() {
    await this.getCategory();
  },
  validations: {
    clickedCategory: {
      name: {
        required,
        minLength: minLength(4)
      },
      parent_id: {
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

          this.updateCategory();
        }
      });
    },
    onSearch(search, loading) {
      if (search) {
        this.search(loading, search, this);
      }
    },
    search(loading, search /*, vm*/) {
      this.getAllCategories(escape(search));
    },
    getAllCategories(search) {
      HTTP.get("v1/categorySearch?name=" + search)
        .then(res => {
          console.log(res);

          this.categories = res.data;
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },
    getCategory() {
      this.isLoading = true;
      HTTP.get(CATEGORIES_API + "/" + this.$route.params.CatID)
        .then(res => {
          console.log(res);

          this.clickedCategory = res.data.data;
          this.isLoading = false;
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },

    updateCategory() {
      console.log(this.clickedCategory);
      HTTP.put(
        CATEGORIES_API + "/" + this.$route.params.CatID,
        this.clickedCategory
      )
        .then(res => {
          this.$swal.fire({
            icon: "success",
            title: "تم تحديث الفئة بنجاح!",
          });
          console.log(res);

          this.$router.push({ name: "Categories" });
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    }
  }
};
</script>
