<template>
  <div class="files-search-preview">
    <oc-resource
      :resource="data"
      :is-path-displayed="true"
      :target-route="{ name: 'files-personal' }"
    />
    <div v-if="data.size" class="label">
      <oc-resource-size :size="data.size" />
      →
    </div>
  </div>
</template>

<script>
export default {
  props: ['data']
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
