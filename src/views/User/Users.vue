<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">المستخدمون</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1>
        <i class="fa fa-users block-icon" aria-hidden="true"></i>المستخدمون
      </h1>

      <div class="table-op clearfix">
        <span class="float-right">
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

      <table class="table table-striped">
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
      <Pagination :pagination="users" @paginate="getAllUser()" :offset="4">
      </Pagination>
    </div>
  </div>
  <!-- نهائة محتويات الصفحة -->
</template>

<script>
import localVar from "../../LocalVar";
import Pagination from "../../components/Pagination/Pagination.vue";
export default {
  data: function() {
    return {
      users: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4
    };
  },
  name: "Users",
  components: {
    Pagination
  },
  async mounted() {
    await this.getAllUser();
  },
  methods: {
    getAllUser() {
      this.$axios
        .get(
          localVar.get_api_address() + "users?page=" + this.users.current_page
        )
        .then(res => {
          console.log(res);

          this.users = res.data;
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },
    deleteUser(userID) {
      this.$axios
        .delete(localVar.get_api_address() + "users/" + userID)
        .then(res => {
          console.log(res);

          //this.$router.push({ name: "Users" });
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    },

    rowClicked(userID) {
      this.$router.push({ name: "User", params: { id: userID } });
    }
  }
};
</script>
