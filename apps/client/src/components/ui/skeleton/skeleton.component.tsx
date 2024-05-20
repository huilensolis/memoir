function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["animate-pulse rounded-md bg-neutral-300", className].join(
        " ",
      )}
      {...props}
    />
  );
}

export { Skeleton };
