import { useState } from "react";
import HeartIcon from "./Heart";

export default function Favourite() {
  enum heartColors {
    red = "#FF162B",
    transparent = "#000000",
  }

  const [heartColor, setHeartColor] = useState<string>(heartColors.transparent);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const changeColor = () => {
    setIsChecked(!isChecked);
    setHeartColor(isChecked ? heartColors.transparent : heartColors.red);
  };

  return (
    <div
      onClick={changeColor}
      className="my-2 flex w-40 cursor-pointer items-center gap-2 rounded-md bg-white p-2 lg:w-52"
    >
      <HeartIcon fillColor={heartColor} />
      <span className="lg:text-md text-sm">
        {heartColor === heartColors.red
          ? "Added to Favourite"
          : "Add to Favourite"}
      </span>
    </div>
  );
}
