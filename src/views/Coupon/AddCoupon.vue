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

      <form
        @submit.prevent="handleSubmit"
        class="custom-form user-profile-form d-flex flex-wrap"
      >
        <div class="form-group">
          <label>كود الحسم</label>
          <input
            id="code"
            v-model="newCoupon.code"
            class="form-control"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.newCoupon.code.$error
            }"
          />
          <div
            v-if="isSubmitted && !$v.newCoupon.code.minLength"
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
            v-model="newCoupon.discountRate"
            class="form-control"
            type="text"
            :class="{
              'error-feild': isSubmitted && $v.newCoupon.discountRate.$error
            }"
          />
          <div
            v-if="isSubmitted && !$v.newCoupon.discountRate.required"
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
import localVar, { COUPON_API } from "../../LocalVar";
import { minLength, required } from "vuelidate/lib/validators";
import { HTTP, MESSAGE_ERROR } from "../../http-common";
export default {
  name: "AddCoupon",
  data: function() {
    return {
      newCoupon: {
        code: "",
        discountRate: ""
      },
      isSubmitted: false,
      errors: {
        code: [],
        discountRate: []
      },
      msg_req: localVar.get_msg_req(),
      msg_min_length: localVar.get_msg_min_length(6)
    };
  },
  validations: {
    newCoupon: {
      code: {
        minLength: minLength(6)
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

          this.addNewCoupon();
        }
      });
    },
    addNewCoupon() {
      console.log(this.newCoupon);
      HTTP.post(COUPON_API, this.newCoupon)
        .then(res => {
          this.$swal.fire({
            icon: "success",
            title: "تمت إضافة الحسم بنجاح!",
          });
          console.log(res.data);
          this.$router.push({ name: "Coupons" });
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: MESSAGE_ERROR
          });
        });
    }
  }
};
</script>

<style scoped></style>
