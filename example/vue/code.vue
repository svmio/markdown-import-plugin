<template>
  <pre><code ref="refCode">{{content}}</code></pre>
</template>

<script setup>
import {ref, defineProps, onMounted} from "vue";
import hljs from 'highlight.js'
import 'highlight.js/styles/lightfair.css'

defineProps({
  content: String
})
const refCode = ref(null)
onMounted(()=>{
  hljs.highlightElement(refCode.value)
})
</script>

<style scoped>

</style>
