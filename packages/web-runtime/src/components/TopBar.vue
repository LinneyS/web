<template>
  <header
    class="oc-topbar uk-flex uk-flex-middle uk-flex-wrap oc-border-b oc-p-s"
    :aria-label="$gettext('Top bar')"
  >
    <oc-grid gutter="medium" flex>
      <div class="uk-hidden@l">
        <oc-button
          appearance="raw"
          class="oc-m-s oc-app-navigation-toggle"
          :aria-label="$gettext('Open navigation menu')"
          @click="toggleAppNavigationVisibility"
        >
          <oc-icon name="menu" />
        </oc-button>
      </div>
      <portal-target name="app.runtime.header" multiple></portal-target>
    </oc-grid>
    <oc-grid flex gutter="small" class="uk-width-expand uk-flex-right oc-m-rm">
      <notifications v-if="activeNotifications.length" />
      <applications-menu v-if="applicationsList.length > 0" :applications-list="applicationsList" />
      <user-menu
        :user-id="userId"
        :user-display-name="userDisplayName"
        :applications-list="applicationsList"
      />
    </oc-grid>
  </header>
</template>

<script>
import ApplicationsMenu from './ApplicationsMenu.vue'
import UserMenu from './UserMenu.vue'
import Notifications from './Notifications.vue'

export default {
  components: {
    Notifications,
    ApplicationsMenu,
    UserMenu
  },
  props: {
    userId: {
      type: String,
      required: false,
      default: ''
    },
    userDisplayName: {
      type: String,
      required: false,
      default: ''
    },
    applicationsList: {
      type: Array,
      required: false,
      default: () => []
    },
    hasAppNavigation: {
      type: Boolean,
      required: false,
      default: false
    },
    activeNotifications: {
      type: [Array, Boolean],
      required: false,
      default: () => []
    }
  },
  methods: {
    toggleAppNavigationVisibility() {
      this.$emit('toggleAppNavigationVisibility')
    }
  }
}
</script>

<style scoped>
.topbar-current-extension-title {
  color: white;
}

.oc-topbar {
  height: 60px;
}
</style>
