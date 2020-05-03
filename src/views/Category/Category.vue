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

      <form class="custom-form user-profile-form d-flex flex-wrap">
        <div class="form-group">
          <label>اسم الفئة</label>
          <input
            id="name"
            v-model="clickedCategory.name"
            class="form-control"
            type="text"
            value=""
          />
        </div>
        <div class="form-group">
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
        </div>

        <div class="form-group">
          <a class="btn btn-primary" @click="updateCategory()">تحديث</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import localVar from "../../LocalVar";

export default {
  name: "Category",
  data: function() {
    return {
      clickedCategory: {
        name: "",
        //description: "123",
        parent: ""
      }
    };
  },
  async mounted() {
    await this.getCategory();
  },
  methods: {
    getCategory() {
      console.log(this.$route.params.CatID);
      this.$axios
        .get(
          localVar.get_api_address() + "categories/" + this.$route.params.CatID
        )
        .then(res => {
          console.log(res);

          this.clickedCategory = res.data.data;
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },

    updateCategory() {
      console.log(this.clickedCategory);
      this.$axios
        .put(
          localVar.get_api_address() + "categories/" + this.$route.params.CatID,
          this.clickedCategory
        )
        .then(res => {
          console.log(res);

          // this.$router.push({ name: "Categories" });
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    }
  }
};
</script>
