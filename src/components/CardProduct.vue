<template>
    <div class="col-xl-3 col-sm-6 col-12">
        <div class="product">
            <div class="product-inner">
                <img alt="alt" :src=[image]>
                <div class="cart-btns">
                    <a @click="deleteProduct(id)" class="btn btn-danger prodelete-btn">حذف</a>
                    <a class="btn btn-danger proedit-btn" >حظر</a>
                </div>
            </div>
            <div @click="showProduct(id)" class="pro-desc">
                <h5><a href="">{{name}}</a></h5>
                <div class="price">{{price}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["id","name","price","image"],
    name: "CardProduct",
    methods: {
        deleteProduct(id){
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
        },
        showProduct(id){
            this.$router.push({ name: "Product", params: { productID: id } });
        }
    }
}
</script>