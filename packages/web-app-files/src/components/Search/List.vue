<template>
  <div class="files-search-result">
    <no-content-message v-if="!activeFiles.length" class="files-empty" icon="folder">
      <template v-slot:message>
        <span v-if="!!$route.query.term" v-translate>TODO NOT FOUND MESSAGE</span>
        <span v-else v-translate>TODO NO TERM MESSAGE</span>
      </template>
    </no-content-message>
    <oc-table-files
      v-else
      id="files-personal-table"
      class="files-table"
      :class="{ 'files-table-squashed': false }"
      :resources="activeFiles"
      :target-route="{ name: 'files-personal' }"
      :are-paths-displayed="true"
      :has-actions="false"
      :is-selectable="false"
      @fileClick="$_fileActions_triggerDefaultAction"
      @rowMounted="rowMounted"
    >
      <template #footer>
        <oc-pagination
          v-if="pages > 1"
          :pages="pages"
          :current-page="parseInt($route.params.page) || 1"
          :max-displayed="3"
          :current-route="{
            name: $route.name,
            query: $route.query,
            params: $route.params
          }"
          class="files-pagination uk-flex uk-flex-center oc-my-s"
        />
        <list-info
          v-if="activeFiles.length > 0"
          class="uk-width-1-1 oc-my-s"
          :files="fileCount"
          :folders="folderCount"
          :size="fileSize"
        />
      </template>
    </oc-table-files>
  </div>
</template>

<script>
import { VisibilityObserver } from 'web-pkg/src/observer'
import { ImageDimension } from '../../constants'
import NoContentMessage from '../FilesList/NoContentMessage.vue'
import debounce from 'lodash-es/debounce'
import { loadPreview } from '../../helpers/resource'
import { mapGetters } from 'vuex'
import ListInfo from '../FilesList/ListInfo.vue'
import Vue from 'vue'
import MixinFileActions from '../../mixins/fileActions'
import MixinResourceCleanup from '../../mixins/resourceCleanup'

const visibilityObserver = new VisibilityObserver()

export default {
  components: { ListInfo, NoContentMessage },
  mixins: [MixinFileActions, MixinResourceCleanup],
  props: {
    searchResults: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    ...mapGetters(['Files', ['configuration', 'user', 'getToken']]),
    allFiles() {
      return this.searchResults.map(searchResult => searchResult.data)
    }
  },

  beforeDestroy() {
    visibilityObserver.disconnect()
  },

  methods: {
    rowMounted(resource, component) {
      const debounced = debounce(async ({ unobserve }) => {
        unobserve()
        const preview = await loadPreview(
          {
            resource,
            isPublic: false,
            dimensions: ImageDimension.ThumbNail,
            server: this.configuration.server,
            userId: this.user.id,
            token: this.getToken
          },
          true
        )

        preview && Vue.set(resource, 'preview', preview)
      }, 250)

      visibilityObserver.observe(component.$el, { onEnter: debounced, onExit: debounced.cancel })
    }
  }
}
</script>
