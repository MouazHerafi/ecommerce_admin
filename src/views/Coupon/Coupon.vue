<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">الحسم</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1><i class="fa fa-user block-icon" aria-hidden="true"></i>الحسم</h1>

      <form class="custom-form user-profile-form d-flex flex-wrap">
        <div class="form-group">
          <label>كود الحسم</label>
          <input
            id="code"
            v-model="clickedCoupon.code"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group">
          <label>قيمة الحسم</label>
          <input
            id="discountRate"
            v-model="clickedCoupon.discountRate"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group btn-submit">
          <a class="btn btn-primary" @click="updateCoupon()">
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
  name: "Coupon",
  data: function() {
    return {
      clickedCoupon: {
        code: "",
        discountRate: ""
      }
    };
  },
  async mounted() {
    await this.getCoupon();
  },
  methods: {
    getCoupon() {
      console.log(this.$route.params.CouponID);
      this.$axios
        .get(
          localVar.get_api_address() + "coupons/" + this.$route.params.CouponID
        )
        .then(res => {
          console.log(res);

          this.clickedCoupon = res.data.data;
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },

    updateCoupon() {
      console.log(this.clickedCoupon);
      this.$axios
        .put(
          localVar.get_api_address() + "coupons/" + this.$route.params.CouponID,
          this.clickedCoupon
        )
        .then(res => {
          console.log(res);

          //this.$router.push({ name: "Coupons" });
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    }
  }
};
</script>

<style scoped></style>
