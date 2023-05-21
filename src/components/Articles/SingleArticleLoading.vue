<template>
  <div class="q-mb-xl">
    <div class="text-center">
      <q-skeleton type="text" height="100px" />
    </div>
    <div class="q-mb-md">
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="circle" size="30px" class="q-mr-md" />
        </q-item-section>

        <q-item-section>
          <div class="text-light-blue-10 q-mb-sm">
            <q-skeleton width="80px" height="10px" />
          </div>
          <div caption>
            <q-skeleton width="80px" height="10px" />
          </div>
        </q-item-section>
      </q-item>
    </div>
    <q-separator />
    <div>
      <div class="q-px-sm q-py-lg">
        <q-skeleton height="250px" />
      </div>
      <div class="row justify-start ">
        <q-skeleton type="QChip" v-for="i in 4" :key="i" class="q-mr-md" />
      </div>
    </div>
  </div>
</template>
