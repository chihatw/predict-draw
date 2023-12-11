import { RootState } from "@/main";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import PlayCircleRounded from "@mui/icons-material/PlayCircleRounded";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";

// const rotate = keyframes`
//   0%  {
//     transform: rotate(0deg);
//   }

//   100% {
//     transform: rotate(-360deg);
//   }
// `;

const PlayButton = ({ handleClick }: { handleClick: () => void }) => {
  const { isRunning, points } = useSelector(
    (state: RootState) => state.cueWorkoutParams,
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <IconButton color="primary" onClick={handleClick}>
        {isRunning ? (
          <ChangeCircleIcon
            // className={css`
            //   animation: ${rotate} 4s linear infinite;
            // `}
            sx={{ fontSize: 120 }}
          />
        ) : points ? (
          <></>
        ) : (
          <PlayCircleRounded sx={{ fontSize: 120 }} />
        )}
      </IconButton>
    </div>
  );
};

export default PlayButton;
