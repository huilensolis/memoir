type TProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function Box({ children, className, ...props }: TProps) {
  return (
    <div
      className={[
        "bg-neutral-50 shadow-sm shadow-neutral-200 border border-neutral-200",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
