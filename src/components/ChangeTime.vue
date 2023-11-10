<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import useStopwatchStore from '../stores/stopwatch';

type Operation = 'add' | 'sub';

const stopwatchStore = useStopwatchStore();

const operation = ref('add' as Operation);

const delta = reactive({
    hours: "0",
    minutes: "0",
    seconds: "0",
});

const hint = ref("");
const deltaSeconds = ref(0);

watch(delta, value => {
    let err = [];
    let hours = parseInt(value.hours);
    let minutes = parseInt(value.minutes);
    let seconds = parseInt(value.seconds);
    if (isNaN(hours)) {
        err.push("Invalid hours");
    }
    if (isNaN(minutes)) {
        err.push("Invalid minutes");
    }
    if (isNaN(seconds)) {
        err.push("Invalid seconds");
    }
    let mul = operation.value === "add" ? 1 : -1;
    deltaSeconds.value = (hours * 3600 + minutes * 60 + seconds) * mul;
    if (stopwatchStore.durationSeconds + deltaSeconds.value < 0) {
        err.push("Subtracted too much time");
    }
    if (err.length > 0) {
        hint.value = err.join("; ");
    } else {
        hint.value = "";
    }
}, { immediate: true });

function submit() {
    if (hint.value.length === 0) {
        stopwatchStore.change_time(deltaSeconds.value);
    } else {
        hint.value = hint.value + "!";
    }
}
</script>

<template>
    <div class="bg-green-500 p-2 rounded-lg">
        <form @submit.prevent="submit()">
            <div class="flex gap-2">
                <select name="operation" v-model="operation" class="inner-input w-24">
                    <option value="add">增加</option>
                    <option value="sub">减少</option>
                </select>
                <input type="number" required class="inner-input w-16" min="0" max="23" step="1"
                    name="hour" placeholder="hour" v-model="delta.hours">
                <span class="font-bold">:</span>
                <input type="number" required class="inner-input w-16" min="0" max="59" step="1"
                    name="minute" placeholder="min" v-model="delta.minutes">
                <span class="font-bold">:</span>
                <input type="number" required class="inner-input w-16" min="0" max="59" step="1"
                    name="second" placeholder="sec" v-model="delta.seconds">
            </div>
            <div>
                <button type="submit" class="button">Submit</button>
                <button type="button" class="button" @click="stopwatchStore.toggle_edit()">Cancel</button>
            </div>
            <div v-if="hint.length > 0" class="text-red-500">{{ hint }}</div>
        </form>
    </div>
</template>
