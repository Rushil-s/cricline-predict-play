
import { cn } from "@/lib/utils";
import { Player } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PlayerCardProps {
  player: Player;
  selected?: boolean;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  showRole?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function PlayerCard({
  player,
  selected = false,
  isCaptain = false,
  isViceCaptain = false,
  showRole = true,
  onClick,
  className,
  disabled = false,
}: PlayerCardProps) {
  // Generate initials for the avatar
  const initials = player.name
    .split(" ")
    .map(part => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all cursor-pointer",
        selected ? "border-cricblue-500 border-2" : "border-border",
        disabled ? "opacity-60 cursor-not-allowed" : "hover:border-cricblue-300",
        className
      )}
      onClick={!disabled ? onClick : undefined}
    >
      <CardHeader className="p-3 pb-0 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cricblue-100 text-cricblue-800 font-semibold">
            {initials}
          </div>
          <div>
            <h3 className="font-medium text-sm">{player.name}</h3>
            {showRole && (
              <p className="text-xs text-muted-foreground">{player.role || "Unknown Role"}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end space-y-1">
          {isCaptain && (
            <Badge variant="default" className="bg-cricblue-500 text-xs">
              Captain (2x)
            </Badge>
          )}
          {isViceCaptain && (
            <Badge variant="outline" className="border-cricblue-500 text-cricblue-500 text-xs">
              Vice Captain (1.5x)
            </Badge>
          )}
          {!isCaptain && !isViceCaptain && selected && (
            <Badge variant="outline" className="text-xs">
              Selected
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-2">
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div className="flex items-center">
            <span className="text-muted-foreground mr-1">Country:</span>
            <span className="font-medium">{player.country || "Unknown"}</span>
          </div>
          
          {player.batting_style && (
            <div className="flex items-center">
              <span className="text-muted-foreground mr-1">Batting:</span>
              <span className="font-medium">{player.batting_style}</span>
            </div>
          )}
          
          {player.bowling_style && (
            <div className="flex items-center">
              <span className="text-muted-foreground mr-1">Bowling:</span>
              <span className="font-medium">{player.bowling_style}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
