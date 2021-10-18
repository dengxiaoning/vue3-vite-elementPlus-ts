<template>
  <Icon :icon="iconClass"
        :class="custClass"
        :height="inconHeight"
        :width="iconWidth"
        :color="iconColor" />
</template>

<script lang="ts">
import { Icon } from '@iconify/vue'
// reference https://iconify.design/
import { defineComponent, computed } from 'vue'

interface Props {
  iconClass: string
  iconWidth: string
  inconHeight: string
  custClass: string
}

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    iconWidth: {
      type: String,
      default: '1em'
    },
    inconHeight: {
      type: String,
      default: '1em'
    },
    iconColor: {
      type: String,
      default: '#fff'
    },
    custClass: {
      type: String,
      default: () => ''
    }
  },
  components: {
    Icon
  },
  setup(props: Props) {
    return {}
  }
})
</script>