<template>
  <q-inner-loading :showing="showing" :label="$t('general.wait')">
    <slot v-if="hasSlot" name="loading" />
    <q-spinner v-else :color="color" :size="size" :thickness="thickness" />
  </q-inner-loading>
</template>

<script lang="ts" setup>
interface Props {
  showing: boolean;
  hasSlot?: boolean;
  color?: string;
  size?: string;
  thickness?: number;
}

const props = withDefaults(defineProps<Props>(), {
  showing: false,
  hasSlot: false,
  color: "light-blue-10",
  size: "50px",
  thickness: 2,
});
</script>
