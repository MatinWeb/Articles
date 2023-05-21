<template>
  <div v-for="n in 4" :key="n" class="row justify-center q-mb-md">
    <q-card flat bordered class="col-12 col-sm-10 col-md-8 col-lg-6 ">
      <q-card-section>
        <q-skeleton height="60px" />
      </q-card-section>
      <q-separator />
      <q-card-section class="bg-grey-2">
        <div class="row jsutify-start items-center">
          <q-skeleton type="circle" size="30px" class="q-mr-md" />
          <div class="text-light-blue-10 q-mr-md">
            <q-skeleton width="80px" height="10px" />
          </div>
          <div>
            <q-skeleton width="80px" height="10px"/>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
