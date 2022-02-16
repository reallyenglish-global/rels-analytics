import { INTERACTION_START, PAGEVIEW, handlerFor } from '../../../../constants'
import { pageForLesson } from '../../../../helpers'
// Reports each 'page' of rels-lesson  as the user moves between interactions
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
