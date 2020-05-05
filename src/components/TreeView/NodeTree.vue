<template>
  <a
    class="list-group-item list-group-item-action flex-column align-items-start"
  >
    <div class="d-flex w-100 justify-content-between">
      <div>
        <h5 class="mb-1">{{ node.name }}</h5>
      </div>
      <div class="action_btn">
        <small
          ><a @click="editCat(node.id)" title="Edit" class="btn btn-sm edit"
            ><i class="material-icons">&#xE254;</i></a
          ></small
        >
        <small
          ><a
            @click="deleteCat(node.id)"
            title="Delete"
            class="btn btn-sm delete"
            ><i class="material-icons">&#xE872;</i></a
          ></small
        >
      </div>
    </div>
    <p class="mb-1">
      Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
      risus varius blandit.Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
      risus varius blandit.
    </p>
    <a @click="toggleChildren" class="btn btn-sm"
      ><i
        v-if="!showChildren && node.children && node.children.length > 0"
        class="material-icons"
        >unfold_more</i
      ></a
    >
    <a @click="toggleChildren" class="btn btn-sm"
      ><i v-if="showChildren" class="material-icons">unfold_less</i></a
    >
    <div
      class="list-group"
      v-if="showChildren && node.children && node.children.length > 0"
    >
      <node-tree
        v-for="(child, i) in node.children"
        :key="i"
        :node="child"
        @editCat="editCat"
      ></node-tree>
    </div>
  </a>

  <!-- <li>

        <a @click="toggleChildren">
          <i v-if="!showChildren" class="fa fa-chevron-circle-down block-icon" aria-hidden="true"></i>
           <i v-if="showChildren" class="fa fa-chevron-circle-up block-icon" aria-hidden="true"></i>
          {{node.name}}</a>
          <a @click="editCat(node.id)" title="Edit" class="btn btn-sm edit"><i class="material-icons">&#xE254;</i></a>
        <a @click="editCat(node.id)" title="Edit" class="btn btn-sm edit"><i class="material-icons">&#xE872;</i></a>

        <div v-if="showChildren">
        <ul v-if="node.children && node.children.length > 0">
          <p class="menu-label">الفئات الفرعية</p>
            <node-tree v-for="(child,i) in node.children" :key="i" :node="child" @editCat="editCat"></node-tree>
        </ul>
        <div class="cat-empty" v-else>لا يوجد فئات أخرى</div>
        </div>
  </li>-->
</template>

<script>
export default {
  name: "NodeTree",
  components: {},
  props: {
    node: Object
  },
  data() {
    return { showChildren: false };
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren;
    },
    editCat(id) {
      this.$emit("editCat", id);
    },
    deleteCat(id) {
      this.$emit("deleteCat", id);
    }
  }
};
</script>

<style scoped>
.action_btn .edit {
  color: #ffc107;
}

.action_btn .delete {
  color: #e34724;
}
</style>
