<template>
  <div class="row justify-center q-mb-md">
    <div class="col-12 col-sm-10 col-md-8 col-lg-6">
      <div
        class="row justify-start items-center full-width"
        v-if="!user?.email"
      >
        <router-link to="/register" class="text-light-blue-10">
          {{ $t("authentication.signUp") }}
        </router-link>
        <span class="q-mx-sm">
          {{ $t("general.or") }}
        </span>
        <router-link to="/login" class="text-light-blue-10">
          {{ $t("authentication.login") }}
        </router-link>
        <span class="q-mx-sm">
          {{ $t("articlesPage.addCommentWithAthenticate") }}
        </span>
      </div>
      <div v-else>
        <AddComment></AddComment>
      </div>
      <div
        v-if="comments.length"
        v-for="comment in comments"
        :key="comment.id"
        class="full-width q-mt-md"
      >
        <DisplayCard :comment="comment"></DisplayCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Comment } from "src/composables/types/article";
import DisplayCard from "./DisplayCard.vue";
import { useUser } from "src/composables/useUser";
import AddComment from "./AddComment.vue";

const { user } = useUser();

interface Props {
  comments: Comment[];
}

const props = defineProps<Props>();
</script>
