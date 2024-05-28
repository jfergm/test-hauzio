<template>
  <section>
    <div class="map">
      <Map
        @add-store="showAddStore($event)"
        :stores="stores"
        :newMarkers="true"
      />
    </div>
    <div class="container" v-if="section == Section.List">
      <div v-if="loading">
        <span>loading...</span>
      </div>
      <StoreCard
        v-for="store in stores"
        :store="store"
        @delete-store="deleteStore(store, $event)"
        @show-edit-store="showEditStore($event)"
        :key="store._id"
      ></StoreCard>
    </div>
    <div class="container" v-if="section == Section.Add">
      <h2>Add Store</h2>
      <AddStore :location="location" @added-store="handleAddedStore($event)" />
    </div>
    <div class="container" v-if="section == Section.Update">
      <h2>Update Store</h2>
      <EditStore :store="store" @edited-store="handleEditedStore($event)" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

enum Section {
  List,
  Add,
  Update,
}

const stores = ref([]);
const loading = ref(true);

const section = ref(Section.List);
const location = ref([]);
const store = ref({});

const deleteStore = (store) => {
  stores.value = stores.value.filter((s) => s._id != store._id);
};

const handleAddedStore = (store) => {
  stores.value = [...stores.value, store];
  section.value = Section.List;
};

const handleEditedStore = (store) => {
  stores.value = stores.value.map((s) => {
    if (s._id == store._id) {
      return store;
    }
    return s;
  });
  section.value = Section.List;
};

const showAddStore = (event) => {
  section.value = Section.Add;
  location.value = { ...event.location };
};

const showEditStore = (event) => {
  section.value = Section.Update;
  store.value = { ...event };
};

onMounted(async () => {
  try {
    let res = await fetch(`${process.env.VUE_APP_API_URL}/stores/`);
    let data = await res.json();
    stores.value = [...data];
  } catch (e) {
    console.log(e);
  }
  loading.value = false;
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
import StoreCard from "@/components/StoreCard.vue";
import Map from "@/components/Map.vue";
import AddStore from "@/components/AddStore.vue";
import EditStore from "@/components/EditStore.vue";

export default defineComponent({
  name: "AdminView",
  components: {
    StoreCard,
    Map,
    AddStore,
  },
});
</script>

<style scoped>
section {
  display: flex;
}
.map {
  width: 65%;
}
.container {
  width: 35%;
  flex-direction: column;
  padding-inline: 2em;
}
a {
  margin-inline: 0.5em;
  border: 1px solid #bbb;
  padding-block: 0.5em;
  padding-inline: 1em;
  border-radius: 5px;
  background-color: white;
}
a:hover {
  cursor: pointer;
  opacity: 50%;
}

section {
  padding-inline: 5em;
}
h2 {
  text-align: start;
}
</style>
