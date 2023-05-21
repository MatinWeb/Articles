<template>
  <div>
    <q-card flat class="q-mb-md q-pt-sm">
      <div class="row justify-between items-center">
        <DisplayAuthor :article="article"></DisplayAuthor>
        <div class="cursor-pointer" @click="addToFavorite">
          <q-chip
            :outline="article.favorited ? false : true"
            color="green-6"
            text-color="white"
            icon="favorite"
            :disable="favoriteLoading"
          >
            {{ article.favoritesCount }}
          </q-chip>
        </div>
      </div>

      <q-card-section class="q-pt-xs cursor-pointer" @click="goToArticlePage">
        <div class="text-h5 q-mt-sm q-mb-xs">{{ article.title }}</div>
        <div class="text-caption text-grey">{{ article.description }}</div>
      </q-card-section>
      <q-card-section class="row items-center justify-between">
        <q-btn
          flat
          color="grey-5"
          dense
          size="10px"
          :label="$t('general.readMore')"
          :to="{ name: 'SlugArticle', params: { slug: article.slug } }"
        />
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
      </q-card-section>
    </q-card>
    <q-separator />
  </div>
</template>

<script lang="ts" setup>
import { Article } from "src/composables/types/article";
import { useRouter } from "vue-router";
import DisplayAuthor from "./displayAuthor.vue";
import { useArticle } from "src/composables/useArticle";
import { ArticleType } from "src/composables/types/global";
import { useUser } from "src/composables/useUser";

const router = useRouter();
const { favoriteAnArticle, favoriteLoading } = useArticle();
const { user } = useUser();
interface Props {
  article: Article;
  type: ArticleType;
}
const props = defineProps<Props>();

const goToArticlePage = () => {
  router.push({ name: "SlugArticle", params: { slug: props.article.slug } });
};

const addToFavorite = () => {
  if (user.value && user.value.email) {
    favoriteAnArticle(props.article.slug, props.type);
  } else {
    router.push({ name: "Login" });
  }
};
</script>
