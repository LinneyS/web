import { SearchList, SearchResult } from 'search/src/types'
import ListComponent from '../../components/Search/List.vue'
import { clientService } from '../../services'
import { buildResource } from '../../helpers/resources'

export default class ListSearch implements SearchList {
  public readonly component: unknown
  private readonly store: any

  constructor(store: unknown) {
    this.component = ListComponent
    this.store = store
  }

  async search(term: string): Promise<SearchResult[]> {
    const plainResources = await clientService.owncloudSdk.files.search(
      term,
      undefined, // todo: add configuration option, other places need that too too... needs consolidation
      this.store.getters['Files/davProperties']
    )
    const searchResult = plainResources.map(plainResource => {
      const resource = buildResource(plainResource)
      return { id: resource.id, data: resource }
    })

    return searchResult
  }
}
