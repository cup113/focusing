<script setup lang="ts">
import Now from './components/Now.vue';
import Stopwatch from './components/Stopwatch.vue';
import History from './components/History.vue';
</script>

<template>
  <div class="min-h-screen bg-green-800 text-white flex flex-col justify-center items-center">
    <Now></Now>
    <Stopwatch></Stopwatch>
    <History></History>
  </div>
</template>

<style>
</style>
