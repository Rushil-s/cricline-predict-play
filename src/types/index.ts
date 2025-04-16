
// API Types
export interface ApiResponse<T> {
  data: T;
  status: string;
  info?: Record<string, any>;
}

export interface Player {
  id: string;
  name: string;
  country: string;
  role: string;
  batting_style?: string;
  bowling_style?: string;
  dob?: Date;
  place_of_birth?: string;
}

export interface Country {
  id: string;
  name: string;
  generic_flag: string;
  fanart_flag: string;
}

export interface Series {
  id: string;
  name: string;
  start_date: Date;
  end_date: Date;
  odi: number;
  t20: number;
  test: number;
  matches: number;
  squads: number;
}

export interface Match {
  id: string;
  series_id: string;
  name: string;
  status: 'upcoming' | 'live' | 'completed';
  match_type: 'T20' | 'ODI' | 'Test' | string;
  venue: string;
  date: Date;
  datetime_gmt?: Date;
  team_a: string;
  team_b: string;
  score?: {
    team_a?: string;
    team_b?: string;
  };
  fantasy_enabled: boolean;
}

// Fantasy Types
export interface FantasyTeam {
  id: string;
  user_id: string;
  match_id: string;
  captain_id: string;
  vice_captain_id: string;
  created_at: Date;
  players?: Player[];
}

export interface FantasyTeamPlayer {
  fantasy_team_id: string;
  player_id: string;
}

export interface FantasyScore {
  id: string;
  match_id: string;
  player_id: string;
  runs: number;
  wickets: number;
  fours: number;
  sixes: number;
  maidens: number;
  catches: number;
  stumpings: number;
  strike_rate: number;
  economy_rate: number;
  fantasy_points: number;
}

// Prediction Types
export interface Prediction {
  id: string;
  user_id: string;
  match_id: string;
  question: string;
  option_selected: string;
  is_correct: boolean;
  points_wagered: number;
  points_won: number;
  created_at: Date;
}

// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  cricpoints: number;
  xp_level: number;
  created_at: Date;
}

export interface LeaderboardEntry {
  user_id: string;
  username?: string;
  total_fantasy_points: number;
  total_prediction_points: number;
  rank: number;
}

// UI Types
export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  current: boolean;
}

export interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  match_id: string;
}
