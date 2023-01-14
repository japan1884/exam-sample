<template>
  <button :type="buttonType" :style="styleComputed" @click="emits('click')">
    <slot></slot>
  </button>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  buttonType: {
    type: String,
    default: 'button'
  },
  color: {
    type: String,
    default: 'blue'
  }
});

const emits = defineEmits(['click']);

const styleComputed = computed(() => {
  return {
    '--color': props.color
  }
});
</script>

<style lang="scss" scoped>
button{
  --color: blue;
  background-color: var(--color);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  color: white;
  cursor: pointer;
  border-width: 0;

  &:hover{
    opacity: 80%;
  }
}
</style>