<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">الأفرع</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->
    <div class="content-block">
      <h1><i class="fa fa-university block-icon" aria-hidden="true"></i>{{company.name}}</h1>

      <div class="table-op clearfix">
        <span class="float-right">
          <span class="input-group">
            <input title="search" type="text" required="required" />
            <button type="submit" class="btn light-btn">بحث</button>
          </span>
        </span>
        <router-link :to="{ name: 'AddBranch' }">
          <button class="btn btn-primary mr-3 float-left">
            إضافة فرع جديد
          </button>
        </router-link>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>الاسم</th>
            <th class="hidden-sm-down">العنوان</th>
            <th class="hidden-sm-down">الموظف</th>
            <th class="hidden-sm-down">الرصيد</th>
            <th>المنتجات</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(branch, i) in branches.data" :key="i">
            <td>
              <a>{{ branch.name }}</a>
            </td>
            <td class="hidden-sm-down">{{ branch.location }}</td>
            <td class="hidden-sm-down">{{ branch.user.username }}</td>
            <td class="hidden-sm-down">{{ branch.balance }}</td>
            <td>
              <a @click="showProducts(branch.id)" class="btn btn-sm linkGo"
                ><i class="material-icons">keyboard_arrow_left</i></a
              >
            </td>
            <td>
              <a
                @click="showBranch(branch.id)"
                title="Edit"
                class="btn btn-sm edit"
                ><i class="material-icons">&#xE254;</i></a
              >
            </td>
            <td>
              <a class="btn btn-sm delete" title="Delete"
                ><i class="material-icons">&#xE872;</i></a
              >
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
              :pagination="branches"
              @paginate="getAllBranch()"
              :offset="4"
      >
      </Pagination>
    </div>
  </div>
</template>

<script>
  import { HTTP } from "../../http-common";
 // import localVar from "../../LocalVar";
  //import { BRANCHES_API } from "../../LocalVar";
  import { COMPANIES_API } from "../../LocalVar";
  import Pagination from "../../components/Pagination/Pagination.vue";
export default {
  name: "Branches",
  data: function() {
    return {
      branches: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      company:{
        id:0,
        name:"",
        phone:""

      },
      offset: 4
    };
  },
  components: {
    Pagination
  },
  async mounted() {
    await this.getAllBranch();
  },
  methods: {
    getAllBranch() {
      HTTP
              .get(
                      COMPANIES_API +
                      "/"+ this.$route.params.id +"/branches?page=" +
                      this.branches.current_page
              )
              .then(res => {
                console.log(res);

                this.company = res.data.data[0].company;
                this.branches = res.data;
              })
              .catch(() => {
                console.log("handle server error from here");
              });
    },
    showBranch(branchID) {
      this.$router.push({ name: "Branch", params: { branchID: branchID } });
    },
    showProducts(branchID) {
      this.$router.push({ name: "Products", params: { branchID: branchID } });
      //this.$router.push({ path: `/companies/${companyID}/branches` }); // -> /user/123
    }
  }
};
</script>
