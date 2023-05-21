<template>
  <div v-for="article in articles" :key="article.slug">
    <ArticleCard :article="article" :type="type"></ArticleCard>
  </div>
</template>

<script lang="ts" setup>
import { Article } from "src/composables/types/article";
import ArticleCard from "./ArticleCard.vue";
import { ArticleType } from "src/composables/types/global";

interface Props {
  articles: Article[];
  type: ArticleType;
}

const props = defineProps<Props>();
</script>
