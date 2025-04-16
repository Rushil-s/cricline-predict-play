
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { MatchCard } from "@/components/cricket/match-card";
import { Button } from "@/components/ui/button";
import { Match } from "@/types";
import { cricketApi } from "@/services/api";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Calendar, 
  TrendingUp, 
  Users, 
  ChevronRight, 
  Trophy 
} from "lucide-react";

export default function Index() {
  const { user } = useAuth();
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // In a real implementation, we would call our API
        // For now, let's create mock data
        const mockMatches: Match[] = [
          {
            id: "1",
            series_id: "ipl-2023",
            name: "Mumbai Indians vs Chennai Super Kings",
            status: "live",
            match_type: "T20",
            venue: "Wankhede Stadium, Mumbai",
            date: new Date().toISOString(), // current date as string
            team_a: "Mumbai Indians",
            team_b: "Chennai Super Kings",
            score: {
              team_a: "120/4 (15.2 ov)",
              team_b: "Yet to bat"
            },
            fantasy_enabled: true
          },
          {
            id: "2",
            series_id: "ipl-2023",
            name: "Royal Challengers Bangalore vs Kolkata Knight Riders",
            status: "upcoming",
            match_type: "T20",
            venue: "M. Chinnaswamy Stadium, Bangalore",
            date: new Date(Date.now() + 86400000).toISOString(), // tomorrow as string
            team_a: "Royal Challengers",
            team_b: "Kolkata Knight Riders",
            fantasy_enabled: true
          },
          {
            id: "3",
            series_id: "ipl-2023",
            name: "Delhi Capitals vs Rajasthan Royals",
            status: "upcoming",
            match_type: "T20",
            venue: "Arun Jaitley Stadium, Delhi",
            date: new Date(Date.now() + 172800000).toISOString(), // day after tomorrow as string
            team_a: "Delhi Capitals",
            team_b: "Rajasthan Royals",
            fantasy_enabled: true
          },
          {
            id: "4",
            series_id: "wc-2023",
            name: "India vs Australia",
            status: "upcoming",
            match_type: "ODI",
            venue: "Melbourne Cricket Ground, Australia",
            date: new Date(Date.now() + 259200000).toISOString(), // 3 days from now as string
            team_a: "India",
            team_b: "Australia",
            fantasy_enabled: true
          }
        ];
        
        setLiveMatches(mockMatches.filter(match => match.status === 'live'));
        setUpcomingMatches(mockMatches.filter(match => match.status === 'upcoming'));
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center py-8 px-4 bg-gradient-to-r from-cricblue-50 to-blue-50 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-cricblue-900 mb-4">
            Welcome to TheCricLine
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            The ultimate fantasy cricket experience - free to play, pure fun!
          </p>
          {user ? (
            <div className="inline-flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
              <Trophy className="h-5 w-5 text-cricblue-500 mr-2" />
              <span className="font-medium">{user.cricpoints} CricPoints</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-gray-500">Level {user.xp_level}</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login">
                <Button size="lg">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">Register</Button>
              </Link>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="bg-cricblue-100 p-3 w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
              <Users className="h-6 w-6 text-cricblue-700" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Fantasy Teams</h2>
            <p className="text-gray-600 mb-4">Create your dream team of 11 players with a captain and vice-captain.</p>
            <Link to="/matches">
              <Button variant="link" className="p-0 h-auto text-cricblue-600">
                Create Teams <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="bg-cricblue-100 p-3 w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-cricblue-700" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Predictions</h2>
            <p className="text-gray-600 mb-4">Wager your CricPoints on match outcomes and player performances.</p>
            <Link to="/predictions">
              <Button variant="link" className="p-0 h-auto text-cricblue-600">
                Make Predictions <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="bg-cricblue-100 p-3 w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-cricblue-700" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Leaderboards</h2>
            <p className="text-gray-600 mb-4">Compete for the top spot and earn special tags like "Fantasy Guru".</p>
            <Link to="/leaderboard">
              <Button variant="link" className="p-0 h-auto text-cricblue-600">
                View Leaderboard <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Live Matches Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></span>
              Live Matches
            </h2>
            <Link to="/matches">
              <Button variant="ghost" size="sm" className="text-cricblue-600">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg overflow-hidden border">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : liveMatches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {liveMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <Calendar className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No Live Matches</h3>
              <p className="text-muted-foreground">Check back later for live matches</p>
            </div>
          )}
        </section>

        {/* Upcoming Matches Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-cricblue-600" />
              Upcoming Matches
            </h2>
            <Link to="/matches">
              <Button variant="ghost" size="sm" className="text-cricblue-600">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg overflow-hidden border">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : upcomingMatches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {upcomingMatches.slice(0, 3).map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <Calendar className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No Upcoming Matches</h3>
              <p className="text-muted-foreground">Check back later for upcoming matches</p>
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}
