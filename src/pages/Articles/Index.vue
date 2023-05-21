<template>
  <div class="row items-start q-gutter-md full-width">
    <q-card bordered flat class="col-12 q-pa-md" style="min-height: 80vh">
      <q-card-section class="q-mb-md" v-if="user.email">
        <q-btn
          :label="$t('articlesPage.new')"
          color="light-blue-10"
          to="/cteate-article"
        />
      </q-card-section>
      <q-tabs
        mobile-arrows
        v-model="tab"
        dense
        align="left"
        class="text-amber-10 text-right"
      >
        <q-tab
          :label="$t('articlesPage.globalArticles')"
          :name="ArticleType.GLOBAL"
        />
        <q-tab
          :label="$t('articlesPage.yourArticles')"
          :name="ArticleType.USER"
          v-if="user.email"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel :name="ArticleType.GLOBAL" class="full-height">
          <GlobalArticlesList
            :page="query.type === ArticleType.GLOBAL ? query.page : 0"
          ></GlobalArticlesList>
        </q-tab-panel>

        <q-tab-panel
          :name="ArticleType.USER"
          v-if="user.email"
          class="full-height"
        >
          <UserArticlesList
            :page="query.type === ArticleType.USER ? query.page : 0"
          ></UserArticlesList>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import GlobalArticlesList from "src/components/Articles/GlobalArticlesList.vue";
import UserArticlesList from "src/components/Articles/UserArticlesList.vue";
import { ArticleType } from "src/composables/types/global";
import { useUser } from "src/composables/useUser";
import { watch } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const { user } = useUser();

const router = useRouter();
const route = useRoute();

const tab = ref(ArticleType.GLOBAL);

const query = ref({
  page: 0,
  type: "",
});

if (route?.query && route?.query?.offset) {
  tab.value = route.query.type as ArticleType;
  query.value = {
    page: +route.query.offset,
    type: route.query.type as ArticleType,
  };
}

watch(
  () => tab.value,
  (newVal) => {
    if (newVal) {
      router.push({ name: "Articles" });
    }
  }
);
</script>
