<script setup>
const props = defineProps({
  title: String,
});
</script>

<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>
