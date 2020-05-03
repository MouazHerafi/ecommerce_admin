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

      <form class="custom-form user-profile-form d-flex flex-wrap">
        <div class="form-group">
          <label>اسم الشركة</label>
          <input
            id="name"
            v-model="newCompany.name"
            class="form-control"
            type="text"
            value=""
          />
        </div>
        <div class="form-group">
          <label>وصف عن الشركة</label>
          <textarea id="description" class="form-control" />
        </div>
        <div class="form-group">
          <label>البريد الالكتروني</label>
          <input id="email" class="form-control" type="text" value="" />
        </div>

        <div class="form-group">
          <label>رقم الهاتف</label>
          <input
            id="phone"
            v-model="newCompany.phone"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group">
          <a class="btn btn-primary" @click="addNewCompany()">
            تأكيد
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import localVar from "../../LocalVar";
export default {
  name: "AddCompany",
  data: function() {
    return {
      newCompany: {
        name: "",
        // description: "",
        // email: "",
        phone: ""
      }
    };
  },
  methods: {
    addNewCompany() {
      console.log(this.newCompany);
      this.$axios
        .post(localVar.get_api_address() + "companies/", this.newCompany)
        .then(res => {
          //this.$router.push({ name: "Companies" });
          console.log(res.data);
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    }
  }
};
</script>
