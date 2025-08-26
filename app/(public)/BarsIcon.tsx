type BarsIconProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function BarsIcon({
  width = 25,
  height = 11,
  className = "",
}: BarsIconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 25 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0"
        y="0"
        width="25"
        height="3"
        fill="currentColor"
        stroke="currentColor"
      />
      <rect
        x="0"
        y="8"
        width="25"
        height="3"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
}
