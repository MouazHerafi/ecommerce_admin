<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">إضافة صفة جديدة</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1>
        <i class="fa fa-plus block-icon" aria-hidden="true"></i>إضافة صفة جديدة
      </h1>

      <form
              @submit.prevent="handleSubmit"
              class="custom-form user-profile-form d-flex flex-wrap">
        <div class="form-group">
          <label>اسم الصفة</label>
          <input
            id="attribute"
            v-model="newAttribute.name"
            class="form-control"
            :class="{
              'error-feild': isSubmitted && $v.newAttribute.name.$error
            }"
            type="text"
            value=""
          />
          <div
                  v-if="isSubmitted && !$v.newAttribute.name.required"
                  class="invalid-feedback"
          >
            {{ msg_req }}
          </div>
          <div
                  v-if="isSubmitted && !$v.newAttribute.name.minLength"
                  class="invalid-feedback"
          >
            {{ msg_min_length }}
          </div>
          <div
                  v-for="(error, i) in errors.name"
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
import localVar, { ATTRIBUTE_API } from "../LocalVar";
import { HTTP } from "../http-common";
import {minLength, required} from "vuelidate/lib/validators";

export default {
  name: "NewAttribute",
  data: function() {
    return {
      msg_req: localVar.get_msg_req(),
      msg_min_length: localVar.get_msg_min_length(4),
      newAttribute: {
        name: ""
      },
      isSubmitted: false,
      errors: {
        name: []
      }
    };
  },
  validations: {
    newAttribute: {
      name: {
        required,
        minLength: minLength(4)
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

          this.addNewAttribute();
        }
      });
    },
    addNewAttribute() {
      console.log(this.newAttribute);
      HTTP.post(ATTRIBUTE_API, this.newAttribute)
        .then(res => {
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
