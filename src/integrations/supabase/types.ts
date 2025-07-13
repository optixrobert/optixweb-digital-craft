export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          key_hash: string
          last_used_at: string | null
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          key_hash: string
          last_used_at?: string | null
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          key_hash?: string
          last_used_at?: string | null
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_requests: {
        Row: {
          azienda: string
          conversion_date: string | null
          created_at: string
          follow_up_date: string | null
          follow_up_sent: boolean | null
          fonte_traffico: string | null
          id: string
          landing_page: string | null
          nome: string
          obiettivo_principale: string
          status: string
          updated_at: string
          whatsapp: string
        }
        Insert: {
          azienda: string
          conversion_date?: string | null
          created_at?: string
          follow_up_date?: string | null
          follow_up_sent?: boolean | null
          fonte_traffico?: string | null
          id?: string
          landing_page?: string | null
          nome: string
          obiettivo_principale: string
          status?: string
          updated_at?: string
          whatsapp: string
        }
        Update: {
          azienda?: string
          conversion_date?: string | null
          created_at?: string
          follow_up_date?: string | null
          follow_up_sent?: boolean | null
          fonte_traffico?: string | null
          id?: string
          landing_page?: string | null
          nome?: string
          obiettivo_principale?: string
          status?: string
          updated_at?: string
          whatsapp?: string
        }
        Relationships: []
      }
      blog_analytics: {
        Row: {
          blog_post_id: string | null
          created_at: string
          id: string
          referrer: string | null
          scroll_percentage: number | null
          session_id: string | null
          time_spent: number | null
          visitor_ip: string | null
        }
        Insert: {
          blog_post_id?: string | null
          created_at?: string
          id?: string
          referrer?: string | null
          scroll_percentage?: number | null
          session_id?: string | null
          time_spent?: number | null
          visitor_ip?: string | null
        }
        Update: {
          blog_post_id?: string | null
          created_at?: string
          id?: string
          referrer?: string | null
          scroll_percentage?: number | null
          session_id?: string | null
          time_spent?: number | null
          visitor_ip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_analytics_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published: boolean
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      clients: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          logo_url: string | null
          name: string
          published: boolean
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          logo_url?: string | null
          name: string
          published?: boolean
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          logo_url?: string | null
          name?: string
          published?: boolean
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      consultation_requests: {
        Row: {
          company: string | null
          consultation_date: string
          consultation_time: string
          consultation_type: string
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          consultation_date: string
          consultation_time: string
          consultation_type: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          consultation_date?: string
          consultation_time?: string
          consultation_type?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_requests: {
        Row: {
          azienda: string | null
          created_at: string
          email: string
          id: string
          messaggio: string
          nome: string
          servizio: string | null
          status: string
          telefono: string | null
          updated_at: string
        }
        Insert: {
          azienda?: string | null
          created_at?: string
          email: string
          id?: string
          messaggio: string
          nome: string
          servizio?: string | null
          status?: string
          telefono?: string | null
          updated_at?: string
        }
        Update: {
          azienda?: string | null
          created_at?: string
          email?: string
          id?: string
          messaggio?: string
          nome?: string
          servizio?: string | null
          status?: string
          telefono?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      conversion_metrics: {
        Row: {
          audit_request_id: string | null
          conversion_value: number | null
          id: string
          notes: string | null
          phase: string
          source_channel: string | null
          timestamp: string
        }
        Insert: {
          audit_request_id?: string | null
          conversion_value?: number | null
          id?: string
          notes?: string | null
          phase: string
          source_channel?: string | null
          timestamp?: string
        }
        Update: {
          audit_request_id?: string | null
          conversion_value?: number | null
          id?: string
          notes?: string | null
          phase?: string
          source_channel?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversion_metrics_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      email_sequences: {
        Row: {
          audit_request_id: string | null
          clicked: boolean | null
          email_body: string
          email_subject: string
          id: string
          opened: boolean | null
          replied: boolean | null
          sent_at: string
          sequence_type: string
        }
        Insert: {
          audit_request_id?: string | null
          clicked?: boolean | null
          email_body: string
          email_subject: string
          id?: string
          opened?: boolean | null
          replied?: boolean | null
          sent_at?: string
          sequence_type: string
        }
        Update: {
          audit_request_id?: string | null
          clicked?: boolean | null
          email_body?: string
          email_subject?: string
          id?: string
          opened?: boolean | null
          replied?: boolean | null
          sent_at?: string
          sequence_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_sequences_audit_request_id_fkey"
            columns: ["audit_request_id"]
            isOneToOne: false
            referencedRelation: "audit_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      landing_pages: {
        Row: {
          case_studies: string[] | null
          conversion_rate: number | null
          conversions: number | null
          created_at: string
          cta_primary: string
          cta_secondary: string | null
          hero_subtitle: string
          hero_title: string
          id: string
          published: boolean | null
          slug: string
          social_proof: string[] | null
          target_audience: string
          title: string
          updated_at: string
          value_proposition: string
          visits: number | null
        }
        Insert: {
          case_studies?: string[] | null
          conversion_rate?: number | null
          conversions?: number | null
          created_at?: string
          cta_primary: string
          cta_secondary?: string | null
          hero_subtitle: string
          hero_title: string
          id?: string
          published?: boolean | null
          slug: string
          social_proof?: string[] | null
          target_audience: string
          title: string
          updated_at?: string
          value_proposition: string
          visits?: number | null
        }
        Update: {
          case_studies?: string[] | null
          conversion_rate?: number | null
          conversions?: number | null
          created_at?: string
          cta_primary?: string
          cta_secondary?: string | null
          hero_subtitle?: string
          hero_title?: string
          id?: string
          published?: boolean | null
          slug?: string
          social_proof?: string[] | null
          target_audience?: string
          title?: string
          updated_at?: string
          value_proposition?: string
          visits?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          is_admin: boolean | null
          last_name: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          is_admin?: boolean | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          is_admin?: boolean | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscribers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          created_at: string
          id: string
          is_internal: boolean | null
          message: string
          ticket_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_internal?: boolean | null
          message: string
          ticket_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_internal?: boolean | null
          message?: string
          ticket_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tickets: {
        Row: {
          assigned_to: string | null
          category: string
          created_at: string
          description: string
          id: string
          priority: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          category?: string
          created_at?: string
          description: string
          id?: string
          priority?: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          category?: string
          created_at?: string
          description?: string
          id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      website_analytics: {
        Row: {
          created_at: string
          id: string
          page_path: string
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          visit_duration: number | null
          visitor_ip: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          page_path: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          visit_duration?: number | null
          visitor_ip?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          page_path?: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          visit_duration?: number | null
          visitor_ip?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
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
