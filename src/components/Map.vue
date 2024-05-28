<template>
  <div id="map"></div>
  <span>Click in the map to add a new store</span>
</template>

<script setup lang="ts">
import {
  ref,
  onUnmounted,
  onMounted,
  defineEmits,
  defineProps,
  watch,
} from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const map = ref<L.Map | null>(null);
const locations = ref([]);
const props = defineProps(["stores", "newMarkers"]);
const emit = defineEmits(["add-store"]);

const createMap = () => {
  map.value = L.map("map").setView([19.432608, -99.133209], 15);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);

  if (props.newMarkers) {
    map.value.on("click", onMapClick);
  }

  markStores();
};

const markStores = () => {
  var myIcon = L.icon({
    iconUrl: require("../assets/marker-icon.png"),
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: require("../assets/marker-shadow.png"),
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });
  props.stores?.map((s) => {
    console.log(s);
    var marker = L.marker(
      [s.location.coordinates[1], s.location.coordinates[0]],
      { icon: myIcon }
    );
    marker.addTo(map.value);

    marker.bindPopup(`Store:<br> ${s.name}.`);
  });
};

const drawLocationsToMap = () => {
  locations.value.forEach((loc) => {
    if (!loc.Marker) {
      loc.Marker = new L.marker([loc.lat, loc.lng]);
      loc.Marker.bindPopup(loc.content);
    }
    loc.Marker.addTo(map.value);
  });
};

const removeLocationsFromMap = () => {
  locations.value.forEach((loc) => {
    map.value.removeLayer(loc.Marker);
  });
};

const onMapClick = (e) => {
  var myIcon = L.icon({
    iconUrl: require("../assets/marker-icon.png"),
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: require("../assets/marker-shadow.png"),
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });
  var marker = L.marker(e.latlng, { icon: myIcon });
  removeLocationsFromMap();
  locations.value = [{ Marker: marker }];
  drawLocationsToMap();
  emit("add-store", { location: e.latlng });
  //popup
  //  .setLatLng(e.latlng)
  //  .setContent("You clicked the map at " + e.latlng.toString())
  //  .openOn(map.value);
};

onUnmounted(() => {
  try {
    map.value.destroy();
  } catch (e) {
    console.log(e);
  }
});

watch(props, () => {
  markStores();
});

onMounted(() => createMap());
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MapComponent",
});
</script>

<style scoped>
#map {
  height: 80vh;
}
</style>
