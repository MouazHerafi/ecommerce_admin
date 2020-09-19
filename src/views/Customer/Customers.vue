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
        <span v-if="!showLoader" class="float-right">
          <span class="input-group">
            <input title="search" type="text" required="required" />
            <button type="submit" class="btn light-btn">بحث</button>
          </span>
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
                ><i class="material-icons">credit_card</i></a
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
              v-if="!showLoader"
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
import Pagination from "../../components/Pagination/Pagination.vue";
import {CARDS_API} from "../../LocalVar";
import { ContentLoader } from "vue-content-loader";

export default {
  data: function() {
    return {
      /*customers: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },*/
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
    Pagination,
    ContentLoader
  },
  async mounted() {
    await this.getAllCustomer();
  },
  computed: {
    customers () {
      return this.$store.getters.allUsers;
    },
    showLoader() {
      return this.$store.getters.showLoader;
    }
  },
  methods: {
    getAllCustomer() {
      this.$store.dispatch('allCustomers',this.customers.current_page);
    },
    /*getAllCustomer() {
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
       // .finally(() => (this.isLoading = false));
   // },
    chargeBalance(id) {
      this.$swal.fire({
        title: 'الأحكام والشروط',
        input: 'checkbox',
        inputValue: 1,
        inputPlaceholder:
                'أوافق على شحن البطاقة رصيد قيمته '+ this.chargeCards.balance,
        showCancelButton: true,
        cancelButtonText: 'تراجع',
        cancelButtonColor: '#d33',
        confirmButtonText:
                'متابعة <i class="fa fa-arrow-left"></i>',
      }).then((result) => {
        if (result.value) {
          HTTP.post(CARDS_API +"/" + id, this.chargeCards)
                  .then(res => {
                    this.$swal.fire({
                              icon: "success",
                              title:'تم شحن البطاقة بمبلغ قيمته'+ this.chargeCards.balance
                            }
                    )
                    this.getAllCustomer();
                    console.log(res.data);
                  })
                  .catch(() => {});

        }})

    },
    setCost(balance) {
      this.chargeCards.cost = parseInt(balance) + parseInt(100);
    }
  }
};
</script>
