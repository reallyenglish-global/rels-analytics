import { INTERACTION_START, PAGEVIEW, handlerFor } from '../../../../constants'
import { pageForLesson } from '../../../../helpers'

const Pageview = {
  hitType: PAGEVIEW,

  observe: INTERACTION_START,

  [handlerFor(INTERACTION_START)]() {
    this.send(...arguments)
  },

  configure(lesson) {
    const page = pageForLesson(lesson)
    return { page }
  },
}

export { Pageview }
