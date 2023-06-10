import { assign, createMachine } from 'xstate';
import { OnbActions, OnbEvents, OnbStates } from './models/state.models';

const stateMachine = createMachine({
  id: 'onboarding',
  initial: OnbStates.CLOSED,
  context: {
    coords: [-500, -500],
  },
  schema: {
    events: {} as {type: typeof OnbActions.MOVETO; value: [number, number]}
  },
  states: {
    [OnbStates.CLOSED]: {
      on: {
        [OnbEvents.EXPAND]: {
          target: OnbStates.OPENED
        },
        [OnbEvents.WAIT]: {
          target: OnbStates.WAITING
        },
        [OnbEvents.SHOW]: {
          target: OnbStates.OPENED
        },
        [OnbEvents.HIDE]: {},
      }
    },
    [OnbStates.OPENED]: {
      on: {
        [OnbEvents.SHRINK]: {
          target: OnbStates.CLOSED
        },
        [OnbEvents.SHOW]: {
          target: OnbStates.OPENED
        },
        [OnbEvents.HIDE]: {
          target: OnbStates.OPENED
        },
      }
    },
    [OnbStates.WAITING]: {
      on: {
        [OnbEvents.STOPWAITING]: {
          target: OnbStates.CLOSED
        },
      }
    },
    [OnbStates.TRANSFORMING]: {},
    [OnbStates.FINISHED]: {
      type: 'final'
    }
  },
}, {
  // actions: {
  //   [OnbActions.MOVETO]: assign({
  //     coords: (context, event) => event.value
  //   })
  // },
  services: {},
  guards: {}
});