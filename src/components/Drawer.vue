<script setup lang="ts">
import type { IDrawerIsVisible } from "@/assets/types/DrawerOpenPayload";
import CartListBasket from "./CartListBasket.vue";

interface IProps {
  totalPrice: number;
  taxFiveProventItems: number;
}

const props = defineProps<IProps>();

const emit = defineEmits<{
  drawerClose: (payload: IDrawerIsVisible) => void;
  createOrder: () => void;
}>();

const handlerDrawerClose = () => {
  emit("drawerClose", {
    isVisible: false,
  });
};

const handlerCreateOrders = () => {
  emit("createOrder");
};
</script>

<template>
  <div
    @click="handlerDrawerClose"
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
  ></div>
  <div class="bg-white p-8 w-96 h-full fixed scroll-auto z-20 top-0 right-0">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Корзина</h2>
      <h4
        @click="handlerDrawerClose"
        class="text-case cursor-pointer uppercase transition hover:text-red-500 hover:-translate-x-1"
      >
        закрыть
      </h4>
    </div>
    <CartListBasket />

    <div class="flex flex-col my-7 gap-4">
      <div class="flex gap-4">
        <span>Итого: </span>
        <div class="flex-1 border-b border-gray-200 border-dashed"></div>
        <b>{{ props.totalPrice ? props.totalPrice : 0 }} руб.</b>
      </div>
      <div class="flex gap-2">
        <span>Налог 5%: </span>
        <div class="flex-1 border-b border-gray-200 border-dashed"></div>
        <b>{{ props.taxFiveProventItems ? props.taxFiveProventItems : 0 }} руб.</b>
      </div>

      <button
      :disabled="totalPrice ? false : true"
        @click="handlerCreateOrders"
        class="bg-lime-500 my-2 cursor-pointer w-full rounded-xl disabled:bg-slate-400 py-3 transition text-white hover:bg-lime-600 active:bg-lime-700"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>
