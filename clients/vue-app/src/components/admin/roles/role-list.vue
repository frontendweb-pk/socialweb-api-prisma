<template>
    <div>
        <ul>
            <li class="py-1 flex gap-2 items-center" v-for="role in roles" :key="role.role_id" v-memo="role">
                <input name="role" type="radio" :checked="role.role_name === authStore.state.role" />
                <span class="text-md">{{ role.role_name }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store';
import { type Role } from '@/store/roles';

const authStore = useAuthStore();

withDefaults(
    defineProps<{
        roles: Role[]
    }>(), {

})
</script>