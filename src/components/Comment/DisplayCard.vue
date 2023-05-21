<template>
  <q-card flat bordered>
    <q-card-section class="text-grey-9">
      {{ comment.body }}
    </q-card-section>
    <q-separator />
    <q-card-section class="bg-grey-2">
      <div class="row jsutify-start items-center">
        <q-avatar size="25px">
          <img :src="comment.author.image" />
        </q-avatar>
        <q-item-label
          class="text-light-blue-10 q-mx-sm"
          style="font-size: 0.75em"
          >{{ comment.author.username }}</q-item-label
        >
        <q-item-label caption class="q-mb-xs" style="font-size: 0.75em">
          {{
            comment.updatedAt
              ? formatDate(comment.updatedAt)
              : formatDate(comment.createdAt)
          }}
        </q-item-label>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { formatDate } from "src/Utils/handle";
import { Comment } from "src/composables/types/article";

interface Props {
  comment: Comment;
}
const props = defineProps<Props>();
</script>
