<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">الموظفين</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1>
        <i class="fa fa-users block-icon" aria-hidden="true"></i>الموظفين
      </h1>

      <div class="table-op clearfix">
        <span v-if="!showLoader" class="float-right">
          <span class="input-group">
            <input title="search" type="text" required="required" />
            <button type="submit" class="btn light-btn">بحث</button>
          </span>
        </span>
        <router-link :to="{ name: 'AddUser' }">
          <button class="btn btn-primary mr-3 float-left">
            <i class="material-icons">person_add</i>
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
            <th class="hidden-sm-down">البريد الالكتروني</th>
            <th class="hidden-sm-down">رقم الهاتف</th>
            <th>الاسم الكامل</th>
            <th class="hidden-sm-down">العنوان</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(user, i) in users.data" :key="i">
            <td>
              <a>{{ user.name }}</a>
            </td>
            <td class="hidden-sm-down">{{ user.email }}</td>
            <td class="hidden-sm-down">{{ user.phone }}</td>
            <td>{{ user.username }}</td>
            <td class="hidden-sm-down">{{ user.location }}</td>
            <td>
              <a
                @click="rowClicked(user.id)"
                title="Edit"
                class="btn btn-sm edit"
                ><i class="material-icons">&#xE254;</i></a
              >
            </td>
            <td>
              <a
                @click="deleteUser(user.id)"
                class="btn btn-sm delete"
                title="Delete"
                data-toggle="tooltip"
                ><i class="material-icons">&#xE872;</i></a
              >
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination v-if="!showLoader" :pagination="users" @paginate="getAllUser()" :offset="4">
      </Pagination>
    </div>
  </div>
  <!-- نهائة محتويات الصفحة -->
</template>

<script>
import { HTTP } from "../../http-common";
import { USERS_API } from "../../LocalVar";
import Pagination from "../../components/Pagination/Pagination.vue";
import { ContentLoader } from "vue-content-loader";
export default {
  data: function() {
    return {
     /* users: {
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
  name: "Users",
  components: {
    Pagination,
    ContentLoader
  },
  async mounted() {
    await this.getAllUser();
  },
  computed: {
    users () {
      return this.$store.getters.allUsers;
    },
    showLoader() {
      return this.$store.getters.showLoader;
    }
  },
  methods: {
    getAllUser() {
      this.$store.dispatch('allEmployees',this.users.current_page);
    },
   /* getAllUser() {
      this.isLoading = true;
      HTTP.get(USERS_API + "?type=employee&page=" + this.users.current_page)
        .then(res => {
          console.log(res);

          this.users = res.data;
        })
        /*.catch(error => {
          console.log(error.response.data);
          console.log("handle server error from here");
        })*/
      //  .finally(() => (this.isLoading = false));
    //},*/
    deleteUser(userID) {
      this.$swal.fire({
        title: 'هل أنت متأكد؟',
        text: "سيتم حذف هذا الموظف!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'لا',
        confirmButtonText: 'نعم, أريد حذفه'
      }).then((result) => {
        if (result.value) {
          HTTP
                  .delete(USERS_API+ "/" + userID)
                  .then(res => {
                    console.log(res);
                    this.$swal.fire({
                              icon: "success",
                              title:'تم حذف الموظف بنجاح!'
                            }
                    )
                    this.getAllUser();
                  })
                  .catch(() => {
                    console.log("handle server error from here");
                  });
        }
      })

    },

    rowClicked(userID) {
      this.$router.push({ name: "User", params: { userID: userID } });
    }
  }
};
</script>
