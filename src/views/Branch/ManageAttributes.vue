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

    <div class="content-block">
      <h1>
        <i class="fa fa-plus block-icon" aria-hidden="true"></i>قم بإضافة أو حذف
        صفات لهذا الفرع :
      </h1>
      <br />
      <div class="check">
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

export default {
  name: "ManageAttributes",
  data: function() {
    return {
      attributes: [],
      attributesAll: {
        attributesIds: []
      }
    };
  },
  async mounted() {
    await this.getAttributesBranch();
  },
  /* computed: {
            attributesIdsFun () {

                return this.attributes.data.filter(attribute => attribute.isRelation).map(id => id.id)
            }
        },*/
  methods: {
    getAttributesBranch() {
      HTTP.get("v1/showAttributeBranch" + "/" + this.$route.params.branchID)
        .then(res => {
          console.log(res);
          this.attributes = res.data;
        })
        .catch(() => {
          console.log("handle hhh server error from here");
        });
    },
    updateAttribute() {
      this.attributesAll.attributesIds = this.attributes.data
        .filter(attribute => attribute.isRelation)
        .map(id => id.id);
      HTTP.post(
        "v1/syncAttributes" + "/" + this.$route.params.branchID,
        this.attributesAll
      )
        .then(res => {
          console.log(res);
          //this.$router.push({ name: "ManageAttributes" });
        })
        .catch(error => {
          console.log(error);
          console.log("handle server error from here");
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
