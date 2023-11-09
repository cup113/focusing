import { defineStore } from 'pinia';
import { ref } from 'vue';

const useNowStore = defineStore("now", () => {
    const now = ref(new Date());

    setInterval(() => {
        now.value = new Date();
    }, 1000);

    return {
        now
    };
});

export default useNowStore;
