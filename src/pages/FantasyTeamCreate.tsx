import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { PlayerCard } from "@/components/cricket/player-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TeamLogo } from "@/components/ui/team-logo";
import { Player, Match } from "@/types";
import { useAuth } from "@/hooks/use-auth";
import { cricketApi } from "@/services/api";
import { fantasyService } from "@/services/supabase";
import { toast } from "sonner";
import { AlertCircle, Trophy, CheckCircle2 } from "lucide-react";

export default function FantasyTeamCreate() {
  const { id: matchId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [match, setMatch] = useState<Match | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [captain, setCaptain] = useState<Player | null>(null);
  const [viceCaptain, setViceCaptain] = useState<Player | null>(null);
  const [currentTab, setCurrentTab] = useState("batsman");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter players by role
  const batsmen = players.filter(player => player.role === "Batsman");
  const bowlers = players.filter(player => player.role === "Bowler");
  const allRounders = players.filter(player => player.role === "All-Rounder");
  const wicketKeepers = players.filter(player => player.role === "Wicket-Keeper");

  // Team validation
  const isTeamValid = selectedPlayers.length === 11 && captain && viceCaptain && captain.id !== viceCaptain.id;

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        setIsLoading(true);
        if (!matchId) return;

        // In a real implementation, we would fetch from the API
        // For now, mock data
        const mockMatch: Match = {
          id: matchId,
          series_id: "ipl-2023",
          name: "Mumbai Indians vs Chennai Super Kings",
          status: "upcoming",
          match_type: "T20",
          venue: "Wankhede Stadium, Mumbai",
          date: new Date(Date.now() + 86400000), // tomorrow
          team_a: "Mumbai Indians",
          team_b: "Chennai Super Kings",
          fantasy_enabled: true
        };

        const mockPlayers: Player[] = [
          // Batsmen
          { id: "1", name: "Rohit Sharma", country: "India", role: "Batsman", batting_style: "Right Handed" },
          { id: "2", name: "Ishan Kishan", country: "India", role: "Batsman", batting_style: "Left Handed" },
          { id: "3", name: "Suryakumar Yadav", country: "India", role: "Batsman", batting_style: "Right Handed" },
          { id: "4", name: "Ruturaj Gaikwad", country: "India", role: "Batsman", batting_style: "Right Handed" },
          { id: "5", name: "Devon Conway", country: "New Zealand", role: "Batsman", batting_style: "Left Handed" },
          { id: "6", name: "Ajinkya Rahane", country: "India", role: "Batsman", batting_style: "Right Handed" },
          
          // Bowlers
          { id: "7", name: "Jasprit Bumrah", country: "India", role: "Bowler", bowling_style: "Right Arm Fast" },
          { id: "8", name: "Piyush Chawla", country: "India", role: "Bowler", bowling_style: "Leg Break" },
          { id: "9", name: "Deepak Chahar", country: "India", role: "Bowler", bowling_style: "Right Arm Medium" },
          { id: "10", name: "Tushar Deshpande", country: "India", role: "Bowler", bowling_style: "Right Arm Medium Fast" },
          { id: "11", name: "Matheesha Pathirana", country: "Sri Lanka", role: "Bowler", bowling_style: "Right Arm Fast" },
          
          // All-Rounders
          { id: "12", name: "Hardik Pandya", country: "India", role: "All-Rounder" },
          { id: "13", name: "Ravindra Jadeja", country: "India", role: "All-Rounder" },
          { id: "14", name: "Moeen Ali", country: "England", role: "All-Rounder" },
          { id: "15", name: "Shivam Dube", country: "India", role: "All-Rounder" },
          
          // Wicket-Keepers
          { id: "16", name: "MS Dhoni", country: "India", role: "Wicket-Keeper" },
          { id: "17", name: "Quinton de Kock", country: "South Africa", role: "Wicket-Keeper" }
        ];

        setMatch(mockMatch);
        setPlayers(mockPlayers);
      } catch (error) {
        console.error("Failed to fetch match details:", error);
        toast.error("Failed to load match details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  const handlePlayerSelect = (player: Player) => {
    if (isPlayerSelected(player.id)) {
      // Remove player
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      
      // If player was captain or vice captain, remove that role
      if (captain?.id === player.id) setCaptain(null);
      if (viceCaptain?.id === player.id) setViceCaptain(null);
    } else {
      // Add player if limit not reached
      if (selectedPlayers.length < 11) {
        setSelectedPlayers([...selectedPlayers, player]);
      } else {
        toast.error("You can't select more than 11 players");
      }
    }
  };

  const handleCaptainSelect = (player: Player) => {
    if (isPlayerSelected(player.id)) {
      if (captain?.id === player.id) {
        // Unselect if already captain
        setCaptain(null);
      } else {
        // Make captain
        setCaptain(player);
        // If this player was vice captain, remove that role
        if (viceCaptain?.id === player.id) {
          setViceCaptain(null);
        }
      }
    } else {
      toast.error("You must select this player for your team first");
    }
  };

  const handleViceCaptainSelect = (player: Player) => {
    if (isPlayerSelected(player.id)) {
      if (viceCaptain?.id === player.id) {
        // Unselect if already vice captain
        setViceCaptain(null);
      } else {
        // Make vice captain
        setViceCaptain(player);
        // If this player was captain, remove that role
        if (captain?.id === player.id) {
          setCaptain(null);
        }
      }
    } else {
      toast.error("You must select this player for your team first");
    }
  };

  const isPlayerSelected = (playerId: string) => {
    return selectedPlayers.some(player => player.id === playerId);
  };

  const handleSubmitTeam = async () => {
    if (!user) {
      toast.error("Please sign in to create a team");
      return;
    }

    if (!isTeamValid) {
      toast.error("Please select 11 players, a captain, and a vice captain");
      return;
    }

    if (!matchId) return;

    setIsSubmitting(true);

    try {
      // In a real implementation, we would call our Supabase service
      // For now, just simulate success
      setTimeout(() => {
        toast.success("Team created successfully!");
        navigate("/my-teams");
      }, 1000);
    } catch (error) {
      console.error("Failed to create team:", error);
      toast.error("Failed to create team");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !match) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cricblue-500"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Match Info Header */}
        <div className="bg-white rounded-lg shadow p-4">
          <h1 className="text-xl font-bold mb-2">{match.name}</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{match.match_type}</span>
            <span className="mx-2">•</span>
            <span>{match.venue}</span>
            <span className="mx-2">•</span>
            <span>{new Date(match.date).toLocaleDateString()}</span>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <TeamLogo teamName={match.team_a} size="md" />
              <span className="text-lg font-medium">vs</span>
              <TeamLogo teamName={match.team_b} size="md" />
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Selected</div>
              <div className="font-semibold">{selectedPlayers.length}/11 Players</div>
            </div>
          </div>
        </div>

        {/* Team Progress */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Team Selection Progress</h2>
            <span className="text-sm font-medium">{Math.round((selectedPlayers.length / 11) * 100)}%</span>
          </div>
          
          <Progress value={(selectedPlayers.length / 11) * 100} className="h-2" />
          
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center justify-between p-2 bg-muted rounded">
              <span>Batsmen</span>
              <span className="font-medium">{selectedPlayers.filter(p => p.role === "Batsman").length}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted rounded">
              <span>Bowlers</span>
              <span className="font-medium">{selectedPlayers.filter(p => p.role === "Bowler").length}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted rounded">
              <span>All-Rounders</span>
              <span className="font-medium">{selectedPlayers.filter(p => p.role === "All-Rounder").length}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted rounded">
              <span>Wicket-Keepers</span>
              <span className="font-medium">{selectedPlayers.filter(p => p.role === "Wicket-Keeper").length}</span>
            </div>
          </div>
        </div>

        {/* Captain & Vice-Captain Selection */}
        {selectedPlayers.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-3">Select Captain & Vice-Captain</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="h-5 w-5 text-cricblue-500" />
                  <h3 className="font-medium">Captain (2x Points)</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto p-1">
                  {selectedPlayers.map(player => (
                    <div 
                      key={`captain-${player.id}`}
                      className={`p-2 rounded-md border cursor-pointer flex items-center justify-between ${
                        captain?.id === player.id ? 'bg-cricblue-50 border-cricblue-500' : 'bg-muted/30 hover:bg-muted/50'
                      }`}
                      onClick={() => handleCaptainSelect(player)}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-cricblue-100 flex items-center justify-center text-cricblue-800 font-semibold mr-2">
                          {player.name.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{player.name}</div>
                          <div className="text-xs text-muted-foreground">{player.role}</div>
                        </div>
                      </div>
                      
                      {captain?.id === player.id && (
                        <CheckCircle2 className="h-5 w-5 text-cricblue-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="h-5 w-5 text-cricblue-300" />
                  <h3 className="font-medium">Vice-Captain (1.5x Points)</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto p-1">
                  {selectedPlayers.map(player => (
                    <div 
                      key={`vc-${player.id}`}
                      className={`p-2 rounded-md border cursor-pointer flex items-center justify-between ${
                        viceCaptain?.id === player.id ? 'bg-cricblue-50 border-cricblue-500' : 'bg-muted/30 hover:bg-muted/50'
                      }`}
                      onClick={() => handleViceCaptainSelect(player)}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-cricblue-100 flex items-center justify-center text-cricblue-800 font-semibold mr-2">
                          {player.name.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{player.name}</div>
                          <div className="text-xs text-muted-foreground">{player.role}</div>
                        </div>
                      </div>
                      
                      {viceCaptain?.id === player.id && (
                        <CheckCircle2 className="h-5 w-5 text-cricblue-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Player Selection Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 pb-0">
            <h2 className="font-semibold mb-3">Select 11 Players</h2>
            
            <Tabs defaultValue="batsman" value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="batsman">Batsmen</TabsTrigger>
                <TabsTrigger value="bowler">Bowlers</TabsTrigger>
                <TabsTrigger value="all-rounder">All-Rounders</TabsTrigger>
                <TabsTrigger value="wicket-keeper">Wicket-Keepers</TabsTrigger>
              </TabsList>
              
              <div className="p-4">
                <TabsContent value="batsman" className="m-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {batsmen.map(player => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        selected={isPlayerSelected(player.id)}
                        isCaptain={captain?.id === player.id}
                        isViceCaptain={viceCaptain?.id === player.id}
                        onClick={() => handlePlayerSelect(player)}
                        disabled={selectedPlayers.length >= 11 && !isPlayerSelected(player.id)}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="bowler" className="m-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {bowlers.map(player => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        selected={isPlayerSelected(player.id)}
                        isCaptain={captain?.id === player.id}
                        isViceCaptain={viceCaptain?.id === player.id}
                        onClick={() => handlePlayerSelect(player)}
                        disabled={selectedPlayers.length >= 11 && !isPlayerSelected(player.id)}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="all-rounder" className="m-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {allRounders.map(player => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        selected={isPlayerSelected(player.id)}
                        isCaptain={captain?.id === player.id}
                        isViceCaptain={viceCaptain?.id === player.id}
                        onClick={() => handlePlayerSelect(player)}
                        disabled={selectedPlayers.length >= 11 && !isPlayerSelected(player.id)}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="wicket-keeper" className="m-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {wicketKeepers.map(player => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        selected={isPlayerSelected(player.id)}
                        isCaptain={captain?.id === player.id}
                        isViceCaptain={viceCaptain?.id === player.id}
                        onClick={() => handlePlayerSelect(player)}
                        disabled={selectedPlayers.length >= 11 && !isPlayerSelected(player.id)}
                      />
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Submit Button */}
        <div className="sticky bottom-0 bg-white p-4 border-t flex justify-between items-center">
          <div className={`flex items-center ${isTeamValid ? 'text-green-600' : 'text-amber-600'}`}>
            {isTeamValid ? (
              <CheckCircle2 className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            <span className="font-medium text-sm">
              {isTeamValid 
                ? "Your team is ready!" 
                : `Select ${11 - selectedPlayers.length} more players${!captain || !viceCaptain ? " and C/VC" : ""}`}
            </span>
          </div>
          
          <Button 
            onClick={handleSubmitTeam}
            disabled={!isTeamValid || isSubmitting}
            className="ml-auto"
          >
            {isSubmitting ? "Creating Team..." : "Create Team"}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
