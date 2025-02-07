<script setup lang="ts">
import Counter from './components/Counter.vue'
import { ref, defineAsyncComponent } from 'vue'

const showComplex = ref(false)

const ComplexCounter = defineAsyncComponent(() =>{ 
 return import('./components/ComplexCounter.vue')
});

const toggleComplex = () => {
  showComplex.value = !showComplex.value
}
</script>

<template>
  <h1>Welcome to the Counter Web-App</h1>
  <p>Choose between a simple or complex counter by clicking the button below</p>
  <div class="outer-container">
    <div class="main-container"> 
      <button @click="toggleComplex">
        {{ showComplex ? 'Simple' : 'Complex' }} Counter
      </button>

    <div> 
      <Suspense>
        <template #default>
          <ComplexCounter v-if="showComplex" />
          <Counter v-else />
        </template>
        <template #fallback>
          <div class="flex justify-center items-center h-screen bg-gray-100">
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
              <p class="mt-4 text-gray-700 text-lg font-semibold">Loading, please wait...</p>
            </div>
          </div>
        </template>
      </Suspense>
    </div>
  </div>
</div>
</template>

<style>
/* Add this before your scoped styles to import the font */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
/* Add this to apply the font globally and set background color */
:root {
  font-family: 'Roboto', sans-serif;
  font-family: 'JetBrains Mono', monospace;
  background-color: #ffffff;
  color: #000000;
}

p {
  padding: 0px 0px 40px 4px;
}

/* Also add body to ensure full coverage */
body {
  background-color: #f5f5f5;
  margin: 0;
  min-height: 100vh;
  color: #000000;
}

/* Your existing scoped styles */
button {
  margin: 30px;
  padding: 10px 16px;
  font-size: 1.2rem;
  cursor: pointer;
  border: 1px solid #c0c0c0;
  border-radius: 0.5rem;
  background-color: #ffffff;
  color: #000;
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-size: 3rem;
  padding: 3px 5px;
  cursor: pointer;
  margin-bottom: 40px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}

h2 {
  font-size: 3rem;
  margin-bottom: 10px;
  padding: 8px 2px;
  cursor: pointer;
  margin-bottom: 10px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}

.outer-container {
  display: flex;
  flex-direction: column;
  border: 1px solid #dedcdc;
  border-radius: 2rem;
  background-color:#f5f5f5;
  padding: 13px;
}

.main-container {
  flex-direction: column;
  display: flex;
  border: 1px solid #c0c0c0;
  border-radius: 1.2rem;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
