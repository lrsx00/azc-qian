<script setup lang="ts">
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { login, type LoginResponse } from '../api/auth'
import { setToken, setUser } from '../utils/auth'

interface LoginForm {
  username: string
  password: string
}

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)
const formState = reactive<LoginForm>({
  username: '',
  password: '',
})

const rules: Record<keyof LoginForm, Rule[]> = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
}

const handleLogin = async () => {
  await formRef.value?.validate()
  loading.value = true
  try {
    const data: LoginResponse = await login(formState.username, formState.password)
    setToken(data.access_token)
    setUser(data.user)
    message.success('登录成功')
    router.push('/dashboard')
  } catch (error: any) {
    const errMsg =
      error?.response?.data?.message ||
      error?.message ||
      '登录失败，请检查账号密码'
    message.error(errMsg)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4 py-10">
    <div
      class="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white/90 p-10 shadow-2xl backdrop-blur"
    >
      <div class="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-emerald-200 opacity-40 blur-2xl" />
      <div class="absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-teal-300 opacity-40 blur-3xl" />
      <div class="relative">
        <div class="mb-8 text-center">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-semibold text-white shadow-lg">
            茶
          </div>
          <h1 class="mt-4 text-2xl font-bold text-slate-800">茶叶溯源管理后台登录</h1>
          <p class="mt-2 text-sm text-slate-500">Tea Traceability Admin Portal</p>
        </div>

        <a-form
          layout="vertical"
          :model="formState"
          :rules="rules"
          ref="formRef"
          @finish="handleLogin"
        >
          <a-form-item name="username" label="用户名">
            <a-input
              v-model:value="formState.username"
              size="large"
              placeholder="请输入用户名"
              allow-clear
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password" label="密码">
            <a-input-password
              v-model:value="formState.password"
              size="large"
              placeholder="请输入密码"
              allow-clear
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item class="mb-0">
            <a-button
              type="primary"
              html-type="submit"
              size="large"
              block
              :loading="loading"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

