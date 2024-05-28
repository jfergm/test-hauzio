<template>
  <div class="group">
    <label>{{ props.label }}</label>
    <input
      :name="props.name"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["label", "modelValue", "name", "disabled"]);
</script>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputComponent",
});
</script>
<style scoped>
.group {
  margin: 0.5em;
  padding-inline: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: start;
}
input {
  width: 100%;
  margin-block: 0.5em;
  border-radius: 5px;
  border-width: 1px;
  padding-inline: 1em;
  padding-block: 0.5em;
}
</style>
