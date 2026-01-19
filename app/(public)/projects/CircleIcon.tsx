type CircleIconProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function CircleIcon({
  width = 23,
  height = 23,
  className = "",
}: CircleIconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="currentColor" />
    </svg>
  );
}
