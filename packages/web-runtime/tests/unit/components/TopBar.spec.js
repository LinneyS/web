import { shallowMount } from '@vue/test-utils'
import TopBar from 'web-runtime/src/components/TopBar.vue'
import stubs from '../../../../../tests/unit/stubs'

const defaultRoute = () => ({
  meta: {
    /* default is empty */
  }
})

describe('Top Bar component', () => {
  it('Displays applications menu', () => {
    const wrapper = shallowMount(TopBar, {
      stubs,
      propsData: {
        userId: 'einstein',
        userDisplayName: 'Albert Einstein',
        applicationsList: ['testApp']
      },
      mocks: {
        $route: defaultRoute()
      }
    })

    expect(wrapper.html().indexOf('applications-menu-stub')).toBeGreaterThan(-1)
    expect(wrapper).toMatchSnapshot()
  })

  it('Emits toggle of app navigation visibility', async () => {
    const wrapper = shallowMount(TopBar, {
      stubs,
      mocks: {
        $route: defaultRoute()
      }
    })

    wrapper.find('.oc-app-navigation-toggle').vm.$emit('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().toggleAppNavigationVisibility).toBeTruthy()
  })
})
