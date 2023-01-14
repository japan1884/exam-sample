<template>
  <input type="text" :id="htmlId" :value="modelValue" :class="isError && 'input-error'"
         @input="emits('update:modelValue', $event.target.value)"/>
</template>

<script setup>
defineProps({
  htmlId: String,
  modelValue: String,
  isError: Boolean,
});

const emits = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
input {
  height: 3rem;
  border: 1px solid gray;
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  line-height: 2;
  outline-style: solid;
  outline-width: 0;

  &:focus-visible {
    outline-width: 2px;
    outline-color: blue;
  }
}

.input-error {
  border-color: red;

  &:focus-visible {
    outline-color: red;
  }
}
</style>