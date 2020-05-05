<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">إضافة حسم جديد</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1>
        <i class="fa fa-plus block-icon" aria-hidden="true"></i>إضافة حسم جديد
      </h1>

      <form class="custom-form user-profile-form d-flex flex-wrap">
        <div class="form-group">
          <label>كود الحسم</label>
          <input
            id="code"
            v-model="newCoupon.code"
            class="form-control"
            type="text"
            value=""
          />
        </div>
        <div class="form-group">
          <label>قيمة الحسم</label>
          <input
            id="discountRate"
            v-model="newCoupon.discountRate"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group btn-submit">
          <a class="btn btn-primary" @click="addNewCoupon()">
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
  name: "AddCoupon",
  data: function() {
    return {
      newCoupon: {
        code: "",
        discountRate: ""
      }
    };
  },
  methods: {
    addNewCoupon() {
      console.log(this.newCoupon);
      this.$axios
        .post(localVar.get_api_address() + "coupons/", this.newCoupon)
        .then(res => {
          //this.$router.push({ name: "Coupons" });
          console.log(res.data);
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    }
  }
};
</script>

<style scoped></style>
