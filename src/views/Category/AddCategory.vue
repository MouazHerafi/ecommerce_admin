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

      <form class="custom-form user-profile-form d-flex flex-wrap">
        <div class="form-group">
          <label>اسم الفئة</label>
          <input
            class="form-control"
            v-model="newCategory.name"
            title="cat-title"
            type="text"
          />
        </div>
        <div class="form-group">
          <label>التوصيف</label>
          <textarea
            class="form-control"
            v-model="newCategory.description"
            title="cat-details"
          ></textarea>
        </div>
        <div class="form-group">
          <label>مستوى الفئة</label>
          <select id="level" class="form-control" v-model="newCategory.level">
            <option v-for="cat in levelsCategory" :value="cat.id" :key="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click="addNewCategory()">
            تأكيد
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import localVar from "../../LocalVar";

export default {
  name: "AddCategory",
  data: function() {
    return {
      newCategory: {
        name: "",
        description: "",
        parent: ""
      },
      levelsCategory: [
        {
          id: 1,
          name: "الالكترونيات"
        },
        {
          id: 2,
          name: "الموضة"
        }
      ]
    };
  },
  methods: {
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
