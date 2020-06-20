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

      <form @submit.prevent="handleSubmit" class="custom-form user-profile-form d-flex flex-wrap">
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
          <button class="btn btn-primary">
            تأكيد
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {MESSAGE_ERROR, HTTP } from "../../http-common";
  import  { COMPANIES_API } from "../../LocalVar";
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
    handleSubmit() {
      this.$swal.fire({
        title: 'هل تريد الاستمرار؟',
        icon: 'question',
        iconHtml: '؟',
        confirmButtonText: 'نعم',
        cancelButtonText: 'لا',
        showCancelButton: true,
        showCloseButton: true,
        preConfirm: () => {
          /*this.isSubmitted = true;
          this.$v.$touch();
          if (this.$v.$invalid) {
            return;
          }*/

          this.addNewCompany();


        }
      })

    }
    ,
    addNewCompany() {
      console.log(this.newCompany);
      HTTP
        .post(COMPANIES_API, this.newCompany)
        .then(res => {
          //this.$router.push({ name: "Companies" });
          this.$swal.fire({
            icon: 'success',
            title: 'تمت إضافة الشركة بنجاح!',
            showConfirmButton: false,
            // timer: 1500
          })
          console.log(res.data);
        })
              .catch(() => {
                this.$swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: MESSAGE_ERROR,
                })
              });
    }
  }
};
</script>
