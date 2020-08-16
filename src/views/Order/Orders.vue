<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">الطلبات</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->
    <div class="content-block">
      <h1>
        <i class="fa fa-building block-icon" aria-hidden="true"></i>الطلبات
      </h1>

      <div class="table-op clearfix">
        <span v-if="!showLoader" class="float-right">
          <span class="input-group">
            <input title="search" type="text" required="required" />
            <button type="submit" class="btn light-btn">بحث</button>
          </span>
        </span>
        <span v-if="!showLoader" class="float-left">
          <label class="filter">فلترة حسب تاريخ الشراء</label>
          <input
            v-model="dateOrders"
            v-on:input="filterOrdersByDate($event.target.value)"
            type="date"
          />
        </span>
      </div>

      <ContentLoader
        v-if="showLoader"
        :height="500"
        :width="1000"
        :speed="2"
        viewBox="0 0 1000 550"
      >
        <rect x="51" y="45" rx="3" ry="3" width="906" height="17" />
        <circle cx="879" cy="123" r="11" />
        <circle cx="914" cy="123" r="11" />
        <rect x="104" y="115" rx="3" ry="3" width="141" height="15" />
        <rect x="305" y="114" rx="3" ry="3" width="299" height="15" />
        <rect x="661" y="114" rx="3" ry="3" width="141" height="15" />
        <rect x="55" y="155" rx="3" ry="3" width="897" height="2" />
        <circle cx="880" cy="184" r="11" />
        <circle cx="915" cy="184" r="11" />
        <rect x="105" y="176" rx="3" ry="3" width="141" height="15" />
        <rect x="306" y="175" rx="3" ry="3" width="299" height="15" />
        <rect x="662" y="175" rx="3" ry="3" width="141" height="15" />
        <rect x="56" y="216" rx="3" ry="3" width="897" height="2" />
        <circle cx="881" cy="242" r="11" />
        <circle cx="916" cy="242" r="11" />
        <rect x="106" y="234" rx="3" ry="3" width="141" height="15" />
        <rect x="307" y="233" rx="3" ry="3" width="299" height="15" />
        <rect x="663" y="233" rx="3" ry="3" width="141" height="15" />
        <rect x="57" y="274" rx="3" ry="3" width="897" height="2" />
        <circle cx="882" cy="303" r="11" />
        <circle cx="917" cy="303" r="11" />
        <rect x="107" y="295" rx="3" ry="3" width="141" height="15" />
        <rect x="308" y="294" rx="3" ry="3" width="299" height="15" />
        <rect x="664" y="294" rx="3" ry="3" width="141" height="15" />
        <rect x="58" y="335" rx="3" ry="3" width="897" height="2" />
        <circle cx="881" cy="363" r="11" />
        <circle cx="916" cy="363" r="11" />
        <rect x="106" y="355" rx="3" ry="3" width="141" height="15" />
        <rect x="307" y="354" rx="3" ry="3" width="299" height="15" />
        <rect x="663" y="354" rx="3" ry="3" width="141" height="15" />
        <rect x="57" y="395" rx="3" ry="3" width="897" height="2" />
        <circle cx="882" cy="424" r="11" />
        <circle cx="917" cy="424" r="11" />
        <rect x="107" y="416" rx="3" ry="3" width="141" height="15" />
        <rect x="308" y="415" rx="3" ry="3" width="299" height="15" />
        <rect x="664" y="415" rx="3" ry="3" width="141" height="15" />
        <rect x="55" y="453" rx="3" ry="3" width="897" height="2" />
        <rect x="51" y="49" rx="3" ry="3" width="2" height="465" />
        <rect x="955" y="49" rx="3" ry="3" width="2" height="465" />
        <circle cx="882" cy="484" r="11" />
        <circle cx="917" cy="484" r="11" />
        <rect x="107" y="476" rx="3" ry="3" width="141" height="15" />
        <rect x="308" y="475" rx="3" ry="3" width="299" height="15" />
        <rect x="664" y="475" rx="3" ry="3" width="141" height="15" />
        <rect x="55" y="513" rx="3" ry="3" width="897" height="2" />
        <rect x="52" y="80" rx="3" ry="3" width="906" height="17" />
        <rect x="53" y="57" rx="3" ry="3" width="68" height="33" />
        <rect x="222" y="54" rx="3" ry="3" width="149" height="33" />
        <rect x="544" y="55" rx="3" ry="3" width="137" height="33" />
        <rect x="782" y="56" rx="3" ry="3" width="72" height="33" />
        <rect x="933" y="54" rx="3" ry="3" width="24" height="33" />
      </ContentLoader>

      <table v-if="!showLoader" class="table table-striped">
        <thead>
          <tr>
            <th>الزبون</th>
            <th>الشركة</th>
            <th>الفرع</th>
            <th>تاريخ الشراء</th>
            <th>الاجمالي</th>
            <th>تفاصيل الطلب</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(order, i) in orders.data" :key="i">
            <td>
              <a>mouaz herafi</a>
            </td>
            <td>
              <a>{{ order.branch.company }}</a>
            </td>
            <td>
              <a>{{ order.branch.name }}</a>
            </td>
            <td>
              <a>{{ order.date }}</a>
            </td>
            <td>
              <a>{{ order.delevareAmount }}</a>
            </td>
            <td>
              <a @click="showOrderDetails(order.id)" class="btn btn-sm linkGo"
                ><i class="material-icons md-24">menu_open</i></a
              >
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
        v-if="!showLoader"
        :pagination="orders"
        @paginate="getAllOrder()"
        :offset="4"
      >
      </Pagination>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";
import Pagination from "../../components/Pagination/Pagination.vue";
export default {
  name: "Orders",
  data() {
    return {
      offset: 4,
      isLoading: false,
      dateOrders: ""
    };
  },
  components: {
    Pagination,
    ContentLoader
  },
  async mounted() {
    this.dateOrders = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "-");
    await this.getAllOrder(this.dateOrders);
  },
  computed: {
    orders() {
      return this.$store.getters.allOrders;
    },
    showLoader() {
      return this.$store.getters.showLoader;
    }
  },
  methods: {
    getAllOrder(date) {
      let page = this.orders.current_page;
      this.$store.dispatch("allOrders", { page, date });
    },
    filterOrdersByDate(v) {
      this.getAllOrder(v);
    },
    showOrderDetails(orderID) {
      this.$router.push({ name: "Order", params: { OrderID: orderID } });
    }
  }
};
</script>

<style scoped>
.filter {
  padding-left: 10px;
}
</style>
