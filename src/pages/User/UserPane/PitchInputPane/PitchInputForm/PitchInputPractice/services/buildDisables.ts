export const buildDisableds = (
  input: string,
  maxLength: number
): { highs: boolean[]; lows: boolean[] } => {
  const inputWithoutAccentMark = input.replace('＼', '');
  const moraCount = inputWithoutAccentMark.length;

  // 入力上限は、問題のモーラ数
  if (moraCount === maxLength) {
    return {
      highs: [true, true, true, true],
      lows: [true, true, true, true],
    };
  }

  // 最終拍には「ッ」を入力させない
  const isLastInput = moraCount === maxLength - 1;

  const lastMora = inputWithoutAccentMark.slice(-1);
  const lastPitchIsHigh = !input.includes('＼') || input.slice(-1) === '＼';

  switch (moraCount) {
    case 0:
      /**
       * 1文字目
       * */
      // 「タ」以外は入力不可
      return {
        highs: [false, true, true, true],
        lows: [false, true, true, true],
      };
    case 1:
      /**
       * 2文字目
       * */
      return input === 'タ＼'
        ? // 1文字目が高音の場合、2文字目は低音のみ
          {
            highs: [true, true, true, true],
            lows: [false, false, false, isLastInput ? true : false],
          }
        : // 1文字目が低音の場合、2文字目は高音のみ
          {
            highs: [false, false, false, isLastInput ? true : false],
            lows: [true, true, true, true],
          };
    /**
     * 3文字目以降
     */
    default:
      // 直前が高音
      if (lastPitchIsHigh) {
        let highs = [false, false, false, isLastInput ? true : false];
        let lows = [false, false, false, isLastInput ? true : false];

        // 特殊拍のアクセントは不可（直前が高音で、特殊拍の場合、低音は選ばせない）
        switch (lastMora) {
          case 'ー':
          case 'ン':
          case 'ッ':
            lows = [true, true, true, true];
            break;
          case 'タ':
          default:
        }

        switch (lastMora) {
          case 'ー':
            highs = [false, true, false, isLastInput ? true : false];
            break;
          case 'ン':
          case 'ッ':
            highs = [false, true, true, true];
            break;
          case 'タ':
          default:
        }
        return {
          highs,
          lows,
        };
      }
      // ３文字目以降で、直前が低音の場合は、アクセントが既出なので低音のみ

      let lows = [false, false, false, isLastInput ? true : false];
      switch (lastMora) {
        case 'ー':
          lows = [false, true, false, isLastInput ? true : false];
          break;
        case 'ン':
        case 'ッ':
          lows = [false, true, true, true];
          break;
        case 'タ':
        default:
      }
      return {
        highs: [true, true, true, true],
        lows,
      };
  }
};
