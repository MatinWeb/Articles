<template>
  <div class="row justify-center" v-if="!loading">
    <q-card class="full-width col-12 q-pt-md">
      <q-card-section class="text-center">
        <q-avatar class="q-my-md">
          <img :src="user.image" alt="profileImage" />
        </q-avatar>
        <div class="q-pa-sm text-grey-10">
          {{ user.username }}
        </div>
        <div>
          {{ user.bio }}
        </div>
      </q-card-section>

      <q-card-actions class="justify-end q-ma-md">
        <q-btn
          :label="$t('user.editProfile')"
          color="amber-10"
          outline
          flat
          to="/profile/edit"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useGlobal } from "src/composables/useGlobal";
import { useUser } from "src/composables/useUser";

const { user } = useUser();
const { loading } = useGlobal();
</script>
