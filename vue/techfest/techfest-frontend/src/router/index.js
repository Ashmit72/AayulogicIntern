import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from "@/layout/UserView/AppLayout.vue"
import HomeView from '@/views/User/HomeView.vue'
import isAuthenticated from '@/utils'
import BlogView from '@/views/User/BlogView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: 'app',
      component: AppLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView
        },
        {
          path: "blog",
          component: BlogView,
          children:[
            {
              path:'',
              component:defineAsyncComponent(()=>import('@/views/User/Child/Blog/BlogsPage.vue'))
            },
            {
              path:':slug',
              component:defineAsyncComponent(()=>import('@/views/User/Child/Blog/BlogPage.vue'))
            }
          ]
        },
        {
          path:"events",
          component:defineAsyncComponent(()=>import("@/views/User/EventView.vue"))
        },
        {
         path:"contact",
         component:defineAsyncComponent(()=>import('@/views/User/ContactView.vue'))
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: defineAsyncComponent(() => import("@/layout/admin/AdminLayout.vue")),
      children: [
        {
          path: "dashboard",
          name: 'dashboard',
          component: defineAsyncComponent(() => import("@/views/Admin/AdminPage.vue"))
        },
        {
          path: "blog",
          name: 'blog',
          component: defineAsyncComponent(() => import("@/views/Admin/BlogPage.vue")),
          children:[
            {
              path:"",
              name:"list-blog",
              component:defineAsyncComponent(()=>import("@/views/Admin/Child/Blog/BlogList.vue"))
            },
            {
              path:"create",
              name:"create-blog",
              component:defineAsyncComponent(()=>import("@/views/Admin/Child/Blog/CreateBlog.vue"))
            },
            {
              path:"edit/:id",
              name:"edit-blog",
              component:defineAsyncComponent(()=>import("@/views/Admin/Child/Blog/EditBlog.vue"))
            }
          ]
        },
        {
          path: "event",
          name: "event",
          component: defineAsyncComponent(() => import("@/views/Admin/EventPage.vue")),
          children:[
            {
              path:'',
              name:"list-event",
              component:defineAsyncComponent(()=>import("@/views/Admin/Child/Event/EventList.vue"))
            },
            {
              path:'create',
              name:"create-event",
              component:defineAsyncComponent(()=>import("@/views/Admin/Child/Event/EventCreate.vue"))
            },
            {
              path:'edit/:id',
              name:"edit-event",
              component:defineAsyncComponent(()=>import("@/views/Admin/Child/Event/EventCreate.vue"))
            }
          ]
        },
        {
          path:"faq",
          name:"faq",
          component:defineAsyncComponent(()=>import('@/views/Admin/FAQ.vue')),
          children:[
            {
              path:'',
              name:'list-faq',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/FAQ/FAQlist.vue'))
            },
            {
              path:'create',
              name:'create-faq',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/FAQ/FAQcreate.vue'))
            },
            {
              path:'edit/:id',
              name:'edit-faq',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/FAQ/FAQcreate.vue'))
            }
          ]
        },
        {
          path:"level",
          name:"level",
          component:defineAsyncComponent(()=>import('@/views/Admin/Level.vue')),
          children:[
            {
              path:'',
              name:'list-level',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Level/Listlevel.vue'))
            },
            {
              path:'create',
              name:'create-level',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Level/LevelCreate.vue'))
            },
            {
              path:'edit/:id',
              name:'edit-level',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Level/LevelCreate.vue'))
            }
          ]
        },
        {
          path:"privacy",
          name:"privacy",
          component:defineAsyncComponent(()=>import('@/views/Admin/Privacy.vue')),
          children:[
            {
              path:'',
              name:'privacy-list',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Privacy/PrivacyList.vue'))
            },
            {
              path:'create',
              name:'privacy-create',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Privacy/CreatePrivacy.vue'))
            },
            {
              path:'edit/:id',
              name:'privacy-edit',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Privacy/EditPrivacy.vue'))
            },
            
          ]
        },
        {
          path:"prize",
          name:"prize",
          component:defineAsyncComponent(()=>import('@/views/Admin/Prize.vue')),
          children:[
            {
              path:'',
              name:"prize-list",
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Prize/PrizeList.vue'))
            },
            {
              path:'edit/:id',
              name:"prize-edit",
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Prize/CreatePrize.vue'))
            },
            {
              path:'create',
              name:"prize-create",
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Prize/CreatePrize.vue'))
            }
          ]
        },
        {
          path:'resource',
          name:'resource',
          component:defineAsyncComponent(()=>import('@/views/Admin/Resource.vue')),
          children:[
            {
              path:'',
              name:'resource-list',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Resource/ResourceList.vue'))
            },
            {
              path:'create',
              name:'resource-create',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Resource/CreateResource.vue'))
            },
            {
              path:'edit/:id',
              name:'resource-edit',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Resource/CreateResource.vue'))
            }
          ]
        },
        {
          path:'speaker',
          name:'speaker',
          component:defineAsyncComponent(()=>import('@/views/Admin/Speaker.vue')),
          children:[
            {
              path:'',
              name:'speaker-list',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Speaker/SpeakerList.vue'))
            },
            {
              path:'edit/:id',
              name:'speaker-edit',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Speaker/CreateSpeaker.vue'))
            },
            {
              path:'create',
              name:'speaker-create',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Speaker/CreateSpeaker.vue'))
            }
          ]
        },
        {
          path:'message',
          name:'message',
          component:defineAsyncComponent(()=>import('@/views/Admin/MessagesPage.vue')),
          children:[
            {
              path:'',
              name:'message-list',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Message/MessageList.vue'))
            }
          ]
        },
        {
          path:'sponsor',
          name:'sponsor',
          component:defineAsyncComponent(()=>import('@/views/Admin/Sponsor.vue')),
          children:[
            {
              path:'create',
              name:"sponsor-create",
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Sponsor/CreateSponsor.vue'))
            },
            {
              path:'edit/:id',
              name:"sponsor-edit",
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Sponsor/CreateSponsor.vue'))
            },
            {
              path:'',
              name:"sponsor-list",
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Sponsor/SponsorList.vue'))
            }
          ]
        },
        {
          path:'term',
          name:'term',
          component:defineAsyncComponent(()=>import('@/views/Admin/Term.vue')),
          children:[
            {
              path:'',
              name:'term-list',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Term/TermList.vue'))
            },
          ]
        },
        {
          path:'team',
          name:'team',
          component:defineAsyncComponent(()=>import('@/views/Admin/Team.vue')),
          children:[
            {
              path:'',
              name:'team-list',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Team/TeamList.vue'))
            },
            {
              path:'edit/:id',
              name:'team-edit',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Team/CreateTeam.vue'))
            },
            {
              path:'create',
              name:'team-create',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Team/CreateTeam.vue'))
            },
          ]
        },
        {
          path:'role',
          name:'role',
          component:defineAsyncComponent(()=>import('@/views/Admin/Role.vue')),
          children:[
            {
              path:"create",
              name:'create-role',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Role/CreateRole.vue'))
            },
            {
              path:"edit/:id",
              name:'edit-role',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Role/CreateRole.vue'))
            },
            {
              path:"",
              name:'list-role',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Role/RoleList.vue'))
            },
          ]
        },
        {
          path:'workshop',
          name:'workshop',
          component:defineAsyncComponent(()=>import('@/views/Admin/Workshop.vue')),
          children:[
            {
             path:'',
             name:'workshop-list',
             component:defineAsyncComponent(()=>import('@/views/Admin/Child/Workshop/ListWorkshop.vue'))
            },
            {
              path:'create',
              name:'workshop-create',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Workshop/CreateWorkshop.vue'))
            },
            {
              path:'edit/:id',
              name:'workshop-edit',
              component:defineAsyncComponent(()=>import('@/views/Admin/Child/Workshop/CreateWorkshop.vue'))
            }
          ]
        },
       
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: defineAsyncComponent(() => import("@/views/helpers/Login.vue"))
    },
    {
      path: "/:notFound(.*)",
      name: 'notfound',
      component: defineAsyncComponent(() => import("@/views/User/errors/not-found.vue"))
    },
    
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin')  && !isAuthenticated()) {
    next({ name: 'login' })
  } else {
    next()
  }
})


export default router
