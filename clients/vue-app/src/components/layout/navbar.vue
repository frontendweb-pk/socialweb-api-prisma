<template>
    <nav>
        <ul class="flex items-center gap-4">
            <NavItem>
                <Icon :icon="Home" />
            </NavItem>
            <NavItem>
                <Icon :icon="Home" />
            </NavItem>
            <NavItem>
                <Icon :icon="Home" />
            </NavItem>
        </ul>
    </nav>
</template>
<script setup lang="ts">
import { Home } from 'lucide-vue-next';
import Icon from '../ui/icon.vue';
import NavItem from '../ui/nav-item.vue';

</script>