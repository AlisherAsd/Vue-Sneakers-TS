<script setup lang="ts">
import { inject } from "vue";

interface IProps {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  isFavorite: boolean;
  isAdded: boolean;
}

defineProps<IProps>();

const addToFavorite = inject("addToFavorite");
const addToAdded = inject("addToAdded");

const onClickFavorite = (id: number) => {
  addToFavorite(id);
};
const onClickAdd = (id: number) => {
  addToAdded(id);
};
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
  >
    <img
      @click="onClickFavorite(id)"
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
      alt="like 1"
      class="absolute top-8 left-8"
    />
    <img :src="imageUrl" alt="Sneanker" />
    <p class="mt-3">{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена: </span>
        <span>{{ price }} руб.</span>
      </div>

      <img @click="onClickAdd(id)" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="plus" />
    </div>
  </div>
</template>
