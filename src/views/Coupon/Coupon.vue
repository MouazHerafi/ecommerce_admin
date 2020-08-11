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

      <loading
              :active.sync="isLoading"
              :is-full-page="false"
              color="#ef3e58"
      ></loading>

      <form v-if="!isLoading" @submit.prevent="handleSubmit" class="custom-form user-profile-form d-flex flex-wrap">
        <div class="form-group">
          <label>كود الحسم</label>
          <input
            id="code"
            v-model="clickedCoupon.code"
            class="form-control"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.clickedCoupon.code.$error
            }"
          />
          <div
                  v-if="isSubmitted && !$v.clickedCoupon.code.minLength"
                  class="invalid-feedback"
          >
            {{ msg_min_length }}
          </div>
          <div
                  v-for="(error, i) in errors.code"
                  :key="i"
                  class="invalid-feedback"
          >
            {{ error }}
          </div>
        </div>

        <div class="form-group">
          <label>قيمة الحسم</label>
          <input
            id="discountRate"
            v-model="clickedCoupon.discountRate"
            class="form-control"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.clickedCoupon.discountRate.$error
            }"
          />
          <div
                  v-if="isSubmitted && !$v.clickedCoupon.discountRate.required"
                  class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
                  v-for="(error, i) in errors.discountRate"
                  :key="i"
                  class="invalid-feedback"
          >
            {{ error }}
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
  import { COUPON_API} from "../../LocalVar";
import {minLength, required} from "vuelidate/lib/validators";
  import {HTTP} from "../../http-common";
export default {
  name: "Coupon",
  data: function() {
    return {
      clickedCoupon: {
        code: "",
        discountRate: ""
      },
      isSubmitted: false,
      errors: {
        code: [],
        discountRate: []
      },
      isLoading: false
    };
  },
  async mounted() {
    await this.getCoupon();
  },
  validations: {
    clickedCoupon: {
      code: {
        minLength: minLength(4)
      },
      discountRate: {
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

          this.updateCoupon();
        }
      });
    },
    getCoupon() {
      this.isLoading = true;
      HTTP.get(COUPON_API + "/" + this.$route.params.CouponID)
              .then(res => {
                console.log(res);

                this.clickedCoupon = res.data.data;
                this.isLoading = false;
              })
              .catch(() => {
                console.log("handle server error from here");
              });
    },
    updateCoupon() {
      HTTP.put(COUPON_API + "/" + this.$route.params.CouponID, this.clickedCoupon)
              .then(res => {
                this.$swal.fire({
                  icon: "success",
                  title: "تم تحديث الحسم بنجاح!",
                });
                console.log(res);
                this.$router.push({ name: "Coupons" });
              })
              .catch(() => {
                console.log("handle server error from here");
              });
    },
  }
};
</script>

<style scoped></style>
