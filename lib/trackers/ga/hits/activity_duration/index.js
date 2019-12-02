import {
  ACTIVITY,
  ACTIVITY_COMPLETE,
  ACTIVITY_DURATION,
  ACTIVITY_START,
  TIMING,
  handlerFor,
} from '../../../../constants'

export const onActivityStart = handlerFor(ACTIVITY_START)
export const onActivityComplete = handlerFor(ACTIVITY_COMPLETE)

// Reports the amount of time the student spend between the start
// and end of an activity.
export default {
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
      timingLabel: this.pageForLesson(lesson),
    }
  },
}
