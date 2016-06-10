import { v4 as uuid } from 'node-uuid';

import { buildActions } from '../util';

const actionTypes = {
  set: {
    message: {
      voice: ({ id, voiceId, type }) => ({ id, voiceId, type }),
      text: ({ id, text, type }) => ({ id, text, type }),
      pitch: ({ id, pitch, type }) => ({ id, pitch, type }),
      rate: ({ id, rate, type }) => ({ id, rate, type }),
      author: ({ id, author, type }) => ({ id, author, type })
    }
  },
  create: {
    message: ({ id = uuid(), author = 'Anonymous', text = '', voiceId = 1, rate = 1, pitch = 1, type }) =>
      ({ id, author, text, voiceId, rate, pitch, type })
  },
  delete: {
    message: ({ id, type }) => ({ id, type }),
    all: { messages: ({ type }) => ({ type }) }
  },
  copy: {
    message: ({ id, type }) => ({ id, type })
  }
};

const actions = buildActions({}, actionTypes);

module.exports = actions;