<script setup>
import { ref, watch, watchEffect } from 'vue'

// Using ref() because this component only tracks a single reactive value.
const count = ref(0)
const showpopup = ref(false)

// ✅ watch: Logs count changes
watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`);
});

// ✅ watchEffect: Logs pop-up state
watchEffect(() => {
  console.log(`Pop-up is now ${showpopup.value ? "OPEN" : "CLOSED"}`);
});

const toggleshowpopup = () => {
  showpopup.value = !showpopup.value
}

// Counter functions
const increment = () => {
  count.value++
}
const decrement = () => {
  count.value--
}
const reset = () => {
  count.value = 0
}
</script>

<template>
  <h3>This is a Counter</h3>   
  <h4>Increase and decrease the counters value by pressing the corresponding buttons</h4>
  <h1>{{ count }}</h1>
  <button @click="increment">Increase</button>
  <button @click="decrement">Decrease</button>
  <button @click="reset">Reset</button>

  <button @click="toggleshowpopup">
    {{ showpopup ? 'Close ' : 'Open ' }}Settings
  </button>

  <teleport to="body">
    <div v-if="showpopup" class="popup">
      <h2>Settings</h2>
      <button @click="showpopup = false">Close</button>
    </div>
  </teleport>
</template>

<style scoped>
h1 {
  font-size: 3rem;
  padding: 8px 12px;
  cursor: pointer;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
}

h3{
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}

h4 {
  padding: 8px 12px;
  cursor: pointer;
  margin-bottom: 20px;
  font-family: 'JetBrains Mono', monospace;
}

.popup {
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  border: 1px solid #c0c0c0;
  z-index: 1000;
  min-width: 300px;
}

.popup h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
