<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">ملف الفرع</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->

    <div class="content-block">
      <h1><i class="fa fa-user block-icon" aria-hidden="true"></i>ملف الفرع</h1>

      <form class="custom-form user-profile-form d-flex flex-wrap">
        <div class="form-group">
          <label>اسم الفرع</label>
          <input
            id="name"
            v-model="clickedBranch.name"
            class="form-control"
            type="text"
            value=""
          />
        </div>
        <div class="form-group">
          <label>عنوان الفرع</label>
          <textarea
            id="location"
            v-model="clickedBranch.location"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>البريد الالكتروني</label>
          <input
            id="email"
            v-model="clickedBranch.email"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group">
          <label>رقم الهاتف</label>
          <input
            id="phone"
            v-model="clickedBranch.phone"
            class="form-control"
            type="text"
            value=""
          />
        </div>

        <div class="form-group">
          <button class="btn btn-primary" @click="updateBranch()">تحديث</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Branch",
  data: function() {
    return {
      clickedBranch: {
        name: "فرع 2",
        location: "المزة",
        email: "herafi@hh.com",
        phone: "6621531"
      }
    };
  },
  mounted() {
    this.getBranch();
  },
  methods: {
    getBranch() {
      console.log(this.$route.params.branchID);
      /* this.$axios.get('http://localhost:8080/branch/'+ this.$route.params.branchID)
			.then(res=>{
				console.log(res);
				if(res.data.error){
					alert(res.data.message);
				}else{
					//console.log(res.data);
            this.clickedBranch = res.data.branch;
                    
				}
				
			});*/
    },

    updateBranch() {
      console.log(this.clickedBranch);
      this.$router.push({ name: "Branches" });
      /*this.$axios.put('http://localhost:8080/branch/'+ this.$route.params.branchID,this.clickedBranch)
      .then(res=>{
      	console.log(res);
      	if(res.data.error){
      		alert(res.data.message);
      	}else{
            console.log(res.data);
           alert(res.data.message);
           this.$router.push({ name: "Branches" });

      	}

      });*/
    },
    deleteBranch() {
      console.log(this.clickedBranch);
      this.$router.push({ name: "Branches" });
      /*this.$axios.delete('http://localhost:8080/branch/'+ this.$route.params.branchID)
      .then(res=>{
      	console.log(res);
      	if(res.data.error){
      		alert(res.data.message);
      	}else{
            console.log(res.data);
           alert(res.data.message);
           this.$router.push({ name: "Branches" });

      	}

      });*/
    }
  }
};
</script>
