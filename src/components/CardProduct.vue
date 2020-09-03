<template>
  <div class="col-xl-3 col-sm-6 col-12">
    <div class="product">
      <div class="product-inner">
        <img
          style="
    height: 200px !important;
"
          alt="alt"
          :src="[product.media[0].path]"
        />
        <div class="cart-btns">
          <a @click="deleteProduct(id)" class="btn btn-danger prodelete-btn"
            >حذف</a
          >
          <a class="btn btn-danger proedit-btn">حظر</a>
        </div>
      </div>
      <div class="pro-desc">
        <router-link
          :to="{
            name: 'Product',
            params: { productID: product.id }
          }"
        >
          <h5>
            <a href="">{{ product.name }}</a>
          </h5>
        </router-link>
        <div class="price">{{ product.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  name: "CardProduct",
  methods: {
    deleteProduct(id) {
      console.log(id);
      /*this.$axios.delete('http://localhost:8080/product/'+ id)
            .then(res=>{
                console.log(res);
                if(res.data.error){
                    alert(res.data.message);
                }else{
                    console.log(res.data);
                alert(res.data.message);

      	}

      });*/
    }
  }
};
</script>
