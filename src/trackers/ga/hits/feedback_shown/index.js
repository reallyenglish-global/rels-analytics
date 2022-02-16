import { FEEDBACK_SHOWN, EVENT, FEEDBACK, SHOW, handlerFor } from '../../../../constants'

export const onFeedbackShown = handlerFor(FEEDBACK_SHOWN)

const FeedbackShown = {
  hitType: EVENT,

  observe: FEEDBACK_SHOWN,

  [onFeedbackShown]() {
    this.send(...arguments)
  },

  configure(feedback) {
    return {
      eventCategory: FEEDBACK,
      eventAction: SHOW,
      eventLabel: feedback,
    }
  },
}

export { FeedbackShown }
