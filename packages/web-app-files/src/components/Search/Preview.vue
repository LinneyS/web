<template>
  <div class="files-search-preview" @click="$_fileActions_triggerDefaultAction(resource)">
    <oc-resource
      :resource="resource"
      :is-path-displayed="true"
      :target-route="{ name: 'files-personal' }"
    />
  </div>
</template>

<script>
import MixinFileActions from '../../mixins/fileActions'
import { VisibilityObserver } from 'web-pkg/src/observer'
import { ImageDimension } from '../../constants'
import debounce from 'lodash-es/debounce'
import { mapActions } from 'vuex'
import Vue from 'vue'

const visibilityObserver = new VisibilityObserver()

export default {
  mixins: [MixinFileActions],
  props: ['searchResult', 'provider'],
  data() {
    return {
      resource: undefined
    }
  },
  beforeMount() {
    this.resource = this.searchResult.data
  },
  mounted() {
    const debounced = debounce(async ({ unobserve }) => {
      unobserve()
      const preview = await this.loadPreview({
        resource: this.resource,
        isPublic: false,
        dimensions: ImageDimension.ThumbNail
      })
      preview && Vue.set(this.resource, 'preview', preview)
    }, 250)

    visibilityObserver.observe(this.$el, { onEnter: debounced, onExit: debounced.cancel })
  },
  beforeDestroy() {
    visibilityObserver.disconnect()
  },
  methods: {
    ...mapActions('Files', ['loadPreview'])
  }
}
</script>

<style lang="scss">
.files-search-preview {
  button {
    font-size: 0.8rem;
  }

  .oc-icon,
  .oc-icon > svg,
  img {
    height: 24px;
    max-height: 24px;
    max-width: 24px;
    width: 24px;
  }
}
</style>
