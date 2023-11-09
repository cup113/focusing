<script lang="ts" setup>
import { computed } from 'vue';
import useNowStore from '../stores/now';

const
    nowStore = useNowStore(),
    displayedTime = computed(() => nowStore.now.toLocaleTimeString());

</script>

<template>
    <div>
        <div class="text-3xl">Clock</div>
        <div class="text-8xl leading-tight border-4 border-purple-400 px-2">{{ displayedTime }}</div>
    </div>
</template>
