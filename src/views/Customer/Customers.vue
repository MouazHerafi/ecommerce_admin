<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">الزبائن</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1><i class="fa fa-users block-icon" aria-hidden="true"></i>الزبائن</h1>

      <div class="table-op clearfix">
        <span class="float-right">
          <span class="input-group">
            <input title="search" type="text" required="required" />
            <button type="submit" class="btn light-btn">بحث</button>
          </span>
        </span>
      </div>
      <loading
        :active.sync="isLoading"
        :is-full-page="false"
        color="#ef3e58"
      ></loading>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>الاسم</th>
            <th class="hidden-sm-down">البريد الالكتروني</th>
            <th class="hidden-sm-down">رقم الهاتف</th>
            <th>الاسم الكامل</th>
            <th class="hidden-sm-down">العنوان</th>
            <th class="hidden-sm-down">الرصيد</th>
            <th>شحن البطاقة</th>
            <!--<th></th>-->
          </tr>
        </thead>

        <tbody>
          <tr v-for="(customer, i) in customers.data" :key="i">
            <td>
              <a>{{ customer.name }}</a>
            </td>
            <td class="hidden-sm-down">{{ customer.email }}</td>
            <td class="hidden-sm-down">{{ customer.phone }}</td>
            <td>{{ customer.username }}</td>
            <td class="hidden-sm-down">{{ customer.location }}</td>
            <td v-if="customer.card !== null" class="hidden-sm-down">
              {{ customer.card.balance }}
            </td>
            <td v-if="customer.card === null" class="hidden-sm-down">
              no card
            </td>

            <td>
              <a
                @click="card_id = customer.card.id"
                data-toggle="modal"
                data-target="#myModal"
                title="Charge"
                class="btn btn-sm edit"
                ><i class="material-icons">&#xE254;</i></a
              >
            </td>
            <!--<td>
                <a
                  @click="deleteUser(customer.id)"
                  class="btn btn-sm delete"
                  title="Delete"
                  data-toggle="tooltip"
                  ><i class="material-icons">&#xE872;</i></a
                >
              </td>-->
          </tr>
        </tbody>
      </table>

      <Pagination
        :pagination="customers"
        @paginate="getAllCustomer()"
        :offset="4"
      >
      </Pagination>
      <div
        class="modal fade "
        id="myModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">شحن البطاقة</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <input type="hidden" v-model="card_id" />
                <label for="charge">اختر فئة الشحن</label>
                <select
                  v-on:input="setCost($event.target.value)"
                  v-model="chargeCards.balance"
                  id="charge"
                  class="form-control"
                >
                  <option>5000</option>
                  <option>10000</option>
                  <option>15000</option>
                  <option>20000</option>
                  <option>25000</option>
                  <option>30000</option>
                  <option>35000</option>
                  <option>40000</option>
                  <option>45000</option>
                  <option>50000</option>
                </select>
              </div>
              <div class="form-group">
                <label for="cost">كلفة الشحن</label>
                <input
                  id="cost"
                  class="form-control"
                  disabled="true"
                  type="text"
                  v-model="chargeCards.cost"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                @click="chargeBalance(card_id)"
                type="submit"
                data-dismiss="modal"
                aria-label="Close"
                class="btn btn-primary"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- نهائة محتويات الصفحة -->
</template>

<script>
import { HTTP } from "../../http-common";
import { USERS_API } from "../../LocalVar";
import Pagination from "../../components/Pagination/Pagination.vue";

export default {
  data: function() {
    return {
      customers: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4,
      chargeCards: {
        balance: 0,
        cost: 0
      },
      card_id: 0,
      isLoading: false
    };
  },
  name: "Customers",
  components: {
    Pagination
  },
  async mounted() {
    await this.getAllCustomer();
  },
  methods: {
    getAllCustomer() {
      this.isLoading = true;
      HTTP.get(USERS_API + "?type=customer&page=" + this.customers.current_page)
        .then(res => {
          console.log(res);

          this.customers = res.data;
        })
        /*.catch(error => {
          console.log(error.response.data);
          console.log("handle server error from here");
        })*/
        .finally(() => (this.isLoading = false));
    },
    chargeBalance(id) {
      HTTP.put("v1/cards/" + id, this.chargeCards)
        .then(res => {
          //this.$router.push({ name: "Customers" });
          this.getAllCustomer();
          console.log(res.data);
        })
        .catch(() => {});
    },
    setCost(balance) {
      this.chargeCards.cost = parseInt(balance) + parseInt(100);
    }
  }
};
</script>
