<template>
  <div class="map">
    <Map :stores="stores" :newMarkers="false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Map from "@/components/Map.vue";

const stores = ref([]);

onMounted(async () => {
  try {
    let res = await fetch(`${process.env.VUE_APP_API_URL}/stores/`);
    let data = await res.json();
    stores.value = [...data];
  } catch (e) {
    console.log(e);
  }
});
</script>
