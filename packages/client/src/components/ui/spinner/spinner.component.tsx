import { Loader2 } from "lucide-react";

type TProps = React.HTMLAttributes<HTMLOrSVGElement>;

export function Spinner({ className, ...props }: TProps) {
  return (
    <Loader2 className={["animate-spin", className].join(" ")} {...props} />
  );
}
