import SearchBar from './portals/SearchBar.vue'
import App from './App.vue'
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
          path: 'list',
          component: List
        }
      ]
    }
  ],
  mounted({ store, portal }) {
    if (!store.getters.configuration.options.hideSearchBar) {
      portal.open('runtime', 'header', 1, [SearchBar])
    }
  }
}
