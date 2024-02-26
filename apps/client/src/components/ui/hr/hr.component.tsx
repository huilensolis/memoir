import { type HTMLAttributes } from "react";

type TStyle = "horizontal" | "vertical";

const orientationStyles: Record<TStyle, string> = {
  horizontal: "w-full h-[2px]",
  vertical: "h-full w-[2px]",
};

type TProps = HTMLAttributes<HTMLHRElement> & {
  orientation: TStyle;
};

export function Hr({ orientation, className }: TProps) {
  return (
    <hr
      className={[
        `${orientationStyles[orientation]} rounded-md bg-neutral-300`,
        className,
      ].join(" ")}
    />
  );
}
