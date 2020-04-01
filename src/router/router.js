import { Layout } from '../layout' // 页面整体布局
import Empty from '@/views/empty/empty' // 空白页面

//默认不需要权限的页面
export const constantRouterMap = [
    {
        path: '/',
        component: Layout,
        redirect: '/home/HomeIndex',
        hidden: true
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import(/* webpackChunkName: "login" */ '@/views/Login/Login.vue'),
        hidden: true
    },
    {
        path: '/home',
        name: 'Home',
        // redirect: '/home/HomeIndex',
        component: Layout,
        meta: {
            title: '首页',
            icon: 'el-icon-house'
        },
        noDropdown: true,
        children: [
            {
                path: 'HomeIndex',
                name: 'HomeIndex',
                meta: {
                    title: '首页',
                    icon: 'el-icon-house'
                },
                component: () => import('@/views/index/index')
            },
            {
                path: 'infoShow',
                name: 'infoShow',
                meta: {
                    title: '个人信息',
                    icon: 'el-icon-house'
                },
                component: () => import('_c/infoManage/infoShow')
            },
            {
                path: 'infoModify',
                name: 'infoModify',
                meta: {
                    title: '修改信息',
                    icon: 'el-icon-house'
                },
                component: () => import('_c/infoManage/infoModify')
            }
        ]
    },

    {
        path: '/404',
        name: '404',
        component: () => import('@/views/errorPage/404'),
        hidden: true
    },
    {
        path: '/401',
        name: '401',
        component: () => import('@/views/errorPage/401'),
        hidden: true
    }
]

//异步路由（需要权限的页面）
export const asyncRouterMap = [
    {
        path: '/userManager',
        name: 'userManager',
        component: Layout,
        meta: {
            title: '系统管理',
            icon: 'el-icon-setting'
        },
        children: [
            {
                path: 'userList',
                name: 'userList',
                meta: {
                    title: '用户管理',
                    icon: 'el-icon-user',
                    routerType: 'leftmenu'
                },
                component: () => import('@/views/userList/UserList')
            },
            {
                path: 'userRoles',
                name: 'userRoles',
                meta: {
                    title: '角色管理',
                    icon: 'el-icon-s-custom',
                    routerType: 'leftmenu'
                },
                component: () => import('@/views/roles/Roles')
            },
            {
                path: 'userAuthority',
                name: 'userAuthority',
                meta: {
                    title: '权限管理',
                    icon: 'el-icon-turn-off',
                    routerType: 'leftmenu'
                },
                component: () => import('@/views/authority/Authority')
            },
            {
                path: 'journal',
                name: 'journal',
                meta: {
                    title: '运维日志管理',
                    icon: 'el-icon-turn-off',
                    routerType: 'leftmenu'
                },
                component: () => import('@/views/journal/journal')
            },
            {
                path: 'tab',
                name: 'tab',
                meta: {
                    title: '标签管理',
                    icon: 'el-icon-turn-off',
                    routerType: 'leftmenu'
                },
                component: () => import('@/views/tab/tab')
            },
            {
                path: 'type',
                name: 'type',
                meta: {
                    title: '数据类型管理',
                    icon: 'el-icon-turn-off',
                    routerType: 'leftmenu'
                },
                component: () => import('@/views/type/Type')
            },
            {
                path: 'Classified',
                name: 'Classified',
                meta: {
                    title: '数据分类管理',
                    icon: 'el-icon-turn-off',
                    routerType: 'leftmenu'
                },
                component: () => import('@/views/classified/Classified')
            }
        ]
    },
    {
        path: '/content',
        component: Layout,
        name: 'content',
        redirect: '/content/form',
        meta: {
            title: '发布内容管理',
            icon: 'el-icon-document-add'
        },
        children: [
            {
                path: 'formList',
                name: 'formList',
                component: () => import('@/views/content/List'),
                meta: {
                    title: '内容列表',
                    icon: 'el-icon-question'
                }
            },
            {
                path: 'form',
                name: 'form',
                component: () => import('@/views/content/Form'),
                meta: {
                    title: '表单',
                    icon: 'el-icon-question'
                }
            },
            {
                path: 'laboratoryList',
                name: 'laboratoryList',
                meta: {
                    title: '实验室轮播图数据列表与表单',
                    icon: 'el-icon-s-grid'
                },
                component: () => import('@/views/laboratory/Laboratory')
            }
        ]
    },
    {
        path: '/laboratory',
        name: 'laboratory',
        component: { render: h => h('router-view') },
        meta: {
            title: '实验室',
            icon: 'el-icon-data-analysis'
        },
        children: [
            {
                path: 'rotationChart',
                name: 'rotationChart',
                meta: {
                    title: '实验室轮播图',
                    icon: 'el-icon-monitor'
                },
                component: () => import('@/views/laboratory/RotationChart')
            }
        ]
    },
    {
        path: '/theory',
        name: 'theory',
        component: { render: h => h('router-view') },
        meta: {
            title: '理论成果',
            icon: 'el-icon-data-analysis'
        },
        children: [
            {
                path: 'theoryAchievement',
                name: 'theoryAchievement',
                meta: {
                    title: '理论成果首页面',
                    icon: 'el-icon-monitor'
                },
                component: () => import('@/views/theory/Theory')
            }
        ]
    },
    {
        path: '/test',
        component: Layout,
        redirect: '/test/test1',
        name: 'test',
        meta: {
            title: '测试',
            icon: 'el-icon-question'
        },
        children: [
            {
                path: 'test1',
                name: 'test1',
                component: () => import('@/views/test/Test1'),
                meta: {
                    title: '测试1',
                    icon: 'table'
                }
            },
            {
                path: 'test2',
                name: 'test2',
                component: () => import('@/views/test/Test2'),
                meta: {
                    title: '测试2',
                    icon: 'table'
                }
            },
            {
                path: 'test3',
                name: 'test3',
                component: () => import('@/views/test/Test3'),
                meta: {
                    title: '测试3',
                    icon: 'table'
                }
            },
            {
                path: 'test4',
                name: 'test4',
                component: () => import('@/views/test/Test4'),
                meta: {
                    title: '测试4',
                    icon: 'table'
                }
            }
        ]
    },
    {
        path: '/empty',
        component: Empty,
        name: 'empty',
        meta: {
            title: '大屏展示统计',
            icon: 'el-icon-full-screen'
        },
        children: [
            {
                path: 'datav',
                name: 'datav',
                component: () => import('_c/datav/index'),
                meta: {
                    title: '可视化展示'
                }
            }
        ]
    },
    {
        path: '/reader',
        name: 'reader',
        component: { render: h => h('router-view') },
        meta: {
            title: '大屏阅读图书',
            icon: 'el-icon-reading'
        },
        children: [
            {
                path: 'leaflet',
                name: 'leaflet',
                component: () => import('_c/reader/leaflet'),
                meta: {
                    title: '宣传页'
                }
            },
            {
                path: 'bookshelf',
                name: 'bookshelf',
                component: () => import('_c/reader/bookshelf'),
                meta: {
                    title: '书架'
                }
            },
            {
                path: 'readingBook',
                name: 'readingBook',
                component: () => import('_c/reader/readingBook'),
                meta: {
                    title: '阅读图书'
                }
            }
        ]
    }
]
