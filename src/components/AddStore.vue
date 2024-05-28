<template>
  <div>
    <InputComponent
      label="Name"
      :modelValue="name"
      name="name"
      @update:modelValue="handleUpdate($event)"
    />
    <InputComponent
      label="Location"
      :modelValue="locationComp"
      name="location"
      :disabled="true"
    />
    <button @click="handleAddStore" :disabled="name == ''">Add</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, computed, defineEmits } from "vue";
import InputComponent from "@/components/Input.vue";
const name = ref("");
const props = defineProps(["location"]);
const emit = defineEmits(["added-store"]);

const handleUpdate = (event: string) => {
  name.value = event;
};

const handleAddStore = async () => {
  try {
    let res = await fetch(`${process.env.VUE_APP_API_URL}/stores/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        location: props.location,
      }),
    });

    let added = await res.json();
    if (res.status == 201) {
      emit("added-store", added);
    }
  } catch (e) {
    console.log(e);
  }
};

const locationComp = computed(() => {
  return `${props.location.lat}, ${props.location.lng}`;
});
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddStore",
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
