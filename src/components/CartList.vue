<script setup lang="ts">
import type { IFavoriteProps, IProps } from "@/assets/types/CartItemType";
import Cart from "./Cart.vue";


interface IPropsArray {
  items: IFavoriteProps[]
}

defineProps<IPropsArray>();

</script>

<template>
  <div class="grid grid-cols-4 gap-5 mt-5">
    <Cart
      v-for="item in items"
      :id = "item.id"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-added="item.isAdded"
      :is-favorite="item.isFavorite"
    />
  </div>
</template>
