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

      <loading
              :active.sync="showLoader"
              :is-full-page="false"
              color="#ef3e58"
      ></loading>

      <div class="table-op clearfix">
        <span v-if="!showLoader" class="float-right">
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


      <div v-if="!showLoader" class="list-group">
        <tree
          v-for="(category, i) in categories.data"
          :key="i"
          :tree-data="category"
          @edit="editCategory"
          @delete="deleteCategory"
        />
      </div>

      <Pagination v-if="!showLoader"
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
  import {CATEGORIES_API} from "../../LocalVar";
import Pagination from "../../components/Pagination/Pagination";
import Tree from "../../components/TreeView/Tree.vue";
  import {HTTP} from "../../http-common";

export default {
  name: "Categories",
  components: {
    Pagination,
    Tree
  },
  data: function() {
    return {
     /* categories: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },*/
      offset: 4,
      isLoading: false
    };
  },
  computed: {
    categories () {
      return this.$store.getters.allCategories;
    },
    showLoader() {
      return this.$store.getters.showLoader;
    }
  },
  async mounted() {
    await this.getMainCategory();
  },
  methods: {
    getMainCategory() {
      this.$store.dispatch('allCategories',this.categories.current_page);
    },
    /*getMainCategory() {
      this.isLoading = true;
      HTTP
        .get(
                CATEGORIES_API +
            "?page=" +
            this.categories.current_page
        )
        .then(res => {
          console.log(res);

          this.categories = res.data;
          this.isLoading = false;
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },*/
    deleteCategory(categoryID) {
      this.$swal.fire({
        title: 'هل أنت متأكد؟',
        text: "سيتم حذف هذه الفئة!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'لا',
        confirmButtonText: 'نعم, أريد حذفه'
      }).then((result) => {
        if (result.value) {
          HTTP
                  .delete(CATEGORIES_API+ "/" + categoryID)
                  .then(res => {
                    console.log(res);
                    this.$swal.fire({
                              icon: "success",
                              title:'تم حذف الفئة بنجاح!'
                            }
                    )
                    this.getMainCategory();
                  })
                  .catch(() => {
                    console.log("handle server error from here");
                  });
        }
      })

    },
    editCategory(categoryID) {
      this.$router.push({ name: "Category", params: { CatID: categoryID } });
    }
  }
};
</script>
