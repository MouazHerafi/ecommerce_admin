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
        <span v-if="notFoundBranches" class="float-right">
          <span class="input-group">
            <input title="search" type="text" required="required" />
            <button type="submit" class="btn light-btn">بحث</button>
          </span>
        </span>
        <span v-if="!notFoundBranches" class="float-right">
          <span class="input-group">
            <div>لا يوجد أفرع لهذه الشركة</div>
          </span>
        </span>
        <router-link :to="{ name: 'AddBranch' }">
          <button class="btn btn-primary mr-3 float-left">
            إضافة فرع جديد
          </button>
        </router-link>
      </div>
      <table v-if="notFoundBranches" class="table table-striped">
        <thead>
          <tr>
            <th>الاسم</th>
            <th class="hidden-sm-down">العنوان</th>
            <th class="hidden-sm-down">الموظف</th>
            <th class="hidden-sm-down">الرصيد</th>
            <th>المنتجات</th>
            <th>إدارة الصفات</th>
            <th></th>
            <th></th>
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
              <a @click="ManageAttributes(branch.id)" class="btn btn-sm linkGo"
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

      <!--<div id="myModal1" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">

              <h4 class="modal-title">إدارة صفات المنتجات للفرع :</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">

                <h3>قم بإضافة أو حذف صفات لهذا الفرع :</h3>

                <ul
                        id="tasks-list"
                        class="text-right list-unstyled p-0 custom-checkbox"
                >
                  <li>
                    <input type="checkbox" />
                    <label>شحن بضائع القسم النسائي</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>شحن بضائع القسم النسائي</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>شحن بضائع القسم النسائي</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>شحن بضائع القسم النسائي</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>شحن بضائع القسم النسائي</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>شحن بضائع القسم النسائي</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>شحن بضائع القسم النسائي</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>شحن بضائع القسم النسائي</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>شحن بضائع القسم النسائي</label>
                  </li>



                </ul>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>-->

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
      offset: 4,
      notFoundBranches: false
    };
  },
  components: {
    Pagination
  },
  async mounted() {
    await this.getCompany();
    await this.getAllBranch();

  },
  methods: {
    getCompany() {
      console.log(this.$route.params.id);
      HTTP
              .get(COMPANIES_API + "/" + this.$route.params.id)
              .then(res => {
                //console.log(res);
                this.company = res.data.data;
              }).catch(() => {
        console.log("handle server error from here");
      });
    },
    getAllBranch() {
      HTTP
              .get(
                      COMPANIES_API +
                      "/"+ this.$route.params.id +"/branches?page=" +
                      this.branches.current_page
              )
              .then(res => {
                console.log(res);
                if(res.data.data!=null){
                  this.notFoundBranches = true;
                  //this.company = res.data.data[0].company;
                  this.branches = res.data;
                }

              })
              .catch(() => {
                console.log("handle hhh server error from here");
              });
    },
    showBranch(branchID) {
      this.$router.push({ name: "Branch", params: { branchID: branchID } });
    },
    showProducts(branchID) {
      this.$router.push({ name: "Products", params: { branchID: branchID } });
      //this.$router.push({ path: `/companies/${companyID}/branches` }); // -> /user/123
    },
    ManageAttributes(branchID) {
      this.$router.push({ name: "ManageAttributes", params: { branchID: branchID } });
      //this.$router.push({ path: `/companies/${companyID}/branches` }); // -> /user/123
    }
  }
};
</script>
