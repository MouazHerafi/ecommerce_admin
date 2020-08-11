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
      <h1>
        <i class="fa fa-building block-icon" aria-hidden="true"></i>الشركات
      </h1>

      <div class="table-op clearfix">
        <span v-if="!showLoader" class="float-right">
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
                ><i class="material-icons">&#xE254;</i></a
              >
            </td>
            <td>
              <a
                @click="deleteCompany(company.id)"
                class="btn btn-sm delete"
                title="Delete"
                ><i class="material-icons">&#xE872;</i></a
              >
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination v-if="!showLoader"
        :pagination="companies"
        @paginate="getAllCompany()"
        :offset="4"
      >
      </Pagination>
    </div>
  </div>
</template>

<script>
  import {COMPANIES_API} from "../../LocalVar";
import { ContentLoader } from "vue-content-loader";
import Pagination from "../../components/Pagination/Pagination.vue";
  import {HTTP} from "../../http-common";
export default {
  name: "Companies",
  data() {
    return {
     /* companies: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },*/
      offset: 4,
      isLoading: false
    };
  },
  components: {
    Pagination,
    ContentLoader
  },
  async mounted() {
    await this.getAllCompany();
  },
  computed: {
    companies () {
      return this.$store.getters.allCompanies;
    },
    showLoader() {
      return this.$store.getters.showLoader;
    }
  },
  methods: {
    getAllCompany() {
      this.$store.dispatch('allCompanies',this.companies.current_page);
    },
    /*getAllCompany() {
      this.isLoading = true;
      HTTP.get(COMPANIES_API + "?page=" + this.companies.current_page)
        .then(res => {
          console.log(res);

          this.companies = res.data;
          this.isLoading = false;
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },*/
    showCompany(companyID) {
      this.$router.push({ name: "Company", params: { id: companyID } });
    },
    showBranches(companyID) {
      this.$router.push({ name: "Branches", params: { id: companyID } });
    },
    deleteCompany(companyID) {
      this.$swal.fire({
        title: 'هل أنت متأكد؟',
        text: "سيتم حذف هذه الشركة!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'لا',
        confirmButtonText: 'نعم, أريد حذفه'
      }).then((result) => {
        if (result.value) {
          HTTP
                  .delete(COMPANIES_API+ "/" + companyID)
                  .then(res => {
                    console.log(res);
                    this.$swal.fire({
                      icon: "success",
                      title:'تم حذف الشركة بنجاح!'
                    }
                    )
                    this.getAllCompany();
                  })
                  .catch(() => {
                    console.log("handle server error from here");
                  });
        }
      })

    }
  }
};
</script>
