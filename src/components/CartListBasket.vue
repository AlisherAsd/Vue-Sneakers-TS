<script setup lang="ts">
import { inject } from 'vue';
import CartBasket from './CartBasket.vue';
import type { IFavoriteProps } from '@/assets/types/CartItemType';

const basketItems = inject<IFavoriteProps[]>("basketItems")
</script>

<template>
    <div class="flex flex-col gap-4 mt-8">
      <CartBasket v-for="item in basketItems" :key="item.id" :item="item"/>
    </div>
</template>