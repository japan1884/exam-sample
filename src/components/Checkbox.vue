<template>
  <input type="checkbox" :id="htmlId" :checked="modelValue" @change="emits('update:modelValue', $event.target.checked)"/>
</template>

<script setup>
defineProps({
  htmlId: String,
  modelValue: Boolean,
});

const emits = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
input {
  border: 1px solid gray;
  border-radius: 0.25rem;
}
</style>