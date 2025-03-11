<script setup lang="ts">
import type { IDrawerIsVisible } from "@/assets/types/DrawerOpenPayload";

interface IProps {
  totalPrice: number
}

const props = defineProps<IProps>();

const emit = defineEmits<{
  (event: "drawerOpen", payload: IDrawerIsVisible): void;
}>();

const handlerDrawerOpen = () => {
  emit("drawerOpen", {
    isVisible: true,
  });
};
</script>

<template>
  <header class="flex justify-between border-b border-slate-300 px-8 py-8">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="logo" class="w-10" />
      <div>
        <h1 class="text-xl font-bold uppercase">Vue Sneakers</h1>
        <p class="text-slate-400">Магазин лучших кроссовок</p>
      </div>
    </div>
    <ul class="flex items-center gap-3">
      <li class="flex items-center gap-3 text-gray-500 hover:text-black">
        <img src="/cart.svg" alt="cart" />
        <b>{{ props.totalPrice }} руб.</b>
      </li>
      <li @click="handlerDrawerOpen" class="flex items-center gap-3 text-gray-500 hover:text-black">
        <img src="/cart.svg" alt="cart" />
        <span>Закладки</span>
      </li>
      <li class="flex items-center gap-3 text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="cart" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>
