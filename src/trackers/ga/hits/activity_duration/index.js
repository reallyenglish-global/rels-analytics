import {
  ACTIVITY,
  ACTIVITY_COMPLETE,
  ACTIVITY_DURATION,
  ACTIVITY_START,
  TIMING,
  handlerFor,
} from '../../../../constants'
import { pageForLesson } from '../../../../helpers'
export const onActivityStart = handlerFor(ACTIVITY_START)
export const onActivityComplete = handlerFor(ACTIVITY_COMPLETE)

const ActivityDuration = {
  hitType: TIMING,

  observe: [ACTIVITY_START, ACTIVITY_COMPLETE],

  [onActivityStart]() {
    this.startAt = new Date()
  },

  [onActivityComplete]() {
    this.send(...arguments)
  },

  configure(lesson) {
    return {
      timingCategory: ACTIVITY,
      timingVar: ACTIVITY_DURATION,
      timingValue: new Date() - (this.startAt || new Date()),
      timingLabel: pageForLesson(lesson),
    }
  },
}

export { ActivityDuration }
