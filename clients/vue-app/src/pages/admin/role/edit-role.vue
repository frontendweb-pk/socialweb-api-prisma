<template>
    <Form @submit.prevent="onSumit">
        <Input />
    </Form>
</template>
<script setup lang="ts">
import Form from '@/components/ui/form.vue';
import Input from '@/components/ui/input.vue';
import { useForm } from "vee-validate"
import { ref } from 'vue';
const values = ref({
    role_name: ''
})
// form values
const form = useForm({
    values
})
function onSumit() {
    console.log('submit')
}
</script>