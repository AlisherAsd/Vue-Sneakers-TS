<script setup lang="ts">
import { onMounted, ref, watch, provide, computed } from "vue";

import CartList from "./components/CartList.vue";
import Drawer from "./components/Drawer.vue";
import Header from "./components/Header.vue";
import axios from "axios";
import type { IFavoriteProps, IProps } from "./assets/types/CartItemType";
import type { IDrawerIsVisible } from "./assets/types/DrawerOpenPayload";

interface IFavoriteId {
  itemId: number;
  id: number;
}

const items = ref<IFavoriteProps[]>([]);
const drawerOpen = ref<boolean>(false);

const sortBy = ref("title");
const searchQuery = ref("");

const onChangeSelect = (event: any) => {
  sortBy.value = event.target.value;
};

const addToFavorite = (id: number) => {
  items.value = items.value.map((item: IFavoriteProps) => {
    if (item.id === id) {
      item.isFavorite = !item.isFavorite;
      return item;
    }
    return item;
  });
};

const addToAdded = (id: number) => {
  items.value = items.value.map((item: IFavoriteProps) => {
    if (item.id === id) {
      item.isAdded = !item.isAdded;
      return item;
    }
    return item;
  });
};

const fetchItems = async () => {
  try {
    const params: Record<string, string> = {
      sortBy: sortBy.value,
    };

    if (searchQuery.value) {
      params.title = `*${searchQuery.value}*`;
    }
    const { data } = await axios.get("https://604781a0efa572c1.mokky.dev/items", {
      params,
    });
    items.value = data.map((obj: IProps) => ({
      ...obj,
      isAdded: false,
      isFavorite: false,
    }));
  } catch (err) {
    console.log(err);
  }
};

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get("https://604781a0efa572c1.mokky.dev/favorites");
    items.value = items.value.map((obj: IFavoriteProps) => {
      const favorite = data.find((objFav: IFavoriteId) => objFav.itemId === obj.id);
      if (favorite) {
        obj.isFavorite = true;
      }
      return obj;
    });
  } catch (err) {
    console.log(err);
  }
};

const fetchCreateOrder = async () => {
  try {
    const { data: any }: any = await axios.post('https://604781a0efa572c1.mokky.dev/orders', {
      items: basketItems.value,
      totalPrice: totalPrice.value,
    })

    basketItems.value = [];
    return data

  } catch (err) {
    console.log(err);
  }
}
  
const FetchData = async () => {
  await fetchItems();
  await fetchFavorites();
};

const isVsisbleDrawer = (payload: IDrawerIsVisible) => {
  drawerOpen.value = payload.isVisible;
};

const basketItems = computed(() => {
  return items.value.filter((items: IFavoriteProps) => items.isAdded === true)
})

const totalPrice = computed(() => {
  return basketItems.value.reduce((total: number, item: IFavoriteProps) => {
    return total + item.price;
  }, 0);
});

const taxFiveProventItems = computed(() => {
  return (totalPrice.value / 100) * 5
})

onMounted(FetchData);
watch(sortBy, FetchData);
watch(searchQuery, () => {
  setTimeout(FetchData, 300);
});

provide("addToFavorite", addToFavorite);
provide("addToAdded", addToAdded);
provide("basketItems", basketItems);
</script>

<template>
  <Drawer @create-order="fetchCreateOrder" :total-price="totalPrice" :tax-five-provent-items="taxFiveProventItems" v-if="drawerOpen" @drawer-close="isVsisbleDrawer" />
  <div class="bg-white min-h-400 w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice"  @drawer-open="isVsisbleDrawer" />
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold">Все кроссовки</h2>
        <div class="flex gap-4">
          <select
            @change="onChangeSelect"
            name=""
            id=""
            class="py-2 px-3 appearance-none transition text-gray-400 focus:text-gray-600 border rounded-md border-gray-200 outline-none"
          >
            <option value="name">По названию</option>
            <option value="-price">По цене - больше</option>
            <option value="price">По цене - меньше</option>
          </select>
          <div class="relative">
            <img src="/search.svg" alt="search" class="absolute left-3 top-3" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Поиск..."
              class="border transition border-gray-200 text-gray-400 focus:text-gray-600 rounded-md py-2 pr-4 pl-10 outline-none focus:border-gray-400"
            />
          </div>
        </div>
      </div>
      <CartList :items="items" />
    </div>
  </div>
</template>
