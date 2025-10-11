import { createRouter, createWebHistory } from 'vue-router';
import { authService } from '../auth/application/auth-service.js';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('../auth/presentation/views/login.vue') },
    { path: '/register', component: () => import('../auth/presentation/views/register.vue') },

    // dashboards
    {
        path: '/dashboard/buyer',
        component: () => import('../modules/buyer/pages/BuyerDashboard.vue'),
        meta: { requiresAuth: true, role: 'buyer' },
        children: [
            {
                path: '',
                component: () => import('../modules/buyer/pages/BuyerValidation.vue'),
            },
            {
                path: 'publication',
                component: () => import('../modules/buyer/pages/BuyerValidation.vue'),
            },
            {
                path: 'management',
                component: () => import('../modules/buyer/pages/BuyerManagement.vue'),
            },
        ],
    },


    // Owner module: solicitudes
    {
        path: '/dashboard/owner',
        component: () => import('../modules/owner/pages/OwnerDashboard.vue'),
        meta: { requiresAuth: true, role: 'owner' },
        children: [
            {
                path: '',
                component: () => import('../modules/owner/pages/OwnerRequests.vue')
            },
            {
                path: 'requests',
                component: () => import('../modules/owner/pages/OwnerRequests.vue')
            },
            {
                path: 'verification',
                component: () => import('../modules/owner/pages/OwnerVerification.vue')
            },
            {
                path: 'inspection/:requestId',
                component: () => import('../modules/owner/inspection/pages/OwnerInspection.vue')
            },

            {
                path: 'inspection',
                component: () => import('../modules/owner/inspection/pages/OwnerInspectionList.vue')
            },
            {
                path: 'inspection/:requestId',
                component: () => import('../modules/owner/inspection/pages/OwnerInspection.vue')
            }


        ]
    },


];

export const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const user = authService.getUser();

    if (to.meta.requiresAuth) {
        if (!user) return next('/login');
        if (to.meta.role && to.meta.role !== user.role) return next('/login');
    }

    next();
});
