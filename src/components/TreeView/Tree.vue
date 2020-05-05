<template>
  <node-tree :node="treeData" @editCat="onEditCat" @deleteCat="onDeleteCat">
  </node-tree>
</template>

<script>
import NodeTree from "./NodeTree";

export default {
  props: {
    treeData: {
      type: Object
    }
  },
  components: {
    NodeTree
  },
  methods: {
    onEditCat(catID) {
      this.$emit("edit", catID);
    },
    onDeleteCat(catID) {
      this.$emit("delete", catID);
    }
  }
};
</script>
