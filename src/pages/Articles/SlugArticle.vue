<template>
  <div class="q-mb-xl">
    <div v-if="articlesLoading">
      <SingleArticleLoading />
    </div>
    <div v-else>
      <DisplayArticle :article="article"></DisplayArticle>
    </div>
  </div>
  <q-separator />
  <div class="q-mt-xl">
    <div v-if="articlesLoading && commentsLoading">
      <CommentListLoading />
    </div>
    <div v-else>
      <CommentList :comments="comments"></CommentList>
    </div>
  </div>
</template>
<script lang="ts" setup>
import DisplayArticle from "src/components/Articles/DisplayArticle.vue";
import SingleArticleLoading from "src/components/Articles/SingleArticleLoading.vue";
import CommentList from "src/components/Comment/CommentList.vue";
import CommentListLoading from "src/components/Comment/CommentListLoading.vue";
import { useArticle } from "src/composables/useArticle";
import { useRoute } from "vue-router";

const route = useRoute();
const {
  getSingleArticle,
  articlesLoading,
  article,
  getArticleComments,
  commentsLoading,
  comments,
} = useArticle();

let slug = route.params?.slug;
getSingleArticle(slug as string);
getArticleComments(slug as string);
</script>
