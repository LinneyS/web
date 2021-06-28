<template>
  <div class="files-search-result">
    <oc-table-files
      id="files-personal-table"
      class="files-table"
      :class="{ 'files-table-squashed': false }"
      :resources="resources"
      :target-route="targetRoute"
      @fileClick="$_fileActions_triggerDefaultAction"
      @rowMounted="rowMounted"
    />
  </div>
</template>

<script>
import { VisibilityObserver } from 'web-pkg/src/observer'
import { ImageDimension } from '../../constants'
import debounce from 'lodash-es/debounce'
import { mapActions } from 'vuex'
import Vue from 'vue'
import MixinFileActions from '../../mixins/fileActions'

const visibilityObserver = new VisibilityObserver()

export default {
  mixins: [MixinFileActions],
  props: ['searchResults'],
  computed: {
    resources() {
      return this.searchResults.map(searchResult => searchResult.data)
    },
    targetRoute() {
      return { name: 'files-personal' }
    }
  },

  beforeDestroy() {
    visibilityObserver.disconnect()
  },

  methods: {
    ...mapActions('Files', ['loadPreview']),

    rowMounted(resource, component) {
      const debounced = debounce(async ({ unobserve }) => {
        unobserve()
        const preview = await this.loadPreview({
          resource,
          isPublic: false,
          dimensions: ImageDimension.ThumbNail
        })

        preview && Vue.set(resource, 'preview', preview)
      }, 250)

      visibilityObserver.observe(component.$el, { onEnter: debounced, onExit: debounced.cancel })
    }
  }
}
</script>
