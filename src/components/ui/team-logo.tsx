
import { cn } from "@/lib/utils";

interface TeamLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  teamName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * A component to display team logos.
 * This is a placeholder that shows team initials when actual logos aren't available.
 */
export function TeamLogo({ teamName, size = "md", className, ...props }: TeamLogoProps) {
  // Extract initials from team name
  const initials = teamName
    .split(" ")
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  
  // Map size to tailwind classes
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-base",
  };
  
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-cricblue-500 text-white font-bold",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {initials}
    </div>
  );
}
