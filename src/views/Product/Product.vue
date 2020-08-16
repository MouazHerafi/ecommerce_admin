<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">المنتجات</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->
    <div class="content-block">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <div class="product-view">
                <div class="proimage-wrap">
                  <div class="pro-image" id="pro_popup">
                    <a href="/images/product-01.jpg">
                      <img
                        class="img-fluid"
                        :src=[clickedProduct.media[0].path]
                        alt="Product Image"
                      />
                    </a>
                  </div>
                  <ul v-if="clickedProduct.media.length>1" class="proimage-thumb">
                    <li
                            v-for="(image, i) in clickedProduct.media"
                            :key="i"
                    >
                      <a href="/images/product-01.jpg"
                        ><img :src=[image.path] alt="Product Image"
                      /></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="product-info">
                <h2>{{clickedProduct.name}}</h2>
                <p class="mb-0">{{clickedProduct.category.name}}</p>
                <p class="mb-0">{{clickedProduct.details}}</p>
                <p v-if="clickedProduct.status==='available'" class="mb-0">متوفر</p>
                <p class="product_price">${{clickedProduct.price}}</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {HTTP} from "../../http-common";
import { PRODUCTS_API } from "../../LocalVar";

export default {
  name: "Product",
  data: function() {
    return {
      clickedProduct: {
        name:"",
        details:"",
        price:"",
        status:"",
        category:{
          id:"",
          name:"",
          parent:""
        },
        media:[]
      },
    };
  },
  async mounted() {
    await this.getProduct();
  },
  methods: {
    getProduct() {
      HTTP
              .get( PRODUCTS_API +"/" + this.$route.params.productID)
              .then(res => {
                console.log(res);

                this.clickedProduct = res.data.data[0];
              })
              .catch(() => {
                console.log("handle server error from here");
              });
    },
  }
};
</script>
