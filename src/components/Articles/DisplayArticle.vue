<template>
  <div>
    <h3 class="text-light-blue-10 text-cetner">
      {{ article.title }}
    </h3>
    <div class="q-mb-md">
      <DisplayAuthor :article="article"></DisplayAuthor>
    </div>
    <q-separator />
    <div>
      <div class="text-grey-7 q-px-sm q-py-lg">
        {{ article.body }}
      </div>
      <div>
        <q-chip
          outline
          size="12px"
          color="grey-5"
          v-for="tag in article.tagList"
          :key="tag"
          >{{ tag }}</q-chip
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Article } from "src/composables/types/article";
import DisplayAuthor from "./displayAuthor.vue";

interface Props {
  article: Article;
}

const props = defineProps<Props>();
</script>
