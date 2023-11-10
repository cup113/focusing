<script lang="ts" setup>
import { computed } from 'vue';

import useHistoryStore from '../stores/history';

import HistoryEvent from './HistoryEvent.vue';

const historyStore = useHistoryStore();

const start = computed({
    get() {
        return historyStore.viewSetting.start.toString();
    },
    set(value: string) {
        const val = parseInt(value);
        if (val <= 0 || isNaN(val)) {
            return;
        }
        historyStore.viewSetting.start = val;
    },
});

const items = computed({
    get() {
        return historyStore.viewSetting.items.toString();
    },
    set(value: string) {
        const val = parseInt(value);
        if (val <= 0 || isNaN(val)) {
            return;
        }
        historyStore.viewSetting.items = val;
    },
});
</script>

<template>
    <div>
        <div class="text-3xl">History</div>
        <div>
            <span>From</span><input type="number" placeholder="from #item" v-model="start" class="inner-input w-16">,
            <span>Items</span><input type="number" placeholder="from #item" v-model="items" class="inner-input w-16">
            ({{ historyStore.queryResult.start }}~{{ historyStore.queryResult.end }} / {{ historyStore.events.length }})
        </div>
        <div>
            <div v-for="event in historyStore.queryResult.events">
                <HistoryEvent :event="event"></HistoryEvent>
            </div>
        </div>
    </div>
</template>
