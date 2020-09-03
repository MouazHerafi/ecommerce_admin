<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">الطلبات</a></li>
    </ul>

    <loading
      :active.sync="isLoading"
      :is-full-page="false"
      color="#ef3e58"
    ></loading>
    <h1>
      <i class="fa fa-building block-icon" aria-hidden="true"></i>تاريخ الطلب : {{clickedOrder.date}}
    </h1>
    <!-- نهاية قائمة التصفح العليا -->
    <div v-if="clickedOrder.products.length != 0" class="content-block">
      <h3>
        <i class="fa fa-bar-chart block-icon" aria-hidden="true"></i>المنتجات
      </h3>

      <table class="table customer-orders">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>العدد</th>
            <th>السعر</th>
            <th>الاجمالي</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(product, i) in clickedOrder.products" :key="i">
            <td>
              <img
                alt=""
                class="rounded-circle  order-thumb"
                :src="[product.media[0].path]"
              />
            </td>
            <td>
              <div>
                <router-link
                  :to="{ name: 'Product', params: { productID: product.id } }"
                  ><a>{{ product.name }}</a></router-link
                >
              </div>
              <div class="order-info">
                <router-link
                  :to="{
                    name: 'Category',
                    params: { CatID: product.category.id }
                  }"
                  ><a>{{ product.category.name }}</a></router-link
                >
              </div>
            </td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.price }}$</td>
            <td>{{ product.quantity * product.price }}$</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="content-block">
      <h3>
        <i class="fa fa-bar-chart block-icon" aria-hidden="true"></i>العروض
      </h3>
      <table class="table customer-orders">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>العدد</th>
            <th>السعر</th>
            <th>الاجمالي</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(product, i) in clickedOrder.products" :key="i">
            <td>
              <img
                alt=""
                class="rounded-circle  order-thumb"
                :src="[product.media[0].path]"
              />
            </td>
            <td>
              <div>
                <router-link
                  :to="{ name: 'Product', params: { productID: product.id } }"
                  ><a>{{ product.name }}</a></router-link
                >
              </div>
              <div class="order-info">
                <router-link
                  :to="{
                    name: 'Category',
                    params: { CatID: product.category.id }
                  }"
                  ><a>{{ product.category.name }}</a></router-link
                >
              </div>
            </td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.price }}$</td>
            <td>{{ product.quantity * product.price }}$</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="content-block">
      <h3>
        <i class="fa fa-bar-chart block-icon" aria-hidden="true"></i>المجموع
        االنهائي
      </h3>

      <table class="table customer-orders">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>الحسم</th>
            <th>الاجمالي</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
            <td>
              <div><a href="#">اسم الزبون</a></div>
              <div class="order-info"><a href="#">mouaz herafi</a></div>
            </td>
            <td>{{ clickedOrder.discount }}$</td>
            <td>50$</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../../http-common";
import { ORDERS_API } from "../../LocalVar";

export default {
  name: "Order",
  data: function() {
    return {
      clickedOrder: {
        id: "",
        date: "",
        discount: "",
        delevareAmount: "",
        coupon_id: {},
        products: [],
        offers: []
      },
      isLoading: false
    };
  },
  async mounted() {
    await this.getOrder();
  },
  methods: {
    getOrder() {
      this.isLoading = true;
      HTTP.get(ORDERS_API + "/" + this.$route.params.OrderID)
        .then(res => {
          console.log(res);

          this.clickedOrder = res.data.data[0];
          this.isLoading = false;
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    }
  }
};
</script>

<style scoped></style>
