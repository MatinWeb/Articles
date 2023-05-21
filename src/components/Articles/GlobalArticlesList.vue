<template>
  <div v-if="articlesLoading" class="full-height">
    <ArticlesListLoading />
  </div>
  <div v-else>
    <ArticlesList
      :articles="articles"
      :type="ArticleType.GLOBAL"
    ></ArticlesList>
  </div>
  <div
    class="row justify-center full-width q-mt-lg"
    v-if="generalArticlesCount"
  >
    <q-pagination
      v-model="current"
      :max="generalArticlesCount"
      :max-pages="6"
      direction-links
      :boundary-numbers="false"
    />
  </div>
  <div v-else>
    <p class="text-h6 text-blue-grey-6">
      {{ $t("articlesPage.noUserArticle") }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useArticle } from "src/composables/useArticle";
import ArticlesList from "./ArticlesList.vue";
import { ref } from "vue";
import ArticlesListLoading from "./ArticlesListLoading.vue";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
import { ArticleType } from "src/composables/types/global";

const router = useRouter();

interface Props {
  page?: number;
}
const props = defineProps<Props>();

const {
  getAllGeneralArticles,
  articles,
  generalArticlesCount,
  articlesLoading,
} = useArticle();

const current = ref(1);
const limit = ref(10);

watch(
  () => current.value,
  (newVal) => {
    if (newVal) {
      getAllGeneralArticles(limit.value, current.value - 1).then(() => {
        router.push({
          name: "Articles",
          query: { type: ArticleType.GLOBAL, offset: current.value },
        });
      });
    }
  }
);

watch(
  () => props.page,
  (newVal) => {
    if (newVal && newVal > 0) {
      current.value = newVal;
    }
    getAllGeneralArticles(limit.value, current.value - 1);
  },
  {
    immediate: true,
  }
);
</script>
