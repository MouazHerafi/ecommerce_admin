<template>
  <tr>
    <td>
      <a href="user.html">{{ username }}</a>
    </td>
    <td class="hidden-sm-down">{{ email }}</td>
    <td class="hidden-sm-down">{{ password }}</td>
    <td class="hidden-sm-down">{{ phone }}</td>
    <td class="hidden-sm-down">{{ company }}</td>
    <td class="hidden-sm-down">{{ branch }}</td>
    <td>
      
      <a @click="rowClicked(category.id)" href="user.html" class="btn light-btn customer-profile-link"
        ><i class="fa fa-eye" aria-hidden="true"></i
      ></a>
      
    </td>
  </tr>
</template>

<script>
export default {
  props: ["username", "email", "password", "phone", "company", "branch"],
  name: "UserTable",
};
</script>
