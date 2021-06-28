import { SearchProvider, SearchList, SearchPreview } from 'search/src/types'
import Preview from './preview'
import List from './list'
import { EventBus } from 'web-pkg/src/event'

export default class Provider extends EventBus implements SearchProvider {
  public readonly id: string
  public readonly label: string
  public readonly available: boolean
  public readonly previewSearch: SearchPreview
  public readonly listSearch: SearchList
  private readonly store: any
  private readonly router: any

  constructor(store: any, router: any) {
    super()

    this.id = 'files.sdk'
    this.label = 'Search all files ↵'
    this.previewSearch = new Preview(store, router)
    this.listSearch = new List(store)
    this.store = store
    this.available = true
    this.router = router
  }

  public activate(term: string): void {
    this.router
      .push({
        name: 'search-provider-list',
        query: { term, provider: this.id }
      })
      .catch(e => {
        // todo: Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/search/list/files.global?term=a"
      })
  }

  public reset(): void {
    /* not needed */
  }

  public updateTerm(term: string): void {
    /* not needed */
  }
}
