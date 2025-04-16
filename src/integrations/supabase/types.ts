export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      countries: {
        Row: {
          fanart_flag: string | null
          generic_flag: string | null
          id: string
          name: string | null
        }
        Insert: {
          fanart_flag?: string | null
          generic_flag?: string | null
          id: string
          name?: string | null
        }
        Update: {
          fanart_flag?: string | null
          generic_flag?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      fantasy_scores: {
        Row: {
          catches: number | null
          economy_rate: number | null
          fantasy_points: number | null
          fours: number | null
          id: string
          maidens: number | null
          match_id: string | null
          player_id: string | null
          runs: number | null
          sixes: number | null
          strike_rate: number | null
          stumpings: number | null
          wickets: number | null
        }
        Insert: {
          catches?: number | null
          economy_rate?: number | null
          fantasy_points?: number | null
          fours?: number | null
          id?: string
          maidens?: number | null
          match_id?: string | null
          player_id?: string | null
          runs?: number | null
          sixes?: number | null
          strike_rate?: number | null
          stumpings?: number | null
          wickets?: number | null
        }
        Update: {
          catches?: number | null
          economy_rate?: number | null
          fantasy_points?: number | null
          fours?: number | null
          id?: string
          maidens?: number | null
          match_id?: string | null
          player_id?: string | null
          runs?: number | null
          sixes?: number | null
          strike_rate?: number | null
          stumpings?: number | null
          wickets?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fantasy_scores_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fantasy_scores_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      fantasy_team_players: {
        Row: {
          fantasy_team_id: string
          player_id: string
        }
        Insert: {
          fantasy_team_id: string
          player_id: string
        }
        Update: {
          fantasy_team_id?: string
          player_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fantasy_team_players_fantasy_team_id_fkey"
            columns: ["fantasy_team_id"]
            isOneToOne: false
            referencedRelation: "fantasy_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fantasy_team_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      fantasy_teams: {
        Row: {
          captain_id: string | null
          created_at: string | null
          id: string
          match_id: string | null
          user_id: string | null
          vice_captain_id: string | null
        }
        Insert: {
          captain_id?: string | null
          created_at?: string | null
          id?: string
          match_id?: string | null
          user_id?: string | null
          vice_captain_id?: string | null
        }
        Update: {
          captain_id?: string | null
          created_at?: string | null
          id?: string
          match_id?: string | null
          user_id?: string | null
          vice_captain_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fantasy_teams_captain_id_fkey"
            columns: ["captain_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fantasy_teams_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fantasy_teams_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fantasy_teams_vice_captain_id_fkey"
            columns: ["vice_captain_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      leaderboard: {
        Row: {
          rank: number | null
          total_fantasy_points: number | null
          total_prediction_points: number | null
          user_id: string | null
        }
        Insert: {
          rank?: number | null
          total_fantasy_points?: number | null
          total_prediction_points?: number | null
          user_id?: string | null
        }
        Update: {
          rank?: number | null
          total_fantasy_points?: number | null
          total_prediction_points?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          date: string | null
          datetime_gmt: string | null
          fantasy_enabled: boolean | null
          id: string
          match_type: string | null
          name: string | null
          score: Json | null
          series_id: string | null
          status: string | null
          team_a: string | null
          team_b: string | null
          venue: string | null
        }
        Insert: {
          date?: string | null
          datetime_gmt?: string | null
          fantasy_enabled?: boolean | null
          id: string
          match_type?: string | null
          name?: string | null
          score?: Json | null
          series_id?: string | null
          status?: string | null
          team_a?: string | null
          team_b?: string | null
          venue?: string | null
        }
        Update: {
          date?: string | null
          datetime_gmt?: string | null
          fantasy_enabled?: boolean | null
          id?: string
          match_type?: string | null
          name?: string | null
          score?: Json | null
          series_id?: string | null
          status?: string | null
          team_a?: string | null
          team_b?: string | null
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "series"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          batting_style: string | null
          bowling_style: string | null
          country: string | null
          dob: string | null
          id: string
          name: string | null
          place_of_birth: string | null
          role: string | null
        }
        Insert: {
          batting_style?: string | null
          bowling_style?: string | null
          country?: string | null
          dob?: string | null
          id: string
          name?: string | null
          place_of_birth?: string | null
          role?: string | null
        }
        Update: {
          batting_style?: string | null
          bowling_style?: string | null
          country?: string | null
          dob?: string | null
          id?: string
          name?: string | null
          place_of_birth?: string | null
          role?: string | null
        }
        Relationships: []
      }
      predictions: {
        Row: {
          created_at: string | null
          id: string
          is_correct: boolean | null
          match_id: string | null
          option_selected: string | null
          points_wagered: number | null
          points_won: number | null
          question: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          match_id?: string | null
          option_selected?: string | null
          points_wagered?: number | null
          points_won?: number | null
          question?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          match_id?: string | null
          option_selected?: string | null
          points_wagered?: number | null
          points_won?: number | null
          question?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "predictions_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "predictions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      series: {
        Row: {
          end_date: string | null
          id: string
          matches: number | null
          name: string | null
          odi: number | null
          squads: number | null
          start_date: string | null
          t20: number | null
          test: number | null
        }
        Insert: {
          end_date?: string | null
          id: string
          matches?: number | null
          name?: string | null
          odi?: number | null
          squads?: number | null
          start_date?: string | null
          t20?: number | null
          test?: number | null
        }
        Update: {
          end_date?: string | null
          id?: string
          matches?: number | null
          name?: string | null
          odi?: number | null
          squads?: number | null
          start_date?: string | null
          t20?: number | null
          test?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          cricpoints: number | null
          email: string | null
          id: string
          username: string | null
          xp_level: number | null
        }
        Insert: {
          created_at?: string | null
          cricpoints?: number | null
          email?: string | null
          id?: string
          username?: string | null
          xp_level?: number | null
        }
        Update: {
          created_at?: string | null
          cricpoints?: number | null
          email?: string | null
          id?: string
          username?: string | null
          xp_level?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
