<template>
     <div class="table-op clearfix">
        <span class="float-right">
            
            <form class="search">
            <div class="search__wrapper">
                <input type="text"
                 :value="value"
                   placeholder="أدخل كلمة مفتاحية للبحث.."
                    class="search__field"
                    v-on:input="updateValue($event.target.value)">
                <button type="submit" class="fa fa-search search__icon"></button>
            </div>
            </form>
        </span>
    </div>
</template>

<script>
export default {
    name: "SearchField",
    props: {
            value: {
                type: String
            }
        },
    methods: {
      updateValue: function (value) {
        this.$emit('input', value)
      }
    }
}
</script>