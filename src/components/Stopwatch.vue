<script lang="ts" setup>
import { computed } from 'vue';

import { format_time } from '../assets/time_handler';
import useStopwatchStore from '../stores/stopwatch';

const stopwatchStore = useStopwatchStore();

const displayedTime = computed(() => format_time(stopwatchStore.durationSeconds));

</script>

<template>
    <div>
        <div class="text-3xl">Stopwatch</div>
        <div class="my-2">
            <span>Tag&nbsp;</span>
            <input type="text" name="tag" v-model="stopwatchStore.tag" placeholder="Tag" required
                class="w-60 inner-input">
        </div>
        <div class="text-8xl leading-tight border-4 border-yellow-400 px-2">{{ displayedTime }}</div>
        <div>
            <button @click="stopwatchStore.stop()" v-if="stopwatchStore.running" class="button">Stop</button>
            <button @click="stopwatchStore.start()" v-else class="button">Start</button>
            <button @click="stopwatchStore.reset()" class="button">Reset</button>
        </div>
    </div>
</template>

<style scoped>
.button {
    @apply text-2xl border-2 border-black mx-2 px-2 bg-cyan-800;
}
</style>
