<template>
  <div class="card">
    <div class="content">
      <span class="name">{{ store.name }}</span>
      <span class="address">{{ store.location.coordinates }}</span>
    </div>
    <div class="icon">
      <span @click="handleShowEditStore">
        <FontAwesomeIcon :icon="faPenToSquare" size="lg" />
      </span>
      <span @click="handleDeleteStore">
        <FontAwesomeIcon :icon="faTrash" size="lg" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const props = defineProps(["store"]);
const emit = defineEmits(["delete-store", "show-edit-store"]);

const handleShowEditStore = () => {
  emit("show-edit-store", { ...props.store });
};

const handleDeleteStore = async () => {
  let res = await fetch(
    `${process.env.VUE_APP_API_URL}/stores/${props.store._id}/`,
    {
      method: "DELETE",
    }
  );
  if (res.status == 200) {
    emit("delete-store");
  }
};
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StoreCard",
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #bbb;
  border-radius: 10px;
  margin-block: 0.5em;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 2;
}
.icon {
  padding-inline: 1em;
  flex: 1;
}
span {
  margin-block: 5px;
  margin-inline: 10px;
}
span.name {
  font-size: 2em;
}
span.address {
  color: gray;
  font-size: 1em;
}
</style>
