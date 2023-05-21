<template>
  <div class="row justify-center q-mt-xl">
    <q-card flat bordered class="col-12 col-sm-10 col-md-8 col-lg-6 q-py-lg">
      <q-card-section>
        <div class="text-h2 text-center">{{ $t("homePage.title") }}</div>
      </q-card-section>

      <q-card-section class="flex items-center justify-center q-mt-md">
        <span>
          {{ $t("homePage.letsStart") }}
        </span>
        <span class="text-h6 text-amber-10 q-ml-xs">
          {{ $t("articlesPage.articles") }}
        </span>
      </q-card-section>

      <q-separator inset />

      <q-card-actions class="q-mt-md flex justify-center">
        <q-btn
          :label="$t('homePage.goToArticles')"
          color="amber-10"
          to="/articles"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
</script>
