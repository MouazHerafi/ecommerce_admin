export const USERS_API =  "users";
export const LOGIN_API =  "login";
export const LOGOUT_API =  "logout";
export const COMPANIES_API = "companies";
export const BRANCHES_API = "branches";
export const BRANCHESBYCOMPANY_API = "branchesByCompany";
export const PRODUCTS_API = "products";
export const PRODUCTSBYBRANCH_API = "productsByBranch";
export const ROLES_API = "roles";
export const ATTRIBUTE_API = "attributes";
export const COUPON_API = "coupons";
export const CATEGORIES_API = "categories";
export const ORDERS_API = "orders";
export const ATTRIBUTESBRANCH_API = "showAttributeBranch";
export const SYNCATTRIBUTES_API =  "syncAttributes";
export const CARDS_API = "deposit";
export default {
  get_api_address() {
    return "http://localhost:8000/api/v1/";
  },
  get_msg_req() {
    return "هذا الحقل مطلوب";
  },
  get_msg_email() {
    return "يجب إدخال بريد الكتروني صالح";
  },
  get_msg_password_match() {
    return "يجب تطابق كلمتي المرور";
  },
  get_msg_min_length(numCharacter) {
    return `يجب أن يتكون الحقل من ${numCharacter} محارف على الأقل`;
  }
};

