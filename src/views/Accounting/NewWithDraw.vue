<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">عملية سحب جديدة</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1>
        <i class="fa fa-plus block-icon" aria-hidden="true"></i>عملية سحب جديدة
      </h1>

      <form
          @submit.prevent="handleSubmit"
          class="custom-form user-profile-form d-flex flex-wrap">
        <div class="form-group">
          <label>رقم البطاقة</label>
          <input
              id="number"
              v-model="newWithdraw.barcode"
              class="form-control"
              :class="{
              'error-feild': isSubmitted && $v.newWithdraw.barcode.$error
            }"
              type="text"
              value=""
          />
          <div
              v-if="isSubmitted && !$v.newWithdraw.barcode.required"
              class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
              v-for="(error, i) in errors.barcode"
              :key="i"
              class="invalid-feedback"
          >
            {{ error }}
          </div>
        </div>
        <div class="form-group">
          <label>المبلغ الذي تريد سحبه</label>
          <input
              id="amount"
              v-model="newWithdraw.balance"
              class="form-control"
              :class="{
              'error-feild': isSubmitted && $v.newWithdraw.balance.$error
            }"
              type="text"
              value=""
          />
          <div
              v-if="isSubmitted && !$v.newWithdraw.balance.required"
              class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
              v-for="(error, i) in errors.balance"
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
import localVar, {WITHDRAW_API} from "@/LocalVar";
import {required} from "vuelidate/lib/validators";
import {HTTP} from "@/http-common";

export default {
name: "NewWithDraw",
  data: function() {
    return {
      msg_req: localVar.get_msg_req(),
      newWithdraw: {
        barcode: "",
        balance:""
      },
      isSubmitted: false,
      errors: {
        barcode: [],
        balance: []
      }
    };
  },
  validations: {
    newWithdraw: {
      barcode: {
        required
      },
      balance: {
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

          this.addNewWithdraw();
        }
      });
    },
    addNewWithdraw() {
      console.log(this.newWithdraw);
      HTTP.post(WITHDRAW_API, this.newWithdraw)
          .then(res => {
            this.$swal.fire({
              icon: "success",
              title: "تمت عملية سحب المبلغ بنجاح!"
            });
            this.$router.push({ name: "WithDraw" });
            console.log(res.data);
          })
          .catch(() => {
            console.log("handle server error from here");
          });
    }
  }
}
</script>

<style scoped>

</style>