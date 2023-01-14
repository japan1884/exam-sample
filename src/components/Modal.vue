<script setup>
import Button from "./Button.vue";

defineProps({
  modelValue: Boolean,
});

const emits = defineEmits(['update:modelValue']);
</script>

<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="modelValue" class="modal-mask">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">デフォルトモーダルのヘッダーです</slot>
          </div>
          <div class="modal-main">
            <slot name="main">デフォルトモーダルのメインです</slot>
          </div>
          <hr>
          <div class="modal-footer">
            <slot name="footer">
              <div class="default-footer">
                <Button color="gray" @click="emits('update:modelValue')">
                  閉じる
                </Button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>


<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 50%;
  height: 24rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background-color: white;
  transition: all 0.3s ease;
}

.modal-header, .modal-footer {
  flex-basis: 2rem;
}

.modal-main {
  flex-grow: 1;
  overflow-y: auto;
}

.default-footer {
  text-align: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>