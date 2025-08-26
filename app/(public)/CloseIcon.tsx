type CloseIconProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function CloseIcon({
  width = 23,
  height = 23,
  className = "",
}: CloseIconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 21.5L21.5 2M2 2L21.5 21.5"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}
