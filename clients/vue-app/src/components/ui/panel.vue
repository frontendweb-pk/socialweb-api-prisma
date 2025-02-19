<template>
  <div class="bg-white p-4 shadow-sm rounded-md z-10">
    <slot name="header"></slot>
    <div class="p-2">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
