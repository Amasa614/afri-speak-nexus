export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contributions: {
        Row: {
          created_at: string
          duration_ms: number | null
          id: number
          status: Database["public"]["Enums"]["contribution_status"]
          storage_url: string | null
          submitted_data: Json
          task_id: number
          user_id: string
          rejection_reason: string | null
        }
        Insert: {
          created_at?: string
          duration_ms?: number | null
          id?: number
          status?: Database["public"]["Enums"]["contribution_status"]
          storage_url?: string | null
          submitted_data?: Json
          task_id: number
          user_id: string
          rejection_reason?: string | null
        }
        Update: {
          created_at?: string
          duration_ms?: number | null
          id?: number
          status?: Database["public"]["Enums"]["contribution_status"]
          storage_url?: string | null
          submitted_data?: Json
          task_id?: number
          user_id?: string
          rejection_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contributions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          is_admin: boolean | null
          languages: string[] | null
          role: string | null
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          languages?: string[] | null
          role?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          languages?: string[] | null
          role?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string | null
          batch_id: string | null
          content: Json
          created_at: string
          created_by: string
          id: number
          language: string
          priority: Database["public"]["Enums"]["priority_level"]
          status: Database["public"]["Enums"]["task_status"]
          type: Database["public"]["Enums"]["task_type"]
          project_id: number | null
        }
        Insert: {
          assigned_to?: string | null
          batch_id?: string | null
          content: Json
          created_at?: string
          created_by: string
          id?: number
          language: string
          priority?: Database["public"]["Enums"]["priority_level"]
          status?: Database["public"]["Enums"]["task_status"]
          type: Database["public"]["Enums"]["task_type"]
          project_id?: number | null
        }
        Update: {
          assigned_to?: string | null
          batch_id?: string | null
          content?: Json
          created_at?: string
          created_by?: string
          id?: number
          language?: string
          priority?: Database["public"]["Enums"]["priority_level"]
          status?: Database["public"]["Enums"]["task_status"]
          type?: Database["public"]["Enums"]["task_type"]
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      validations: {
        Row: {
          comment: string | null
          contribution_id: number
          created_at: string
          id: number
          is_approved: boolean
          validator_id: string
        }
        Insert: {
          comment?: string | null
          contribution_id: number
          created_at?: string
          id?: number
          is_approved: boolean
          validator_id: string
        }
        Update: {
          comment?: string | null
          contribution_id?: number
          created_at?: string
          id?: number
          is_approved?: boolean
          validator_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "validations_contribution_id_fkey"
            columns: ["contribution_id"]
            isOneToOne: false
            referencedRelation: "contributions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "validations_validator_id_fkey"
            columns: ["validator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          id: number
          created_at: string
          created_by: string
          name: string
          description: string | null
          type: Database["public"]["Enums"]["project_type"]
          status: Database["public"]["Enums"]["project_status"]
          settings: Json | null
          thumbnail_url: string | null
          source_language: string | null
          target_languages: string[] | null
          organization_id: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          created_by: string
          name: string
          description?: string | null
          type: Database["public"]["Enums"]["project_type"]
          status?: Database["public"]["Enums"]["project_status"]
          settings?: Json | null
          thumbnail_url?: string | null
          source_language?: string | null
          target_languages?: string[] | null
          organization_id?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          created_by?: string
          name?: string
          description?: string | null
          type?: Database["public"]["Enums"]["project_type"]
          status?: Database["public"]["Enums"]["project_status"]
          settings?: Json | null
          thumbnail_url?: string | null
          source_language?: string | null
          target_languages?: string[] | null
          organization_id?: string | null
        }
      }
      project_members: {
        Row: {
          id: number
          project_id: number
          user_id: string
          role: Database["public"]["Enums"]["project_role"]
          created_at: string
        }
        Insert: {
          id?: number
          project_id: number
          user_id: string
          role: Database["public"]["Enums"]["project_role"]
          created_at?: string
        }
        Update: {
          id?: number
          project_id?: number
          user_id?: string
          role?: Database["public"]["Enums"]["project_role"]
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_admin_access: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      contribution_status: 
        | "pending_validation" 
        | "validated" 
        | "rejected" 
        | "ready_for_transcription" 
        | "rejected_audio" 
        | "in_transcription" 
        | "pending_transcript_validation"
        | "rejected_transcript"
        | "finalized"
      priority_level: "low" | "medium" | "high"
      task_status: "pending" | "assigned" | "completed" | "archived"
      task_type: "asr" | "tts" | "transcription" | "translation"
      project_type: "translation" | "transcription" | "tts"
      project_status: "active" | "archived" | "completed" | "draft"
      project_role: "owner" | "admin" | "contributor" | "viewer"
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
    Enums: {
      contribution_status: ["pending_validation", "validated", "rejected", "ready_for_transcription", "rejected_audio", "in_transcription", "pending_transcript_validation", "rejected_transcript", "finalized"],
      priority_level: ["low", "medium", "high"],
      task_status: ["pending", "assigned", "completed", "archived"],
      task_type: ["asr", "tts", "transcription", "translation"],
      project_type: ["translation", "transcription", "tts"],
      project_status: ["active", "archived", "completed", "draft"],
      project_role: ["owner", "admin", "contributor", "viewer"],
    },
  },
} as const
