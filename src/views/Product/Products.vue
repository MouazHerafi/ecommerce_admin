<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item "><a href="#">{{branch.name}}</a></li>
      <li class="breadcrumb-item active"><a href="#">المنتجات</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="row">
      <div class="col-12">
        <div class="content-block">
          <h1>
            <i class="fa fa-truck block-icon" aria-hidden="true"></i>منتجات فرع
            {{branch.name}}
          </h1>

          <loading
                  :active.sync="isLoading"
                  :is-full-page="false"
                  color="#ef3e58"
          ></loading>

          <search-field v-if="!isLoading" v-model="search" />

          <div v-if="!isLoading" class="row">
            <card-product
              v-for="(product, i) in products.data"
              :key="i"
              :product="product"
            />
          </div>
          <Pagination
                  v-if="!isLoading"
            :pagination="products"
            @paginate="getProducts()"
            :offset="4"
          >
          </Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination/Pagination.vue";
import CardProduct from "../../components/CardProduct.vue";
import SearchField from "../../components/SearchField.vue";
import { HTTP } from "../../http-common";
import {BRANCHES_API, PRODUCTSBYBRANCH_API} from "../../LocalVar";

export default {
  name: "Products",
  components: {
    CardProduct,
    SearchField,
    Pagination
  },
  data: function() {
    return {
      products: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      branch:{
        name:""
      },
      offset: 4,
      search: "",
      isLoading: false
    };
  },
  async mounted() {

    await this.getProducts();
    await this.getBranch();

  },
  methods: {
    getProducts() {
      this.isLoading = true;
      HTTP.get(
              PRODUCTSBYBRANCH_API +"/"+
          this.$route.params.branchID +
          "?page=" +
          this.products.current_page
      ).then(res => {
        console.log(res);

        this.products = res.data;
        this.isLoading = false;

      })
    .catch(() => {
                console.log("handle server error from here");
              });

    },
    getBranch() {
      HTTP.get(BRANCHES_API + "/" + this.$route.params.branchID)
              .then(res => {
                console.log(res);

                this.branch = res.data.data[0];
              })
              .catch(() => {
                console.log("handle server error from here");
              });

    },
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        return (
          product.name.match(this.search) || product.price.match(this.search)
        );
      });
    }
  }
};
</script>
