import { SearchPreview, SearchResult } from 'search/src/types'
import PreviewComponent from '../../components/Search/Preview.vue'
import { filterResources } from '../../helpers/resource'

export default class PreviewSearch implements SearchPreview {
  public readonly component: unknown
  public readonly available: boolean
  private readonly store: unknown

  constructor(store: unknown) {
    this.component = PreviewComponent
    this.store = store
    this.available = true
  }

  public search(term: string): Promise<SearchResult[]> {
    // no cache required, the filtering is client only and fast enough to recalculate the set
    // of results every time on the fly
    const resources: any[] = filterResources((this.store as any).getters['Files/files'], term, 5)
    const searchResult = resources.map(resource => ({ id: resource.id, data: resource }))

    return Promise.resolve(searchResult)
  }

  public activate(searchResult: SearchResult): void {
    /* not needed */
  }
}
