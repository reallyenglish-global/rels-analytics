import { FEEDBACK_SHOWN, EVENT, FEEDBACK, SHOW, handlerFor } from '../../../../constants'

export const onFeedbackShown = handlerFor(FEEDBACK_SHOWN)

// Reports feedback presentation. More specifically,
// the event with deferred-transcript:trascript as the feedback
// tells us how many people look at the transcripts.
export default {
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
