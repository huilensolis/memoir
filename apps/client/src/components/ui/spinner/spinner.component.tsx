import { Loader } from "lucide-react";

type TProps = React.HTMLAttributes<HTMLOrSVGElement>;

export function Spinner({ className, ...props }: TProps) {
  return (
    <Loader
      className={["animate-spin w-5 h-5", className].join(" ")}
      {...props}
    />
  );
}
