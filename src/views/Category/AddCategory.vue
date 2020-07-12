<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">إضافة فئة جديدة</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->
    <div class="content-block">
      <h1>
        <i class="fa fa-plus block-icon" aria-hidden="true"></i>اضافة فئة جديد
      </h1>

      <form
              @submit.prevent="addNewCategory"
              class="custom-form user-profile-form d-flex flex-wrap">
        <div class="form-group">
          <label>اسم الفئة</label>
          <input
            class="form-control"
            v-model="newCategory.name"
            title="cat-title"
            type="text"
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
        <div class="form-group">
          <!--<label>مستوى الفئة</label>
          <select id="level" class="form-control" v-model="newCategory.level">
            <option v-for="cat in levelsCategory" :value="cat.id" :key="cat.id">
              {{ cat.name }}
            </option>
          </select>-->
          <div class="style-chooser">
            <v-select
                    dir="rtl"
                    label="name"
                    :filterable="false"
                    :options="categories.data"
                    v-model="newCategory.parent_id"
                    placeholder="اختر مستوى لهذه الفئة"
                    :reduce="name => name.id"
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
import localVar from "../../LocalVar";
import {HTTP} from "../../http-common";

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
        parent_id: ""
      }
    };
  },
  methods: {
    onSearch(search, loading) {
      if(search){this.search(loading, search, this);}
    },
    search(loading, search /*, vm*/) {
      this.getAllCategories(escape(search));

      /* fetch(
              `https://api.github.com/search/repositories?q=${escape(search)}`
      ).then(res => {
        res.json().then(json => (vm.options = json.items));
        loading(false);
      });*/
    },
    getAllCategories(search) {
      HTTP
              .get("v1/categorySearch?name=" + search
              )
              .then(res => {
                console.log(res);

                this.categories = res.data;
              })
              .catch(() => {
                console.log("handle server error from here");
              });
    },
    addNewCategory() {
      console.log(this.newCategory);
      this.$axios
        .post(localVar.get_api_address() + "categories/", this.newCategory)
        .then(res => {
          //this.$router.push({ name: "Categories" });
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