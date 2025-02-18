<template>
    <div class="flex items-center justify-between mb-3">
        <div>
            <h1 class="text-2xl font-semibold">{{ title }}</h1>
            <ul></ul>
        </div>
        <Button color="primary">Add Role</Button>
    </div>
</template>

<script setup lang="ts">
import Button from './button.vue';

import { } from "@vueuse/core