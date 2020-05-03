<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">المنتجات</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="row">
      <div class="col-12">
        <div class="content-block">
          <h1>
            <i class="fa fa-truck block-icon" aria-hidden="true"></i>منتجات فرع
            المزة
          </h1>

          <search-field v-model="search" />

          <div class="row">
            <card-product
              v-for="(product, i) in products"
              :key="i"
              :id="product.id"
              :name="product.name"
              :price="product.price"
            />
          </div>
          <Pagination  :pagination="companies"
                       @paginate="getAllCompany()"
                       :offset="4">
          </Pagination>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "../components/Pagination/Pagination.vue";
import CardProduct from "../components/CardProduct.vue";
import SearchField from "../components/SearchField.vue";
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
      offset: 4,
      search: ""
    };
  },
  mounted() {
    this.getProductsForBranch();
  },
  methods: {
    /*getProductsForBranch(){
            console.log(this.$route.params.branchID);
                this.$axios.get('api/products?branch='+this.$route.params.branchID)
                .then(res=>{
                    console.log(res);
                    if(res.data.error){
                        alert(res.data.message);
                    }else{
                        //console.log(res.data);
                this.products = res.data;
                        
                    }
                    
                });
        },*/

    /* with pagination  */

    getProductsForBranch() {
      console.log(this.$route.params.branchID);
      this.$axios
        .get(
          `api/products?branch=${this.$route.params.branchID}&page=1`
        )
        .then(res => {
          console.log(res);
          if (res.data.error) {
            alert(res.data.message);
          } else {
            //console.log(res.data);
            this.products = res.data.products;
            this.pageCount = Math.ceil(
              res.data.totalResults /
                this.$options.static.visibleItemsPerPageCount
            );
          }
        })
        .catch(error => console.log(error));
    },
    pageChangeHandle(value) {
      switch (value) {
        case "next":
          this.currentPage += 1;
          break;
        case "previous":
          this.currentPage -= 1;
          break;
        case "first":
          this.currentPage = 1;
          break;
        case "last":
          this.currentPage = this.pageCount;
          break;
        default:
          this.currentPage = value;
      }
      this.$axios
        .get(
          `api/products?branch=${this.$route.params.branchID}&page=${this.currentPage}&pageSize=${this.$options.static.visibleItemsPerPageCount}`
        )
        .then(res => {
          console.log(res);
          if (res.data.error) {
            alert(res.data.message);
          } else {
            //console.log(res.data);
            this.products = res.data.products;
          }
        })
        .catch(error => console.log(error));
    }
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
