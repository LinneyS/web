import { mapState } from 'vuex'
import { Registry } from '../services'

export default {
  data: () => ({
    filterTerm: '',
    filteredFiles: []
  }),

  mounted() {
    const { filterSearch } = Registry

    filterSearch.on('reset', () => (this.filterTerm = ''))
    filterSearch.on('updateTerm', term => {
      if (!term) {
        this.filterTerm = ''
      }
    })
    filterSearch.on('activate', ({ term, resources }) => {
      this.filteredFiles = resources
      this.filterTerm = term
    })
  },
  watch: {
    $route: {
      handler: function(to, from) {
        if (to.params?.item === from?.params?.item) {
        }

        // this.localSearch.reset()
      }
    },
    pages() {
      if (!this.$route.params.page) {
        return
      }

      if (this.$route.params.page <= this.pages) {
        return
      }

      this.$router.push({
        name: this.$route.name,
        query: this.$route.query,
        params: { ...this.$route.params, page: this.pages }
      })
    }
  },
  computed: {
    ...mapState('Files', ['currentPage', 'files', 'filesPageLimit']),
    fileCount() {
      return this.allFiles.filter(file => file.type === 'file').length
    },
    folderCount() {
      return this.allFiles.filter(file => file.type === 'folder').length
    },
    fileSize() {
      this.allFiles.map(file => parseInt(file.size)).reduce((x, y) => x + y, 0)
    },
    pages() {
      return Math.ceil(this.allFiles.length / this.filesPageLimit)
    },
    allFiles() {
      return this.filterTerm ? this.filteredFiles : this.files
    },
    activeFiles() {
      return [...this.allFiles].splice(
        (this.currentPage - 1) * this.filesPageLimit,
        this.filesPageLimit
      )
    }
  }
}
