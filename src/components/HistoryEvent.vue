<script lang="ts" setup>
import { computed } from 'vue';

import { format_time } from '../assets/time_handler';
import type { HistoryEvent } from '../stores/history';

const props = defineProps<{event: HistoryEvent}>();
const timeStart = computed(() => props.event.timeStart.toLocaleString());
const duration = computed(() => format_time(props.event.msDuration / 1000));
</script>

<template>
    <div class="flex gap-4">
        <span>{{ timeStart }}</span>
        <span>{{ duration }}</span>
        <span class="font-bold">{{ event.name }}</span>
    </div>
</template>
