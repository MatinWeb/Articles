<template>
  <div class="row justify-center">
    <q-form class="col-12 col-sm-10 col-md-8 col-lg-6" @submit="onSubmit">
      <q-card flat class="full-width">
        <q-card-section v-if="updateErrorMessage.length">
          <q-banner
            dense
            v-for="(item, index) in updateErrorMessage"
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
            v-model="profile.username"
            :label="$t('authentication.username')"
            :rules="[rules.Required]"
            :disable="authLoading"
            hide-bottom-space
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="profile.bio"
            :label="$t('authentication.bio')"
            :disable="authLoading"
            hide-bottom-space
            type="textarea"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="profile.email"
            :label="$t('authentication.email')"
            :rules="[rules.Required, rules.email]"
            :disable="authLoading"
            type="textarea"
            hide-bottom-space
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="profile.password"
            :label="$t('authentication.password')"
            :rules="[rules.Required, rules.MinLength]"
            :type="isPwd ? 'password' : 'text'"
            :disable="authLoading"
            hide-bottom-space
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions class="justify-end">
          <q-btn
            :label="$t('user.updateProfile')"
            type="submit"
            color="amber-10"
            :loading="authLoading"
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
import { useUser } from "src/composables/useUser";
import { UserMeUpdate } from "src/composables/types/user";
import { watchEffect } from "vue";

const { updateUser, authLoading, updateErrorMessage, user } = useUser();

const isPwd = ref(true);
const profile = ref<UserMeUpdate>({
  username: "",
  email: "",
  bio: "",
  password: "",
  image: "",
});

watchEffect(() => {
  if (user.value && user.value.email) {
    const { token, ...otherUser } = user.value;
    profile.value = {
      password: "",
      ...otherUser,
    };
  }
});

const onSubmit = () => {
  updateUser(profile.value);
};
</script>
