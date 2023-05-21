<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar>
        <img :src="article.author.image" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-light-blue-10">{{ article.author.username }}</q-item-label>
      <q-item-label caption>
        {{
          article.updatedAt
            ? formatDate(article.updatedAt)
            : formatDate(article.createdAt)
        }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script lang="ts" setup>
import { formatDate } from "src/Utils/handle";
import { Article } from "src/composables/types/article";
interface Props {
  article: Article;
}
const props = defineProps<Props>();
</script>
