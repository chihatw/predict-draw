import {
  PAGE_STATE,
  USER_LABELS,
} from "@/application/pageStates/core/1-constants";
import { pageStatesActions } from "@/application/pageStates/framework/0-reducer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const MngPageStatePane = ({
  user,
  value,
}: {
  user: string;
  value: string | undefined;
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem(user);
    setOpen(value === String(true));
  }, [user]);

  const handleClick = () => {
    const updatedOpen = !open;
    setOpen(updatedOpen);
    localStorage.setItem(user, String(updatedOpen));
  };

  const handleChange = (value: string) => {
    console.log({ value });
    dispatch(pageStatesActions.changePageState({ id: user, state: value }));
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="w-full justify-start p-2"
        onClick={handleClick}
      >
        <div className="text-xs">{USER_LABELS[user] || "??"}</div>
      </Button>
      {open && (
        <RadioGroup
          className="flex flex-wrap"
          value={value}
          onValueChange={(value) => handleChange(value)}
        >
          {PAGE_STATE.map(({ value: itemvalue, label }, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={itemvalue} checked={itemvalue === value} />
              <Label className="whitespace-nowrap">{label}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </div>
  );
};

export default MngPageStatePane;
