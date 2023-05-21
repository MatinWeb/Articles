<template>
  <div class="row justify-center">
    <q-form class="col-12 col-sm-10 col-md-8 col-lg-6" @submit="onSubmit">
      <q-card flat class="full-width">
        <q-card-section v-if="publishArticleErrorMessage.length">
          <q-banner
            dense
            v-for="(item, index) in publishArticleErrorMessage"
            :key="index"
            class="text-red-10 bg-red-2 rounded-borders q-mb-sm items-center"
          >
            <template v-slot:avatar>
              <q-icon name="highlight_off" color="red-10" size="18px" />
            </template>
            {{ item }}
          </q-banner>
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="article.title"
            :label="$t('articlesPage.articleTitle')"
            :rules="[rules.Required]"
            :disable="buttonLoading"
            hide-bottom-space
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="article.description"
            :label="$t('articlesPage.articleDescription')"
            :rules="[rules.Required]"
            :disable="buttonLoading"
            hide-bottom-space
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="article.body"
            :label="$t('articlesPage.articleBody')"
            :rules="[rules.Required]"
            :disable="buttonLoading"
            type="textarea"
            hide-bottom-space
          />
        </q-card-section>
        <q-card-section>
          <q-select
            :label="$t('articlesPage.enterTags')"
            outlined
            v-model="article.tagList"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            :rules="[rules.Required]"
            :disable="buttonLoading"
            hide-bottom-space
            input-debounce="0"
            @new-value="createValue"
            :hint="$t('articlesPage.tagHint')"
          />
        </q-card-section>

        <q-card-actions class="justify-end">
          <q-btn
            :label="$t('articlesPage.publishArticle')"
            type="submit"
            color="amber-10"
            :loading="buttonLoading"
            outline
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { rules } from "src/Utils/Validations";
import { useGlobal } from "src/composables/useGlobal";
import { useArticle } from "src/composables/useArticle";

const { buttonLoading } = useGlobal();
const { createArticle, publishArticleErrorMessage } = useArticle();

const article = ref({
  title: "",
  body: "",
  description: "",
  tagList: [],
});

const createValue = (val: any, done: any) => {
  done(val, "add-unique");
};

const onSubmit = () => {
  createArticle(article.value);
};
</script>
