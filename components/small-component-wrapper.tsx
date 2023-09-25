export const SmallComponentWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="pointer-events-none relative flex h-full w-full items-center overflow-hidden">
      <div className="absolute left-0 top-0 mx-auto flex h-[593px] w-[1024px] max-w-none shrink-0 origin-top-left scale-[0.34] p-0">
        {children}
      </div>
    </div>
  );
};
