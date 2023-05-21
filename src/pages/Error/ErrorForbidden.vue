<template>
  <div
    class="fullscreen bg-red-6 text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">403</div>

      <div class="text-h2" style="opacity: 0.6">You are not allowed...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="red-6"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
});
</script>
