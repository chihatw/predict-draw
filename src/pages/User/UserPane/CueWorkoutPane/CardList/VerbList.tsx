import React, { useContext } from 'react';
import CardList from '.';
import { AppContext } from '../../../../../App';

const VerbList = () => {
  const { state } = useContext(AppContext);
  const VERBS = [
    'motsu',
    'ireru',
    'noseru',
    'yubisasu',
    'kabuseru',
    'hikkurikaesu',
  ];
  return (
    <CardList
      list={VERBS}
      columns={6}
      selectedList={state.cueWorkout.params.verbs}
    />
  );
};

export default VerbList;
