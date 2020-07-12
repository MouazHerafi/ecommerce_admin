export const URL_API = "v1/";
export const USERS_API = URL_API + "users";
export const LOGIN_API = "login";
export const COMPANIES_API = URL_API + "companies";
export const BRANCHES_API = URL_API + "branches";
export const PRODUCTS_API = URL_API + "products";
export const ROLES_API = URL_API + "roles";
export const ATTRIBUTE_API = URL_API + "attributes";
export default {
  get_api_address() {
    return "http://10.65.1.109:8000/api/v1/";
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

