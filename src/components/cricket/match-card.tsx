
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TeamLogo } from "@/components/ui/team-logo";
import { Match } from "@/types";
import { Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface MatchCardProps {
  match: Match;
  className?: string;
}

export function MatchCard({ match, className }: MatchCardProps) {
  // Format the match date/time
  const matchDate = new Date(match.date);
  const formattedDate = format(matchDate, "dd MMM yyyy");
  const formattedTime = format(matchDate, "h:mm a");
  
  // Determine badge color based on match status
  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "live":
        return "destructive";
      case "upcoming":
        return "default";
      case "completed":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4 pb-2 flex justify-between items-start">
        <div>
          <Badge variant={getBadgeVariant(match.status)} className="mb-1">
            {match.status.toUpperCase()}
          </Badge>
          <h3 className="text-base font-semibold">{match.name}</h3>
          <p className="text-xs text-muted-foreground">{match.match_type}</p>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-3 items-center mb-4">
          {/* Team A */}
          <div className="flex flex-col items-center justify-center">
            <TeamLogo teamName={match.team_a} size="md" />
            <p className="text-sm font-medium mt-2">{match.team_a}</p>
            {match.score?.team_a && (
              <p className="text-xs text-muted-foreground">{match.score.team_a}</p>
            )}
          </div>
          
          {/* VS */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-lg font-bold text-muted-foreground">VS</div>
          </div>
          
          {/* Team B */}
          <div className="flex flex-col items-center justify-center">
            <TeamLogo teamName={match.team_b} size="md" />
            <p className="text-sm font-medium mt-2">{match.team_b}</p>
            {match.score?.team_b && (
              <p className="text-xs text-muted-foreground">{match.score.team_b}</p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-2" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-2" />
            <span>{formattedTime}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-2" />
            <span>{match.venue}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between bg-secondary bg-opacity-30">
        {match.fantasy_enabled ? (
          <Link to={`/matches/${match.id}/fantasy`} className="w-full">
            <Button variant="default" size="sm" className="w-full">
              {match.status === 'upcoming' ? 'Create Fantasy Team' : 'View Match'}
            </Button>
          </Link>
        ) : (
          <Button variant="outline" size="sm" className="w-full" disabled>
            Fantasy Disabled
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
