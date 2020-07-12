<template>
    <div>
        <!-- قائمة التصفح العليا -->
        <ul class="breadcrumb custom-breadcrumb">
            <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
            <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
            <li class="breadcrumb-item active"><a href="#">إضافة صفة جديدة</a></li>
        </ul>
        <!-- نهاية قائمة التصفح العليا -->

        <div class="content-block">
            <h1>
                <i class="fa fa-plus block-icon" aria-hidden="true"></i>إضافة صفة جديدة
            </h1>

            <form class="custom-form user-profile-form d-flex flex-wrap">
                <div class="form-group">
                    <label>اسم الصفة</label>
                    <input
                            id="attribute"
                            v-model="newAttribute.name"
                            class="form-control"
                            type="text"
                            value=""
                    />
                </div>

                <div class="form-group btn-submit">
                    <a class="btn btn-primary" @click="addNewAttribute()">
                        تأكيد
                    </a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {ATTRIBUTE_API} from "../LocalVar";
    import {HTTP} from "../http-common";

    export default {
        name: "NewAttribute",
        data: function() {
            return {
                newAttribute: {
                    name: "",
                }
            };
        },
        methods: {
            addNewAttribute() {
                console.log(this.newAttribute);
                HTTP
                    .post(ATTRIBUTE_API, this.newAttribute)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(() => {
                        console.log("handle server error from here");
                    });
            }
        }
    }
</script>

<style scoped>

</style>