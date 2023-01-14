<template>
  <div>
    <Label :html-for="uniqueStr">
      <slot></slot>
    </Label>
    <Input :html-id="uniqueStr" :model-value="modelValue" :is-error="!!errorMsg" @update:modelValue="emits('update:modelValue', $event)"/>
    <span v-if="!!errorMsg">{{ errorMsg }}</span>
  </div>
</template>

<script setup>
import Label from "./Label.vue";
import Input from "./Input.vue";

defineProps({
  modelValue: String,
  uniqueStr: String,
  errorMsg: String,
});

const emits = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
    color: red;
    font-size: small;
  }
}
</style>