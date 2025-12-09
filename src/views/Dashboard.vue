<script setup lang="ts">
import { computed } from 'vue'
import { getUser } from '../utils/auth'

const user = computed(() => getUser())
</script>

<template>
  <div class="p-6">
    <div class="rounded-xl bg-white p-6 shadow-sm">
      <h2 class="text-xl font-semibold text-slate-800">欢迎进入茶叶溯源管理后台</h2>
      <p class="mt-2 text-slate-500">
        当前用户：
        <span class="font-semibold text-emerald-600">
          {{ user?.displayName || user?.username || '未知用户' }}
        </span>
      </p>
    </div>
  </div>
</template>

