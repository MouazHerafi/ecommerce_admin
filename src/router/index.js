import Vue from "vue";
import VueRouter from "vue-router";
import TheContainer from "../components/TheContainer.vue";
import AppDashboard from "../views/AppDashboard.vue";
import Users from "../views/User/Users.vue";
import Categories from "../views/Category/Categories.vue";
import AddCategory from "../views/Category/AddCategory.vue";
import Category from "../views/Category/Category.vue";
import Login from "../views/Login.vue";
import Error404 from "../views/Error404.vue";
import User from "../views/User/User.vue";
import AddUser from "../views/User/AddUser.vue";
import Companies from "../views/Company/Companies.vue";
import AddCompany from "../views/Company/AddCompany.vue";
import Company from "../views/Company/Company.vue";
import Branches from "../views/Branch/Branches.vue";
import AddBranch from "../views/Branch/AddBranch.vue";
import Branch from "../views/Branch/Branch.vue";
import Products from "../views/Products.vue";
import Product from "../views/Product.vue";
import Coupons from "../views/Coupon/Coupons.vue";
import Coupon from "../views/Coupon/Coupon.vue";
import AddCoupon from "../views/Coupon/AddCoupon.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/dashboard",
    component: TheContainer,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: AppDashboard
      },
      {
        path: "users",
        meta: {
          label: "Users"
        },
        component: {
          render(c) {
            return c("router-view");
          }
        },
        children: [
          {
            path: "",
            name: "Users",
            component: Users
          },
          {
            path: "add",
            meta: {
              label: "Add User"
            },
            name: "AddUser",
            component: AddUser
          },
          {
            path: ":id",
            meta: {
              label: "User Details"
            },
            name: "User",
            component: User,
            props: true
          }
        ]
      },
      {
        path: "categories",
        meta: {
          label: "Categories"
        },
        component: {
          render(c) {
            return c("router-view");
          }
        },
        children: [
          {
            path: "",
            name: "Categories",
            component: Categories
          },
          {
            path: "add",
            meta: {
              label: "Add Category"
            },
            name: "AddCategory",
            component: AddCategory
          },
          {
            path: ":CatID",
            meta: {
              label: "Category Details"
            },
            name: "Category",
            component: Category
          }
        ]
      },
      {
        path: "companies",
        meta: {
          label: "Companies"
        },
        component: {
          render(c) {
            return c("router-view");
          }
        },
        children: [
          {
            path: "",
            name: "Companies",
            component: Companies
          },
          {
            path: "add",
            meta: {
              label: "Add Company"
            },
            name: "AddCompany",
            component: AddCompany
          },
          {
            path: ":id",
            meta: {
              label: "Company Details"
            },
            name: "Company",
            component: Company
          },
          {
            path: ":id/branches/",
            name: "Branches",
            component: Branches
          },
          {
            path: ":id/branches/add",
            meta: {
              label: "Add Branch"
            },
            name: "AddBranch",
            component: AddBranch
          },
          {
            path: ":id/branches/:branchID",
            meta: {
              label: "Branch Details"
            },
            name: "Branch",
            component: Branch
          },
          {
            path: ":id/branches/:branchID/products",
            meta: {
              label: "Products"
            },
            name: "Products",
            component: Products
          },
          {
            path: ":id/branches/:branchID/products/:productID",
            meta: {
              label: "Product"
            },
            name: "Product",
            component: Product
          }
        ]
      },
      {
        path: "coupons",
        meta: {
          label: "Coupons"
        },
        component: {
          render(c) {
            return c("router-view");
          }
        },
        children: [
          {
            path: "",
            name: "Coupons",
            component: Coupons
          },
          {
            path: "add",
            meta: {
              label: "Add Coupon"
            },
            name: "AddCoupon",
            component: AddCoupon
          },
          {
            path: ":CouponID",
            meta: {
              label: "Coupon Details"
            },
            name: "Coupon",
            component: Coupon
          }
        ]
      }
    ]
  },
  {
    path: "/pages",
    redirect: "/pages/404",
    name: "Pages",
    component: {
      render(c) {
        return c("router-view");
      }
    },
    children: [
      {
        path: "login",
        name: "Login",
        component: Login
      },
      {
        path: "404",
        name: "Error404",
        component: Error404
      }
    ]
  },
  { path: '*', component: Error404 }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
