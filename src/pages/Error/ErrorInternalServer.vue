<template>
  <div
    class="fullscreen bg-deep-orange-7 text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">500</div>

      <div class="text-h2" style="opacity: 0.6">
        Oops Sorry. Something goes wrong...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="deep-orange-7"
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
