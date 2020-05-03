<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">إضافة فرع جديد</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1>
        <i class="fa fa-plus block-icon" aria-hidden="true"></i>إضافة فرع جديد
      </h1>

      <form class="custom-form user-profile-form d-flex flex-wrap">
        <div class="form-group">
          <label>اسم الفرع</label>
          <input
            id="name"
            v-model="newBranch.name"
            class="form-control"
            type="text"
            value=""
          />
        </div>
        <div class="form-group">
          <label>عنوان الفرع</label>
          <textarea
            id="location"
            v-model="newBranch.location"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>البريد الالكتروني</label>
          <input
            id="email"
            v-model="newBranch.email"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group">
          <label>رقم الهاتف</label>
          <input
            id="phone"
            v-model="newBranch.phone"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group">
          <div class="style-chooser">
            <v-select
              dir="rtl"
              label="username"
              :filterable="false"
              :options="users.data"
              v-model="newBranch.user_id"
              placeholder="اختر موظف لهذا الفرع"
              :reduce="username => username.id"
              @search="onSearch"
            >
              <template slot="no-options">
                ابحث عن الموظف المطلوب..
              </template>
              <template slot="user" slot-scope="user">
                <div class="d-center">
                  {{ user.username }}
                </div>
              </template>
              <template slot="selected-user" slot-scope="user">
                <div class="selected d-center">
                  {{ user.username }}
                </div>
              </template>
            </v-select>
          </div>
        </div>

        <div class="form-group btn-submit">
          <a class="btn btn-primary" @click="addNewBranch()">تأكيد</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import localVar from "../../LocalVar";

export default {
  name: "AddBranch",
  data: function() {
    return {
      users: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      newBranch: {
        name: "",
        location: "",
        email: "",
        phone: "",
        company_id: Number.parseInt(this.$route.params.id, 10),
        user_id: undefined
      }
    };
  },

  methods: {
    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    search(loading, search /*, vm*/) {
      console.log(search);
      loading(false);
      this.getAllUser();

      /* fetch(
              `https://api.github.com/search/repositories?q=${escape(search)}`
      ).then(res => {
        res.json().then(json => (vm.options = json.items));
        loading(false);
      });*/
    },
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
    addNewBranch() {
      console.log(this.newBranch);
      this.$axios
        .post(localVar.get_api_address() + "branches/", this.newBranch)
        .then(res => {
          //this.$router.push({ name: "Branches" });
          console.log(res.data);
        })
        .catch(() => {
          console.log("handle server error from here");
        });
    }
  }
};
</script>
<style>
.d-center {
  display: flex;
  align-items: center;
}

.v-select .dropdown li {
  border-bottom: 1px solid rgba(112, 128, 144, 0.1);
}

.v-select .dropdown li:last-child {
  border-bottom: none;
}

.v-select .dropdown li a {
  padding: 10px 20px;
  width: 100%;
  font-size: 1.25em;
  color: #3c3c3c;
}

.v-select .dropdown-menu .active > a {
  color: #fff;
}
</style>
