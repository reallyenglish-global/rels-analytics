import { INTERACTION_START, PAGEVIEW, handlerFor } from '../../../../constants'

// Reports each 'page' of rels-lesson  as the user moves between interactions
module.exports = {
  hitType: PAGEVIEW,

  observe: INTERACTION_START,

  [handlerFor(INTERACTION_START)]() {
    this.send(...arguments)
  },

  configure(lesson) {
    const page = this.pageForLesson(lesson)
    return { page }
  },
}
