<template>
  <label :for="htmlFor">
    <slot></slot>
  </label>
</template>

<script setup>
defineProps({
  htmlFor: String
})
</script>

<style lang="scss" scoped>

</style>