import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useLocalStorage, useTitle, useDebounceFn } from '@vueuse/core';

import useNowStore from "./now";
import useHistoryStore from "./history";

function date_read(raw: string): Date {
    return new Date(raw);
}

function date_write(value: Date): string {
    return value.toJSON();
}

const DATE_SERIALIZER = {
    read: date_read,
    write: date_write,
}

const useStopwatchStore = defineStore("stopwatch", () => {
    const nowStore = useNowStore();

    const startTime = useLocalStorage("FO_startTime", nowStore.now, { serializer: DATE_SERIALIZER });
    const deductedStartTime = useLocalStorage("FO_deductedStartTime", nowStore.now, { serializer: DATE_SERIALIZER });
    const endTime = useLocalStorage("FO_endTime", nowStore.now, { serializer: DATE_SERIALIZER });
    const durationSeconds = computed(() => {
        return Math.round((endTime.value.getTime() - deductedStartTime.value.getTime()) / 1000);
    });
    const running = ref(false);
    const tag = useLocalStorage("FO_tag", "Default Task");

    const title = useTitle();
    const debouncedChangeTitle = useDebounceFn((val: string) => {
        title.value = `${val} - Focuser`;
    }, 500);
    watch(tag, val => {
        debouncedChangeTitle(val);
    }, { immediate: true });

    nowStore.$subscribe((_, state) => {
        if (running.value) {
            endTime.value = state.now;
        }
    });

    function start() {
        running.value = true;
        deductedStartTime.value = new Date(deductedStartTime.value.getTime() + nowStore.now.getTime() - endTime.value.getTime());
        endTime.value = nowStore.now;
    }

    function stop() {
        running.value = false;
    }

    function reset() {
        const historyStore = useHistoryStore();

        historyStore.events.push({
            name: tag.value,
            timeStart: startTime.value,
            msDuration: Math.round(durationSeconds.value * 1000),
        });

        running.value = false;
        endTime.value = nowStore.now;
        startTime.value = nowStore.now;
        deductedStartTime.value = nowStore.now;
    }

    return {
        running,
        startTime,
        durationSeconds,
        endTime,
        tag,
        start,
        stop,
        reset
    };
});

export default useStopwatchStore;