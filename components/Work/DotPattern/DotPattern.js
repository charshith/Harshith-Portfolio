import { useId } from "react";
import { cn } from "utils/cn";

/**
 * Subtle SVG dot grid background
 * - Fixed cx/cy bug (previously cx={cy})
 * - Added `color` prop for quick tinting
 * - Backward compatible with existing usage
 */
const DotPattern = ({
  width = 16, // grid cell width
  height = 16, // grid cell height
  x = 0, // pattern x offset
  y = 0, // pattern y offset
  cx = 1, // dot center x within cell
  cy = 1, // dot center y within cell
  cr = 1, // dot radius
  color = "rgba(163,163,163,0.8)", // default #a3a3a3/80
  className,
  ...props
}) => {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          {/* IMPORTANT: use the correct cx/cy */}
          <circle cx={cx} cy={cy} r={cr} fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
};

export default DotPattern;
