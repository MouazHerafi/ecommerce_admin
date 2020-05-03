export default{
    get_api_address(){
        return "http://localhost:8000/api/";
    },
    get_msg_req(){
        return "هذا الحقل مطلوب";
    },
    get_msg_email(){
        return "يجب إدخال بريد الكتروني صالح";
    },
    get_msg_password_match(){
        return "يجب تطابق كلمتي المرور";
    },
    get_msg_min_length(numCharacter){
        return `يجب أن يتكون الحقل من ${numCharacter} محارف على الأقل`;
    }
}