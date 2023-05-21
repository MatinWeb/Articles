<template>
  <q-card flat bordered>
    <q-card-section v-if="postCommentErrorMessage.length">
      <q-banner
        dense
        v-for="(item, index) in postCommentErrorMessage"
        :key="index"
        class="text-red-10 bg-red-2 rounded-borders q-mb-sm items-center"
      >
        <template v-slot:avatar>
          <q-icon name="highlight_off" color="red-10" size="18px" />
        </template>
        {{ item }}
      </q-banner>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-input
        outlined
        v-model="body"
        :placeholder="$t('articlesPage.writeCommenet')"
        :disable="buttonLoading"
        hide-bottom-space
        type="textarea"
        class="full-width full-height"
      ></q-input>
    </q-card-section>
    <q-separator />
    <q-card-section class="bg-grey-3 q-pa-sm">
      <div class="row justify-between items-center full-width">
        <q-avatar v-if="article && article.author" size="35px">
          <img :src="article.author.image" />
        </q-avatar>
        <q-btn
          color="light-blue-10"
          :label="$t('articlesPage.postComment')"
          :loading="buttonLoading"
          :disable="!body"
          @click="post"
          dense
        ></q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { useGlobal } from "src/composables/useGlobal";
import { useArticle } from "src/composables/useArticle";
import { ref } from "vue";
import { useRoute } from "vue-router";

const { buttonLoading } = useGlobal();
const { PostComment, postCommentErrorMessage, article } = useArticle();
const route = useRoute();

const body = ref("");

const post = () => {
  let slug = route.params.slug as string;
  PostComment({ body: body.value }, slug);
};
</script>
