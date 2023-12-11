import { RootState } from "@/main";
import { useSelector } from "react-redux";
import CardList from ".";

const ColorList = () => {
  const { colors } = useSelector((state: RootState) => state.cueWorkoutParams);
  const COLORS = ["red", "blue", "yellow", "green", "pink", "orange"];
  return <CardList list={COLORS} columns={6} selectedList={colors} />;
};

export default ColorList;
