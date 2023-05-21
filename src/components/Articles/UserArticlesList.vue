<template>
  <div v-if="articlesLoading" class="full-height">
    <ArticlesListLoading />
  </div>
  <div v-else>
    <ArticlesList
      :articles="userArticles"
      :type="ArticleType.USER"
    ></ArticlesList>
  </div>
  <div class="row justify-center full-width q-mt-lg" v-if="userArticlesCount">
    <q-pagination
      v-model="current"
      :max="userArticlesCount"
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
import { useRouter } from "vue-router";
import { watch } from "vue";
import { ArticleType } from "src/composables/types/global";

const router = useRouter();
interface Props {
  page?: number;
}
const props = defineProps<Props>();

const { getAllFeedArticles, userArticles, userArticlesCount, articlesLoading } =
  useArticle();

const current = ref(1);
const limit = ref(10);

watch(
  () => current.value,
  (newVal) => {
    if (newVal) {
      getAllFeedArticles(limit.value, current.value - 1).then(() => {
        router.push({
          name: "Articles",
          query: { type: ArticleType.USER, offset: current.value },
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
    getAllFeedArticles(limit.value, current.value - 1);
  },
  {
    immediate: true,
  }
);
</script>
