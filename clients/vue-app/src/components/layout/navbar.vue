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
            <li>
                <UserController />
            </li>
        </ul>
    </nav>
</template>
<script setup lang="ts">
import { Home } from 'lucide-vue-next';
import Icon from '../ui/icon.vue';
import NavItem from '../ui/nav-item.vue';
import UserController from '../shared/user-controller.vue';

</script>