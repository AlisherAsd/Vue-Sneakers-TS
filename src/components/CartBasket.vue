<script setup lang="ts">
import type { IFavoriteProps } from '@/assets/types/CartItemType';
import { inject } from 'vue';

const props = defineProps<{item: IFavoriteProps}>();
const addToAdded = inject("addToAdded");

const onClickAdd = (id: number) => {
  addToAdded(id);
};

</script>

<template>
    <div class="w-full cursor-pointer hover:-translate-y-1 hover:shadow-xl transition flex gap-4 border border-slate-100 p-4 rounded-2xl">
        <img class="w-16 h-16" :src="props.item.imageUrl" alt="Sneanker" />
        <div class="flex justify-between gap-1">
            <div class="flex flex-col justify-center">
                <p>{{ props.item.title }}</p>
                <b>{{ props.item.price }} руб.</b>
            </div>
        </div>
        <img src="/close.svg" @click="addToAdded(props.item.id)" alt="close">
    </div>
</template>