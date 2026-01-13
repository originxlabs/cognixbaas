export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string
          id: string
          max_projects: number
          name: string
          plan: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          max_projects?: number
          name: string
          plan?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          max_projects?: number
          name?: string
          plan?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      agent_activities: {
        Row: {
          action: string
          agent_name: string
          created_at: string
          details: string | null
          id: string
          project_id: string
          task_id: string | null
        }
        Insert: {
          action: string
          agent_name: string
          created_at?: string
          details?: string | null
          id?: string
          project_id: string
          task_id?: string | null
        }
        Update: {
          action?: string
          agent_name?: string
          created_at?: string
          details?: string | null
          id?: string
          project_id?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_activities_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_activities_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "project_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      llm_providers: {
        Row: {
          account_id: string
          api_key_encrypted: string | null
          created_at: string
          id: string
          provider: string
          updated_at: string
          usage_count: number
        }
        Insert: {
          account_id: string
          api_key_encrypted?: string | null
          created_at?: string
          id?: string
          provider: string
          updated_at?: string
          usage_count?: number
        }
        Update: {
          account_id?: string
          api_key_encrypted?: string | null
          created_at?: string
          id?: string
          provider?: string
          updated_at?: string
          usage_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "llm_providers_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      project_endpoints: {
        Row: {
          authenticated: boolean | null
          created_at: string
          description: string | null
          id: string
          method: string
          module: string
          path: string
          project_id: string
        }
        Insert: {
          authenticated?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          method: string
          module: string
          path: string
          project_id: string
        }
        Update: {
          authenticated?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          method?: string
          module?: string
          path?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_endpoints_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_modules: {
        Row: {
          created_at: string
          dependencies: string[] | null
          description: string | null
          endpoints_count: number
          id: string
          name: string
          project_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          dependencies?: string[] | null
          description?: string | null
          endpoints_count?: number
          id?: string
          name: string
          project_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          dependencies?: string[] | null
          description?: string | null
          endpoints_count?: number
          id?: string
          name?: string
          project_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_modules_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tasks: {
        Row: {
          assigned_agent: string | null
          created_at: string
          id: string
          module: string
          position: number
          project_id: string
          status: string
          task_code: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_agent?: string | null
          created_at?: string
          id?: string
          module: string
          position?: number
          project_id: string
          status?: string
          task_code: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_agent?: string | null
          created_at?: string
          id?: string
          module?: string
          position?: number
          project_id?: string
          status?: string
          task_code?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          account_id: string
          auth_method: string | null
          backend_type: string
          created_at: string
          custom_features: string[] | null
          database_type: string
          description: string | null
          entities: string[] | null
          generation_step: string | null
          github_branch: string | null
          github_connected: boolean | null
          github_last_sync: string | null
          github_repo: string | null
          id: string
          is_generating: boolean | null
          last_run_at: string | null
          multi_tenant: boolean | null
          name: string
          payments: string | null
          prompt: string | null
          sandbox_url: string | null
          short_code: string
          status: string
          updated_at: string
          version: string
        }
        Insert: {
          account_id: string
          auth_method?: string | null
          backend_type?: string
          created_at?: string
          custom_features?: string[] | null
          database_type?: string
          description?: string | null
          entities?: string[] | null
          generation_step?: string | null
          github_branch?: string | null
          github_connected?: boolean | null
          github_last_sync?: string | null
          github_repo?: string | null
          id?: string
          is_generating?: boolean | null
          last_run_at?: string | null
          multi_tenant?: boolean | null
          name: string
          payments?: string | null
          prompt?: string | null
          sandbox_url?: string | null
          short_code: string
          status?: string
          updated_at?: string
          version?: string
        }
        Update: {
          account_id?: string
          auth_method?: string | null
          backend_type?: string
          created_at?: string
          custom_features?: string[] | null
          database_type?: string
          description?: string | null
          entities?: string[] | null
          generation_step?: string | null
          github_branch?: string | null
          github_connected?: boolean | null
          github_last_sync?: string | null
          github_repo?: string | null
          id?: string
          is_generating?: boolean | null
          last_run_at?: string | null
          multi_tenant?: boolean | null
          name?: string
          payments?: string | null
          prompt?: string | null
          sandbox_url?: string | null
          short_code?: string
          status?: string
          updated_at?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist_signups: {
        Row: {
          created_at: string
          email: string
          id: string
          ip_address: string | null
          source: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          source?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          source?: string | null
          user_agent?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
