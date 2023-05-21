<template>
  <div v-for="n in 3" :key="n">
    <q-card flat class="q-mb-md q-pt-sm">
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="circle" size="50px" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-light-blue-10">
            <q-skeleton width="100px" />
          </q-item-label>
          <q-item-label caption> <q-skeleton width="100px" /> </q-item-label>
        </q-item-section>
      </q-item>
      <q-card-section class="q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">
          <q-skeleton width="60%"  />
        </div>
        <div class="text-caption text-grey">
          <q-skeleton height="100px" />
        </div>
      </q-card-section>
      <q-card-section class="row items-center justify-between">
        <q-skeleton type="QBtn" />
        <div class="row justify-start">
          <q-skeleton type="QChip" v-for="i in 4" :key="i" />
        </div>
      </q-card-section>
    </q-card>
    <q-separator />
  </div>
</template>
