import blue from "@/assets/images/blue.png";
import green from "@/assets/images/green.png";
import orange from "@/assets/images/orange.png";
import pink from "@/assets/images/pink.png";
import red from "@/assets/images/red.png";
import yellow from "@/assets/images/yellow.png";

const Card = ({ cardId, isActive }: { cardId: string; isActive: boolean }) => {
  const src = (() => {
    switch (cardId) {
      case "red":
        return red;
      case "blue":
        return blue;
      case "green":
        return green;
      case "orange":
        return orange;
      case "pink":
        return pink;
      case "yellow":
        return yellow;
      default:
        return blue;
    }
  })();
  return (
    <div
      className="relative flex h-10 justify-center rounded-lg"
      style={{
        border: `2px solid${isActive ? "#52a2aa" : "#eee"} `,
      }}
    >
      <img src={src} width={40} height={40} style={{ borderRadius: 8 }} />

      <div
        className="absolute inset-0 z-[1000] h-full w-full rounded-lg bg-white opacity-80"
        style={{
          visibility: isActive ? "hidden" : "visible",
        }}
      />
    </div>
  );
};

export default Card;
