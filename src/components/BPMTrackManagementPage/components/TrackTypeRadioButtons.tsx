import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../../services/context';
import useBpmTrack from '../../../services/useBpmTrack';

const items = [
  { value: 'mora', label: '拍' },
  { value: 'syllable', label: '節' },
  { value: 'onebyone', label: 'One by One' },
  { value: 'syncopation', label: 'シンコペーション' },
];

const TrackTypeRadioButtons = () => {
  const { trackType, updateTrackType } = useBpmTrack();
  const [type, setType] = useState(trackType);

  useEffect(() => {
    setType(trackType);
  }, [trackType]);

  const handleChange = (type: string) => {
    updateTrackType(type);
  };
  return (
    <FormControl>
      <RadioGroup
        row
        value={type}
        onChange={(e) => handleChange(e.target.value)}
      >
        {items.map(({ value, label }, index) => (
          <FormControlLabel
            key={index}
            value={value}
            control={<Radio size='small' />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default TrackTypeRadioButtons;
