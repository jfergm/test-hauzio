<template>
  <div>
    <InputComponent
      label="Name"
      :modelValue="props.store.name"
      name="name"
      @update:modelValue="handleUpdate($event)"
    />
    <InputComponent
      label="Location"
      :modelValue="locationComp"
      name="location"
      :disabled="true"
    />
    <button @click="handleAddStore" :disabled="name == ''">Update</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, computed, defineEmits, onMounted } from "vue";
import InputComponent from "@/components/Input.vue";
const props = defineProps(["store"]);
const name = ref("");
const emit = defineEmits(["edited-store"]);

const handleUpdate = (event: string) => {
  name.value = event;
};

const handleAddStore = async () => {
  try {
    let res = await fetch(
      `${process.env.VUE_APP_API_URL}/stores/${props.store._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
        }),
      }
    );

    let edited = await res.json();
    if (res.status == 200) {
      emit("edited-store", edited);
    }
  } catch (e) {
    console.log(e);
  }
};

const locationComp = computed(() => {
  return `${props.store.location.coordinates[1]}, ${props.store.location.coordinates[0]}`;
});

onMounted(() => {
  name.value = props.store.name;
});
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EditStore",
});
</script>

<style scoped>
button {
  margin-inline: 0.5em;
  border: 1px solid #bbb;
  padding-block: 0.5em;
  padding-inline: 1em;
  border-radius: 5px;
  background-color: white;
  width: 50%;
}

button:hover {
  opacity: 50%;
  cursor: pointer;
}
button:disabled {
  opacity: 50%;
  cursor: not-allowed;
}
</style>
