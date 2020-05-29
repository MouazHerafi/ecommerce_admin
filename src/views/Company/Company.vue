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

      <form class="custom-form user-profile-form d-flex flex-wrap">
        <div class="form-group">
          <label>اسم الشركة</label>
          <input
            id="name"
            v-model="clickedCompany.name"
            class="form-control"
            type="text"
            value=""
          />
        </div>
        <div class="form-group">
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
        </div>

        <div class="form-group">
          <label>رقم الهاتف</label>
          <input
            id="phone"
            v-model="clickedCompany.phone"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group">
          <a class="btn btn-primary" @click="updateCompany()">
            تحديث
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import localVar from "../../LocalVar";
export default {
  name: "Company",
  data: function() {
    return {
      clickedCompany: {
        name: "",
        //description: "",
        // email: "",
        phone: ""
      }
    };
  },
  async mounted() {
    await this.getCompany();
  },
  methods: {
    getCompany() {
      console.log(this.$route.params.id);
      this.$axios
        .get(localVar.get_api_address() + "companies/" + this.$route.params.id)
        .then(res => {
          console.log(res);

          this.clickedCompany = res.data.data;
        }).catch(() => {
        console.log("handle server error from here");
      });
    },

    updateCompany() {
      console.log(this.clickedCompany);
      this.$axios
        .put(
          localVar.get_api_address() + "companies/" + this.$route.params.id,
          this.clickedCompany
        )
        .then(res => {
          console.log(res);

          //this.$router.push({ name: "Companies" });
        }).catch(() => {
        console.log("handle server error from here");
      });
    }
  }
};
</script>
