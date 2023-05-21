<template>
  <q-layout>
    <q-header elevated class="bg-light-blue-1">
      <q-toolbar class="widthWrapper q-mx-auto q-px-md justify-end">
        <div>
          <div v-if="loading" class="flex items-center">
            <q-skeleton
              type="text"
              width="60px"
              v-for="i in 3"
              class="q-mr-sm"
            />
          </div>
          <q-list class="flex" v-else>
            <q-item clickable to="/">
              <q-item-section no-wrap>
                <q-item-label class="text-blue-grey-9">
                  {{ $t("home") }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-if="user?.email">
              <div
                class="flex text-blue-grey-9 flex-center text-center non-selectable"
              >
                <q-icon name="expand_more" color="blue-grey-9" size="18px" />
                <span>
                  {{ user.username }}
                </span>
              </div>
              <q-menu fit>
                <q-list style="min-width: 60px">
                  <q-item clickable v-close-popup to="/profile">
                    <q-item-section avatar>
                      <q-icon name="person" color="blue-grey-9" size="18px" />
                    </q-item-section>
                    <q-item-section>
                      {{ $t("user.profile") }}
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="doLogOut">
                    <q-item-section avatar>
                      <q-icon name="logout" color="blue-grey-9" size="18px" />
                    </q-item-section>
                    <q-item-section>
                      {{ $t("logout") }}
                    </q-item-section>
                  </q-item>
                  <q-separator />
                </q-list>
              </q-menu>
            </q-item>
            <q-item
              v-else
              v-for="(item, index) in menuList"
              :key="index"
              clickable
              :to="item.to"
            >
              <q-item-section no-wrap>
                <q-item-label class="text-blue-grey-9">
                  {{ item.title }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding class="widthWrapper q-px-md q-py-xl q-mx-auto">
        <div v-if="loading">
          <loading-snipper :showing="loading" hasSlot>
            <template #loading>
              <q-spinner-hourglass color="light-blue-10" size="2em" />
            </template>
          </loading-snipper>
        </div>
        <router-view v-else />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import LoadingSnipper from "src/components/General/LoadingSnipper.vue";
import { useGlobal } from "src/composables/useGlobal";
import { useUser } from "src/composables/useUser";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { getUser, user, doLogOut } = useUser();
const { loading } = useGlobal();

getUser();

const menuList = ref([
  {
    title: t("authentication.login"),
    to: "/login",
  },
  {
    title: t("authentication.signUp"),
    to: "/register",
  },
]);
</script>

<style lang="scss" scoped>
.widthWrapper {
  @media only screen and(max-width: 919.99px) {
    width: 100%;
  }

  @media only screen and(min-width: 920px) and (max-width: 1023.99px) {
    width: 900px;
  }

  @media only screen and(min-width: 1024px) and (max-width: 1334.99px) {
    width: 1000px;
  }

  @media only screen and(min-width: 1335px) {
    width: 1200px;
  }
}
</style>
