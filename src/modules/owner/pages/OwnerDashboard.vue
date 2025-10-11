<template>
  <div class="flex h-screen bg-gray-50 text-gray-900">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 shadow-md flex flex-col justify-between">
      <div>
        <div class="p-6 border-b border-gray-200">
          <h1 class="text-2xl font-bold text-indigo-600 tracking-tight">CertiDev</h1>
        </div>

        <nav class="mt-6 flex-1">
          <ul class="space-y-1">
            <li v-for="link in links" :key="link.to">
              <router-link
                  :to="link.to"
                  class="block px-6 py-3 text-gray-700 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition"
                  active-class="bg-indigo-100 text-indigo-600 font-medium"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>

      <div class="p-6 border-t border-gray-200">
        <button
            @click="logout"
            class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <header class="flex justify-between items-center bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <h2 class="text-xl font-semibold text-gray-700">Panel del Propietario</h2>
        <div class="flex items-center gap-2">
          <button class="px-3 py-1 border rounded-md hover:bg-gray-100">ES</button>
          <button class="px-3 py-1 border rounded-md hover:bg-gray-100">EN</button>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-8 bg-gray-50">
        <router-view />
      </main>

      <footer class="bg-white border-t border-gray-200 text-center py-3 text-sm text-gray-500">
        © 2025 CertiDev — Todos los derechos reservados
      </footer>
    </div>
  </div>
</template>

<script setup>
import { authService } from '@/auth/application/auth-service'
import { useRouter } from 'vue-router'

const router = useRouter()

const links = [
  { label: 'Inicio', to: '/dashboard/owner' },
  { label: 'Solicitudes', to: '/dashboard/owner/requests' },
  { label: 'Verificación', to: '/dashboard/owner/verification' },
  { label: 'Inspección', to: '/dashboard/owner/inspection' },
  { label: 'Emisión', to: '/dashboard/owner/emission' },
  { label: 'Publicación', to: '/dashboard/owner/publication' },
]

function logout() {
  authService.logout()
  router.push('/login')
}
</script>
