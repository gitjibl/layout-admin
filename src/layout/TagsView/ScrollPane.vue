<template>
  <el-row class="tags-cont">
    <i class="svg el-icon-back" @click="deltaXleft" />
    <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
      <slot />
    </el-scrollbar>
    <i class="svg el-icon-right" @click="deltaXright" />
    <el-dropdown class="tags-right" @command="handleCommand">
      <span class="el-dropdown-link">
        更多操作
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="refresh">刷新</el-dropdown-item>
        <el-dropdown-item command="close">关闭</el-dropdown-item>
        <el-dropdown-item command="closeTag">关闭其他</el-dropdown-item>
        <el-dropdown-item command="closeAll">关闭全部</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-row>
</template>

<script>
  const tagAndTagSpacing = 4 // tagAndTagSpacing

  export default {
    name: 'ScrollPane',
    data() {
      return {
        left: 0
      }
    },
    computed: {
      scrollWrapper() {
        return this.$refs.scrollContainer.$refs.wrap
      },
      ingSelected() {
        return this.$store.state.tagsView.selectedTag
      }
    },
    mounted() {
      this.scrollWrapper.addEventListener('scroll', this.emitScroll, true)
    },
    beforeDestroy() {
      this.scrollWrapper.removeEventListener('scroll', this.emitScroll)
    },
    methods: {
      handleCommand(command) {
        if (command === 'refresh') {
          this.$parent.refreshSelectedTag(this.ingSelected)
        }
        if (command === 'close') {
          this.$parent.closeSelectedTag(this.ingSelected)
        }
        if (command === 'closeTag') {
          this.$parent.closeOthersTags(this.ingSelected)
        }
        if (command === 'closeAll') {
          this.$parent.closeAllTags(this.ingSelected)
        }
      },
      deltaXleft() {
        const $scrollWrapper = this.scrollWrapper
        let leftScoll = $scrollWrapper.scrollWidth
        const timer = setInterval(() => {
          leftScoll = parseInt(leftScoll / 10)
          if (leftScoll <= 0) {
            clearInterval(timer)
            $scrollWrapper.scrollLeft = leftScoll
          }
        }, 15)
      },
      deltaXright() {
        const $scrollWrapper = this.scrollWrapper
        let left = 1
        const leftScoll = $scrollWrapper.scrollWidth
        const timer = setInterval(() => {
          left = left * 10
          if (leftScoll <= left) {
            clearInterval(timer)
            $scrollWrapper.scrollLeft = left
          }
        }, 15)
      },
      handleScroll(e) {
        const eventDelta = e.wheelDelta || -e.deltaY * 40
        const $scrollWrapper = this.scrollWrapper
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
      },
      emitScroll() {
        this.$emit('scroll')
      },
      moveToTarget(currentTag) {
        const $container = this.$refs.scrollContainer.$el
        const $containerWidth = $container.offsetWidth
        const $scrollWrapper = this.scrollWrapper
        const tagList = this.$parent.$refs.tag

        let firstTag = null
        let lastTag = null

        // find first tag and last tag
        if (tagList.length > 0) {
          firstTag = tagList[0]
          lastTag = tagList[tagList.length - 1]
        }

        if (firstTag === currentTag) {
          $scrollWrapper.scrollLeft = 0
        } else if (lastTag === currentTag) {
          $scrollWrapper.scrollLeft =
            $scrollWrapper.scrollWidth - $containerWidth
        } else {
          // find preTag and nextTag
          const currentIndex = tagList.findIndex((item) => item === currentTag)
          const prevTag = tagList[currentIndex - 1]
          const nextTag = tagList[currentIndex + 1]

          // the tag's offsetLeft after of nextTag
          const afterNextTagOffsetLeft =
            nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

          // the tag's offsetLeft before of prevTag
          const beforePrevTagOffsetLeft =
            prevTag.$el.offsetLeft - tagAndTagSpacing

          if (
            afterNextTagOffsetLeft >
            $scrollWrapper.scrollLeft + $containerWidth
          ) {
            $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
          } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
            $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags-cont {
    padding: 0 20px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    ::v-deep .tags-view-item {
      margin-top: 0 !important;
    }

    .svg {
      font-size: 18px;
      cursor: pointer;
    }

    .tags-right {
      width: 100px;
      text-align: right;
      cursor: default;

      i {
        transition: all 0.5s;
      }
    }

    .tags-right:hover {
      i {
        transform: rotate(180deg);
      }
    }
  }

  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    transition: 0.5s;
    width: calc(100% - 100px);
  }
</style>