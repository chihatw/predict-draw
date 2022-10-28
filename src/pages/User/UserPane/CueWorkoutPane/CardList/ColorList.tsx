import React, { useContext } from 'react';
import CardList from '.';
import { AppContext } from '../../../../../App';

const ColorList = () => {
  const { state } = useContext(AppContext);
  const COLORS = ['red', 'blue', 'yellow', 'green', 'pink', 'orange'];
  return (
    <CardList
      list={COLORS}
      columns={6}
      selectedList={state.cueWorkout.params.colors}
    />
  );
};

export default ColorList;
