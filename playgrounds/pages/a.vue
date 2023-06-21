<script setup lang="ts">
const comment = ref("")
const another = ref("")
useSnapshot([
  { capture: comment, restore: (v) => { comment.value = toValue(v) } },
  { capture: another, restore: (v) => { another.value = toValue(v) }, persist: false }
])
</script>

<template>
  <NuxtLink to="/a">
    A
  </NuxtLink>
  <NuxtLink to="/b">
    B
  </NuxtLink>
  <input v-model="comment" type="text">
  <input v-model="another" type="text">
</template>
