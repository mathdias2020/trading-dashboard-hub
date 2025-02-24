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
      admin_activities: {
        Row: {
          activity_type: string
          admin_id: string
          created_at: string | null
          description: string
          id: string
          target_id: string
          target_type: string
        }
        Insert: {
          activity_type: string
          admin_id: string
          created_at?: string | null
          description: string
          id?: string
          target_id: string
          target_type: string
        }
        Update: {
          activity_type?: string
          admin_id?: string
          created_at?: string | null
          description?: string
          id?: string
          target_id?: string
          target_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_activities_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
        ]
      }
      admins: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["admin_role"]
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          role: Database["public"]["Enums"]["admin_role"]
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["admin_role"]
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          account_number: string
          algo_trading: boolean | null
          contracts: number | null
          created_at: string | null
          email: string
          id: string
          max_contracts: number | null
          monthly_result: number | null
          mt5_account: string | null
          mt5_balance: number | null
          mt5_password: string | null
          name: string
          producer_id: string
          status: string
          subscription_date: string | null
          updated_at: string | null
        }
        Insert: {
          account_number: string
          algo_trading?: boolean | null
          contracts?: number | null
          created_at?: string | null
          email: string
          id?: string
          max_contracts?: number | null
          monthly_result?: number | null
          mt5_account?: string | null
          mt5_balance?: number | null
          mt5_password?: string | null
          name: string
          producer_id: string
          status?: string
          subscription_date?: string | null
          updated_at?: string | null
        }
        Update: {
          account_number?: string
          algo_trading?: boolean | null
          contracts?: number | null
          created_at?: string | null
          email?: string
          id?: string
          max_contracts?: number | null
          monthly_result?: number | null
          mt5_account?: string | null
          mt5_balance?: number | null
          mt5_password?: string | null
          name?: string
          producer_id?: string
          status?: string
          subscription_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producers"
            referencedColumns: ["id"]
          },
        ]
      }
      producers: {
        Row: {
          clients_count: number | null
          created_at: string | null
          email: string
          id: string
          name: string
          needs_mt5_setup: boolean | null
          needs_password_change: boolean | null
          producer_code: string
          revenue: number | null
          status: string
          updated_at: string | null
        }
        Insert: {
          clients_count?: number | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          needs_mt5_setup?: boolean | null
          needs_password_change?: boolean | null
          producer_code: string
          revenue?: number | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          clients_count?: number | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          needs_mt5_setup?: boolean | null
          needs_password_change?: boolean | null
          producer_code?: string
          revenue?: number | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_admin_id: string | null
          category: string
          client_id: string | null
          created_at: string | null
          description: string
          id: string
          priority: string
          producer_id: string | null
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_admin_id?: string | null
          category: string
          client_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          priority?: string
          producer_id?: string | null
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_admin_id?: string | null
          category?: string
          client_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          priority?: string
          producer_id?: string | null
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_admin_id_fkey"
            columns: ["assigned_admin_id"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producers"
            referencedColumns: ["id"]
          },
        ]
      }
      trades: {
        Row: {
          client_id: string
          created_at: string | null
          date: string
          id: string
          instrument: string
          producer_id: string | null
          result: number
          status: string | null
          type: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          date: string
          id?: string
          instrument: string
          producer_id?: string | null
          result: number
          status?: string | null
          type: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          date?: string
          id?: string
          instrument?: string
          producer_id?: string | null
          result?: number
          status?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "trades_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trades_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_super_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      admin_role:
        | "super_admin"
        | "technical_support"
        | "client_support"
        | "producer_support"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
