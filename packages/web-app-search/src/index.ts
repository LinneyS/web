import SearchBar from './portals/SearchBar.vue'
import App from './App.vue'
import store from './store'
import List from './views/List.vue'
import { providerStore } from './service'
import { bus } from 'web-pkg/src/instance'
import { SearchProvider } from './types'

bus.on('app.search.register.provider', (provider: SearchProvider) => {
  providerStore.addProvider(provider)
})

export default {
  appInfo: {
    name: 'Search',
    id: 'search',
    icon: 'folder'
  },
  store,
  routes: [
    {
      name: 'search',
      path: '/',
      components: {
        app: App
      },
      children: [
        {
          name: 'provider-list',
          path: 'list/:page?',
          component: List
        }
      ]
    }
  ],
  mounted({ portal }: { portal: unknown }): void {
    ;(portal as any).open('runtime', 'header', 1, [SearchBar])
  }
}
