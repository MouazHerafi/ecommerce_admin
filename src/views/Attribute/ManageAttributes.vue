<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active">
        <a href="#">إدارة صفات المنتجات</a>
      </li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <loading
            :active.sync="showLoader"
            :is-full-page="false"
            color="#ef3e58"
    ></loading>

    <div class="content-block">
      <h1>
        <i class="fa fa-plus block-icon" aria-hidden="true"></i>قم بإضافة أو حذف
        صفات لهذا الفرع :
      </h1>
      <br />
      <div v-if="!showLoader" class="check">
        <ul class="text-right list-unstyled p-0 custom-checkbox">
          <div v-for="(attribute, i) in attributes.data" :key="i">
            <li>
              <input
                type="checkbox"
                v-model="attribute.isRelation"
                :value="attribute.id"
                :id="attribute.id"
              />
              <label>{{ attribute.name }}</label>
            </li>
          </div>
        </ul>
        <button @click="updateAttribute()" class="btn btn-primary">
          تأكيد
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../../http-common";
import {SYNCATTRIBUTES_API} from "../../LocalVar";

export default {
  name: "ManageAttributes",
  data: function() {
    return {
      //attributes: [],
      attributesAll: {
        attributesIds: []
      },
      isLoading: false
    };
  },
  computed: {
    attributes () {
      return this.$store.getters.allAttributes;
    },
    showLoader() {
      return this.$store.getters.showLoader;
    }
  },
  async mounted() {
    await this.getAttributesBranch();
  },
  methods: {
    getAttributesBranch() {
      this.$store.dispatch('allAttributes',this.$route.params.branchID);
    },
    /*getAttributesBranch() {
      this.isLoading = true;
      HTTP.get("showAttributeBranch" + "/" + this.$route.params.branchID)
        .then(res => {
          console.log(res);
          this.attributes = res.data;
          this.isLoading = false;
        })
        .catch(() => {
          console.log("handle hhh server error from here");
        });
    },*/
    updateAttribute() {
      this.attributesAll.attributesIds = this.attributes.data
              .filter(attribute => attribute.isRelation)
              .map(id => id.id);
      this.$swal.fire({
        title: "هل تريد الاستمرار؟",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "نعم",
        cancelButtonText: "لا",
        showCancelButton: true,
        showCloseButton: true,
        preConfirm: () => {
          HTTP.post(
                  SYNCATTRIBUTES_API + "/" + this.$route.params.branchID,
                  this.attributesAll
          )
                  .then(res => {
                    console.log(res);
                    this.getAttributesBranch();
                  })
                  .catch(() => {
                    console.log("handle server error from here");
                  });
        }
      });

    }
  }
};
</script>

<style scoped>
.check li {
  margin-bottom: 10px;
}
</style>
