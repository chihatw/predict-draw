import { getRandomInt, shuffle } from '../../utils';

const VERB_WEIGHT: { [key: string]: number } = {
  motsu: 2,
  yubisasu: 1,
  hikkurikaesu: 1,
  ireru: 4,
  noseru: 4,
  kabuseru: 4,
};

const getVerbId = (verbs: string[]) => {
  const weightedVerbArray = getWeightedVerbArray(verbs);
  const verbIndex = getRandomInt(weightedVerbArray.length);
  return weightedVerbArray[verbIndex];
};

export default getVerbId;

const getWeightedVerbArray = (verbs: string[]) => {
  let weightedVerbArray = [];
  for (const verb of verbs) {
    for (let i = 0; i < VERB_WEIGHT[verb]; i++) {
      weightedVerbArray.push(verb);
    }
  }
  return shuffle(weightedVerbArray);
};
