<script setup lang="ts">
import {
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const selectedKeys = computed(() => {
  if (route.path === '/') return ['/dashboard']
  return [route.path]
})

const handleMenuClick = ({ key }: { key: string }) => {
  if (key === 'logout') {
    localStorage.removeItem('azc_token')
    localStorage.removeItem('azc_user')
    router.replace('/login')
    return
  }
  router.push(key)
}
</script>

<template>
  <a-layout class="min-h-screen">
    <a-layout-sider breakpoint="lg" collapsible>
      <div class="flex items-center gap-3 px-4 py-4 text-white">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-lg font-semibold">
          茶
        </div>
        <div class="leading-tight">
          <div class="text-sm opacity-80">茶叶溯源</div>
          <div class="text-base font-semibold">管理后台</div>
        </div>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :selected-keys="selectedKeys"
        @click="handleMenuClick"
      >
        <a-menu-item key="/dashboard">
          <template #icon>
            <DashboardOutlined />
          </template>
          首页概览
        </a-menu-item>
        <a-menu-item key="logout">
          <template #icon>
            <LogoutOutlined />
          </template>
          退出登录
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="flex items-center justify-between bg-white px-6 shadow-sm">
        <div class="text-lg font-semibold text-slate-800">茶叶溯源管理后台</div>
        <div class="flex items-center gap-2 text-slate-600">
          <UserOutlined />
          <span>管理员</span>
        </div>
      </a-layout-header>
      <a-layout-content class="bg-slate-50 min-h-[calc(100vh-64px)]">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

