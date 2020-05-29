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
      <h1><i class="fa fa-university block-icon" aria-hidden="true"></i>الأفرع</h1>

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
            <th class="hidden-sm-down">رقم الهاتف</th>
            <th class="hidden-sm-down">البريد الالكتروني</th>
            <th>المنتجات</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(branch, i) in branches" :key="i">
            <td>
              <a>{{ branch.name }}</a>
            </td>
            <td class="hidden-sm-down">{{ branch.location }}</td>
            <td class="hidden-sm-down">{{ branch.phone }}</td>
            <td class="hidden-sm-down">{{ branch.email }}</td>
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

      <div class="custom-pag clearfix">
        <ul class="pagination float-left">
          <li class="page-item">
            <a class="page-link" href="#">
              &laquo;
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">
              &raquo;
            </a>
          </li>
        </ul>
        <div class="float-left">
          8 أفرع
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Branches",
  data: function() {
    return {
      branches: [
        {
          id: 1,
          name: "b1",
          location: "المزة",
          email: "moaaz@gmail.com",
          phone: "0948883744"
        },
        {
          id: 2,
          name: "b2",
          location: "قدسيا",
          email: "moaaz@gmail.com",
          phone: "0948883744"
        }
      ]
    };
  },
  mounted() {
    // this.getAllBranch();
  },
  methods: {
    /*getAllBranch(){
                this.$axios.get("url"+this.$route.params.id)
                .then(res=>{
                    console.log(res);
                    if(res.data.error){
                        alert(res.data.message);
                    }else{
                        //console.log(res.data);
                this.branches = res.data.companies;
                        
                    }
                    
                });
        },*/

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
