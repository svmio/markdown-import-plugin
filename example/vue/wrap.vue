<template>
  <el-tabs>
    <el-tab-pane label="代码演示效果">
      <slot/>
    </el-tab-pane>
    <el-tab-pane label="源代码">
      <Code :content="content"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { defineProps } from 'vue'
import Code from './code'
defineProps({content: String})
</script>

<style scoped>

</style>
