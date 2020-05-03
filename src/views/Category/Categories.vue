<template>
  <div>
    <!-- محتويات الصفحة -->

    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">الفئات الرئيسية</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1>
        <i class="fa fa-tags block-icon" aria-hidden="true"></i>الفئات الرئيسية
      </h1>

      <div class="table-op clearfix">
        <span class="float-right">
          <span class="input-group">
            <input title="search" type="text" required="required" />
            <button type="submit" class="btn light-btn">بحث</button>
          </span>
        </span>
        <router-link :to="{ name: 'AddCategory' }">
          <button class="btn btn-primary mr-3 float-left">
            إضافة فئة جديدة
          </button>
        </router-link>
      </div>
      <!-- <table class="table table-striped">
         <thead>
           <tr>
             <th>الاسم</th>
             <th>الوصف</th>
             <th>الفئات الفرعية</th>
             <th></th>
           </tr>
         </thead>


           <tr v-for="(category, i) in categories.data" :key="i">
             <td>{{ category.name }}</td>
             <td>{{ category.description }}</td>
             <td>
               <a @click="showSubCategory(category.id)" class="btn btn-sm linkGo"
                 ><i class="material-icons">keyboard_arrow_left</i></a
               >
             </td>

             <td>
               <a class="btn btn-sm delete" title="Delete"
                 ><i class="material-icons">&#xE872;</i></a
               >
             </td>
           </tr>

      </table>-->
      <!--<tree v-for="(category, i) in categories.data" :key="i" :tree-data="category" @edit="editCategory" />-->
      <div class="list-group">
        <tree
          v-for="(category, i) in categories.data"
          :key="i"
          :tree-data="category"
          @edit="editCategory"
          @delete="deleteCategory"
        />
      </div>

      <Pagination
        :pagination="categories"
        @paginate="getMainCategory()"
        :offset="4"
      >
      </Pagination>
    </div>

    <!-- نهائة محتويات الصفحة -->
  </div>
</template>

<script>
import localVar from "../../LocalVar";
import Pagination from "../../components/Pagination/Pagination";
import Tree from "../../components/TreeView/Tree.vue";

export default {
  name: "Categories",
  components: {
    Pagination,
    Tree
  },
  data: function() {
    return {
      categories: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4
    };
  },

  async mounted() {
    await this.getMainCategory();
  },
  methods: {
    getMainCategory() {
      this.$axios
        .get(
          localVar.get_api_address() +
            "categories?page=" +
            this.categories.current_page
        )
        .then(res => {
          console.log(res);

          this.categories = res.data;
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },

    deleteCategory(categoryID) {
      this.$axios
        .delete(localVar.get_api_address() + "categories/" + categoryID)
        .then(res => {
          console.log(res);

          //this.$router.push({ name: "Categories" });
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },
    editCategory(categoryID) {
      this.$router.push({ name: "Category", params: { CatID: categoryID } });
    }
  }
};
</script>
