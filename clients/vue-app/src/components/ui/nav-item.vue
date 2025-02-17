<template>
    <li class="flex items-center w-full" v-if="isMenu">
        <router-link v-bind="$attrs" custom v-slot="{ navigate, href, isActive, isExactActive }" :to="to">
            <a @click="navigate" :href="href" :class="['w-full', {
                'text-rose-600': isActive || isExactActive,
                'text-gray-700 hover:text-rose-600': !isActive && !isExactActive
            }]">
                <slot></slot>
            </a>
        </router-link>
    </li>
    <router-link v-else v-bind="$attrs" custom v-slot="{ navigate, href, isActive, isExactActive }" :to="to">
        <a @click="navigate" :href="href" :class="['w-full', {
            'text-rose-600': isActive || isExactActive,
            'text-gray-700 hover:text-rose-600': !isActive && !isExactActive
        }]">
            <slot></slot>
        </a>
    </router-link>
</template>
<script setup lang="ts">

// component options
defineOptions({ inheritAttrs: false })

// props
withDefaults(defineProps<{ to?: string; isMenu?: boolean }>(), {
    to: '/',
    isMenu: false
});

</script>