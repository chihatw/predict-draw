import * as rtk from '@reduxjs/toolkit';
import logger from 'redux-logger';

import reducer from 'application/0-store/reducer';
import { Services } from 'infrastructure/services';

const serializableCheck = {
  ignoredActions: [],
  ignoredPaths: [],
};

export const configureStore = import.meta.env.DEV
  ? // 開発の場合
    (services: Services) =>
      rtk.configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({ serializableCheck }).concat(logger), // logger を挟む
        // todo .concat([...middleware].map((f) => f(services))),
        devTools: import.meta.env.DEV,
      })
  : // 本番の場合
    (services: Services) =>
      rtk.configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({ serializableCheck }),
        // todo  .concat(
        //   [...middleware].map((f) => f(services))
        // ),
        devTools: import.meta.env.DEV,
      });
