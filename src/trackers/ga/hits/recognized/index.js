import {
  INTERACTION_RECOGNIZED,
  EVENT,
  THIRD_PARTY_API,
  SPEECHACE,
  RECOGNIZE,
  handlerFor,
} from '../../../../constants'

export const onInteractionRecognized = handlerFor(INTERACTION_RECOGNIZED)

// Record speechace api access
const Recognized = {
  hitType: EVENT,

  observe: INTERACTION_RECOGNIZED,

  [onInteractionRecognized]() {
    this.send(...arguments)
  },

  configure() {
    return {
      eventCategory: THIRD_PARTY_API,
      eventAction: SPEECHACE,
      eventLabel: RECOGNIZE,
    }
  },
}

export { Recognized }
