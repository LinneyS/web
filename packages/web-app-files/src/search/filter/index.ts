import { SearchProvider, SearchPreview } from 'search/src/types'
import Preview from './preview'
import { EventBus } from 'web-pkg/src/event'
import { filterResources } from '../../helpers/resource'

export default class Provider extends EventBus implements SearchProvider {
  public readonly id: string
  public readonly label: string
  public readonly previewSearch: SearchPreview
  private readonly store: any
  private readonly router: any

  constructor(store, router) {
    super()

    this.id = 'files.filter'
    this.label = 'Search current folder ↵' // todo: gettext
    this.store = store
    this.router = router
    this.previewSearch = new Preview(store)
  }

  public activate(term: string): void {
    const resources = filterResources((this.store as any).getters['Files/files'], term)
    this.emit('activate', { term, resources })
  }

  public reset(): void {
    this.emit('reset')
  }

  public updateTerm(term: string): void {
    this.emit('updateTerm', term)
  }

  public get available(): boolean {
    return ['files-personal'].includes(this.router.currentRoute.name)
  }
}
