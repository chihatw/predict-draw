import { recordVoiceParamsActions } from '@/application/recordVoiceParams/framework/0-reducer';
import { TextField } from '@mui/material';
import { RootState } from 'main';
import { useDispatch, useSelector } from 'react-redux';

const TargetPitchPane = () => {
  const dispatch = useDispatch();
  const rawPitchStr = useSelector(
    (state: RootState) => state.recordVoiceParams.rawPitchStr
  );

  const handleChangeInput = (input: string) => {
    dispatch(recordVoiceParamsActions.changeRawPitchStr(input));
  };
  return (
    <TextField
      size='small'
      value={rawPitchStr}
      label='rawPitchStr'
      onChange={(e) => handleChangeInput(e.target.value)}
      autoComplete='off'
    />
  );
};

export default TargetPitchPane;
