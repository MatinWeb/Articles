<template>
  <div class="row justify-center">
    <q-form
      loading
      class="col-12 col-sm-10 col-md-8 col-lg-6"
      @submit="onSubmit"
    >
      <q-card flat class="full-width">
        <q-card-section>
          <div class="text-h4 text-center">
            {{ $t("authentication.signUp") }}
          </div>
          <div class="text-center q-mt-sm">
            <q-btn
              :label="$t('authentication.haveAnAccount')"
              flat
              color="light-blue-10"
              to="/login"
              :disable="authLoading"
            />
          </div>
        </q-card-section>
        <q-card-section v-if="authErrorMessage.length">
          <q-banner
            dense
            v-for="(item, index) in authErrorMessage"
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
            v-model="register.username"
            :label="$t('authentication.username')"
            :rules="[rules.Required]"
            :disable="authLoading"
            hide-bottom-space
          />
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="register.email"
            :label="$t('authentication.email')"
            :rules="[rules.Required, rules.email]"
            :disable="authLoading"
            hide-bottom-space
          />
        </q-card-section>

        <q-card-section>
          <q-input
            outlined
            v-model="register.password"
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

        <q-card-actions class="justify-center">
          <q-btn
            :label="$t('authentication.signUp')"
            type="submit"
            color="light-blue-10"
            :loading="authLoading"
           style="max-width: 300px; width: 60%;"
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

const { doRegister, authErrorMessage, authLoading } = useUser();
authErrorMessage.value = [];

const isPwd = ref(true);
const register = ref({
  username: "",
  email: "",
  password: "",
});

const onSubmit = () => {
  doRegister(register.value);
};
</script>
