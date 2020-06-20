<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">الشركات</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->
    <div class="content-block">
      <h1><i class="fa fa-building block-icon" aria-hidden="true"></i>الشركات</h1>

      <div class="table-op clearfix">
        <span class="float-right">
          <span class="input-group">
            <input title="search" type="text" required="required" />
            <button type="submit" class="btn light-btn">بحث</button>
          </span>
        </span>
        <router-link :to="{ name: 'AddCompany' }">
          <button class="btn btn-primary mr-3 float-left">
            إضافة شركة جديدة
          </button>
        </router-link>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>الاسم</th>
            <th class="hidden-sm-down">الوصف</th>
            <th class="hidden-sm-down">البريد الالكتروني</th>
            <th class="hidden-sm-down">رقم الهاتف</th>
            <th>أفرع الشركة</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(company, i) in companies.data" :key="i">
            <td>
              <a>{{ company.name }}</a>
            </td>
            <td class="hidden-sm-down">شركة مختصة بالألبسة الرجالية</td>
            <td class="hidden-sm-down">company@gmail.com</td>
            <td class="hidden-sm-down">{{ company.phone }}</td>
            <td>
              <a @click="showBranches(company.id)" class="btn btn-sm linkGo"
                ><i class="material-icons md-24">menu_open</i></a
              >
            </td>
            <td>
              <a
                @click="showCompany(company.id)"
                title="Edit"
                class="btn btn-sm edit"
                ><i class="material-icons md-24">&#xE254;</i></a
              >
            </td>
            <td>
              <a
                @click="deleteCompany(company.id)"
                class="btn btn-sm delete"
                title="Delete"
                ><i class="material-icons md-24">&#xE872;</i></a
              >
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
        :pagination="companies"
        @paginate="getAllCompany()"
        :offset="4"
      >
      </Pagination>
    </div>
  </div>
</template>

<script>
  import { HTTP } from "../../http-common";
  import localVar from "../../LocalVar";
  import { COMPANIES_API } from "../../LocalVar";
import Pagination from "../../components/Pagination/Pagination.vue";
export default {
  name: "Companies",
  data() {
    return {
      companies: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4
    };
  },
  components: {
    Pagination
  },
  async mounted() {
    await this.getAllCompany();
  },
  methods: {
    getAllCompany() {
      HTTP
        .get(
                COMPANIES_API +
            "?page=" +
            this.companies.current_page
        )
        .then(res => {
          console.log(res);

          this.companies = res.data;
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },
    showCompany(companyID) {
      this.$router.push({ name: "Company", params: { id: companyID } });
    },
    showBranches(companyID) {
      this.$router.push({ name: "Branches", params: { id: companyID } });
    },
    deleteCompany(companyID) {
      this.$axios
        .delete(localVar.get_api_address() + "companies/" + companyID)
        .then(res => {
          console.log(res);

          //this.$router.push({ name: "Companies" });
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    }
  }
};
</script>
