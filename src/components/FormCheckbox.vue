<template>
  <div>
    <Checkbox :html-id="uniqueStr" :model-value="modelValue" @update:modelValue="emits('update:modelValue', $event)"/>
    <Label :html-for="uniqueStr">
      <slot></slot>
    </Label>
  </div>
</template>

<script setup>
import Label from "./Label.vue";
import Checkbox from "./Checkbox.vue";

defineProps({
  modelValue: Boolean,
  uniqueStr: String,
});

const emits = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
}
</style>