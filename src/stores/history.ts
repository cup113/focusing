import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { computed } from "vue";

export interface HistoryEvent {
    name: string;
    timeStart: Date;
    msDuration: number;
}

export interface JsonHistoryEvent {
    name: string;
    timeStart: string;
    msDuration: number;
}

function history_event_read(raw: string): HistoryEvent[] {
    const events: JsonHistoryEvent[] = JSON.parse(raw);
    return events.map(value => {
        return {
            name: value.name,
            timeStart: new Date(value.timeStart),
            msDuration: value.msDuration,
        };
    })
}

function history_event_write(value: HistoryEvent[]): string {
    return JSON.stringify(value);
}

const useHistoryStore = defineStore("history", () => {
    const events = useLocalStorage("FO_historyEvents", new Array<HistoryEvent>(), {
        serializer: {
            read: history_event_read,
            write: history_event_write
        }
    });
    const viewSetting = useLocalStorage("FO_historyViewSetting", {
        start: 1,
        items: 10,
    });
    const queryResult = computed(() => {
        const len = events.value.length;
        const start = Math.min(len, viewSetting.value.start);
        const end = Math.min(len, viewSetting.value.start + viewSetting.value.items - 1);
        return {
            start,
            end,
            events: events.value.slice(len - end, len - (start - 1)).reverse(), // 2~5 6 => 1~6
        };
    });

    return {
        events,
        viewSetting,
        queryResult,
    };
});

export default useHistoryStore;
