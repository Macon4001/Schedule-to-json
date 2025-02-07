<script setup>
import { onMounted, reactive, ref } from 'vue'

const isLoading = ref(true)

// Using reactive() here because we're tracking multiple related reactive values.
const numbers = reactive({ 
  addOne: 1, 
  multiplyByTwo: 1, 
  multiplyBySeven: 1 
})

const increment = () => {
  numbers.addOne += 1 // Adds 1
  numbers.multiplyByTwo *= 2 // Multiplies by 2
  numbers.multiplyBySeven *= 7 // Multiplies by 7
}

const decrement = () => {
  numbers.addOne -= 1  // Subtracts 1
  numbers.multiplyByTwo /= 2  // Divides by 2
  numbers.multiplyBySeven /= 7 // Divides by 7
}

const reset = () => {
  numbers.addOne = 1
  numbers.multiplyByTwo = 1
  numbers.multiplyBySeven = 1
}

onMounted(() => {
  setTimeout(() => {
  isLoading.value = false
  }, 2000) // Simulates a delay of 2 seconds
})
</script>

<template>
  <div v-if="isLoading">
    <h3>Loading...</h3>
  </div>
  <div v-else>
  <h3>This is a counter</h3>   
  <h4>One adds 1, one multiplies by 2, and one multiplies by 7.</h4>
  
  <p>Adding 1: <strong>{{ numbers.addOne }}</strong></p>
  <p>Multiplying by 2: <strong>{{ numbers.multiplyByTwo }}</strong></p>
  <p>Multiplying by 7: <strong>{{ numbers.multiplyBySeven }}</strong></p>

  <button @click="increment">Increase</button>
  <button @click="decrement">Decrease</button>
  <button @click="reset">Reset</button>
</div>
</template>

<style scoped>
h1 {
  font-size: 3rem;
  padding: 8px 12px;
  cursor: pointer;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
}

h3 {
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}

h4 {
  padding: 8px 12px;
  cursor: pointer;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
}

p {
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: #000;
  padding: 8px 12px;
}

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
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
