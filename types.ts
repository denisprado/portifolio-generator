export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

export interface Database {
  public: {
    Tables: {
      color_theme: {
        Row: {
          background_primary_color: string | null;
          background_secondary_color: string | null;
          created_at: string | null;
          id: string;
          text_primary_color: string | null;
          text_secondary_color: string | null;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          background_primary_color?: string | null;
          background_secondary_color?: string | null;
          created_at?: string | null;
          id?: string;
          text_primary_color?: string | null;
          text_secondary_color?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          background_primary_color?: string | null;
          background_secondary_color?: string | null;
          created_at?: string | null;
          id?: string;
          text_primary_color?: string | null;
          text_secondary_color?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      customers: {
        Row: {
          id: string;
          stripe_customer_id: string | null;
        };
        Insert: {
          id: string;
          stripe_customer_id?: string | null;
        };
        Update: {
          id?: string;
          stripe_customer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'customers_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      portfolio: {
        Row: {
          bio: string | null;
          color_theme_id: string | null;
          contact: string | null;
          created_at: string | null;
          cv: string | null;
          description: string | null;
          download_count: number | null;
          id: string;
          image_1: string | null;
          image_1_src: string | null;
          image_2: string | null;
          image_2_src: string | null;
          page_layout: string | null;
          spacing_theme_id: string | null;
          title: string | null;
          typography_theme_id: string | null;
          updated_at: string | null;
          use_profile_info: boolean | null;
          user_id: string | null;
          work_id: string[] | null;
        };
        Insert: {
          bio?: string | null;
          color_theme_id?: string | null;
          contact?: string | null;
          created_at?: string | null;
          cv?: string | null;
          description?: string | null;
          download_count?: number | null;
          id?: string;
          image_1?: string | null;
          image_1_src?: string | null;
          image_2?: string | null;
          image_2_src?: string | null;
          page_layout?: string | null;
          spacing_theme_id?: string | null;
          title?: string | null;
          typography_theme_id?: string | null;
          updated_at?: string | null;
          use_profile_info?: boolean | null;
          user_id?: string | null;
          work_id?: string[] | null;
        };
        Update: {
          bio?: string | null;
          color_theme_id?: string | null;
          contact?: string | null;
          created_at?: string | null;
          cv?: string | null;
          description?: string | null;
          download_count?: number | null;
          id?: string;
          image_1?: string | null;
          image_1_src?: string | null;
          image_2?: string | null;
          image_2_src?: string | null;
          page_layout?: string | null;
          spacing_theme_id?: string | null;
          title?: string | null;
          typography_theme_id?: string | null;
          updated_at?: string | null;
          use_profile_info?: boolean | null;
          user_id?: string | null;
          work_id?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'portfolio_color_theme_id_fkey';
            columns: ['color_theme_id'];
            isOneToOne: false;
            referencedRelation: 'color_theme';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'portfolio_spacing_theme_id_fkey';
            columns: ['spacing_theme_id'];
            isOneToOne: false;
            referencedRelation: 'spacing_theme';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'portfolio_typography_theme_id_fkey';
            columns: ['typography_theme_id'];
            isOneToOne: false;
            referencedRelation: 'typography_theme';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'portfolio_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      prices: {
        Row: {
          active: boolean | null;
          currency: string | null;
          description: string | null;
          id: string;
          interval: Database['public']['Enums']['pricing_plan_interval'] | null;
          interval_count: number | null;
          metadata: Json | null;
          product_id: string | null;
          trial_period_days: number | null;
          type: Database['public']['Enums']['pricing_type'] | null;
          unit_amount: number | null;
        };
        Insert: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id: string;
          interval?:
            | Database['public']['Enums']['pricing_plan_interval']
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database['public']['Enums']['pricing_type'] | null;
          unit_amount?: number | null;
        };
        Update: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          interval?:
            | Database['public']['Enums']['pricing_plan_interval']
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database['public']['Enums']['pricing_type'] | null;
          unit_amount?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'prices_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };
      products: {
        Row: {
          active: boolean | null;
          description: string | null;
          id: string;
          image: string | null;
          metadata: Json | null;
          name: string | null;
        };
        Insert: {
          active?: boolean | null;
          description?: string | null;
          id: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Update: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Relationships: [];
      };
      spacing_theme: {
        Row: {
          created_at: string;
          id: string;
          image_margin: string | null;
          margin: string | null;
          padding: string | null;
          title: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_margin?: string | null;
          margin?: string | null;
          padding?: string | null;
          title?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_margin?: string | null;
          margin?: string | null;
          padding?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          cancel_at: string | null;
          cancel_at_period_end: boolean | null;
          canceled_at: string | null;
          created: string;
          current_period_end: string;
          current_period_start: string;
          ended_at: string | null;
          id: string;
          metadata: Json | null;
          price_id: string | null;
          quantity: number | null;
          status: Database['public']['Enums']['subscription_status'] | null;
          trial_end: string | null;
          trial_start: string | null;
          user_id: string;
        };
        Insert: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database['public']['Enums']['subscription_status'] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id: string;
        };
        Update: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id?: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database['public']['Enums']['subscription_status'] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscriptions_price_id_fkey';
            columns: ['price_id'];
            isOneToOne: false;
            referencedRelation: 'prices';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'subscriptions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      typography_theme: {
        Row: {
          created_at: string | null;
          id: string;
          paragraph_font_family: string | null;
          paragraph_text_size: string | null;
          title: string | null;
          title_font_family: string | null;
          title_text_size: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          paragraph_font_family?: string | null;
          paragraph_text_size?: string | null;
          title?: string | null;
          title_font_family?: string | null;
          title_text_size?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          paragraph_font_family?: string | null;
          paragraph_text_size?: string | null;
          title?: string | null;
          title_font_family?: string | null;
          title_text_size?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          about: string | null;
          address: string | null;
          avatar_url: string | null;
          billing_address: Json | null;
          bio: string | null;
          created_at: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          payment_method: Json | null;
          phone: string | null;
          updated_at: string | null;
        };
        Insert: {
          about?: string | null;
          address?: string | null;
          avatar_url?: string | null;
          billing_address?: Json | null;
          bio?: string | null;
          created_at?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          payment_method?: Json | null;
          phone?: string | null;
          updated_at?: string | null;
        };
        Update: {
          about?: string | null;
          address?: string | null;
          avatar_url?: string | null;
          billing_address?: Json | null;
          bio?: string | null;
          created_at?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          payment_method?: Json | null;
          phone?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      work: {
        Row: {
          color_theme_id: string | null;
          created_at: string | null;
          description_1: string | null;
          description_1_order: string | null;
          description_2: string | null;
          description_2_order: string | null;
          id: string;
          image_1: string | null;
          image_1_order_image: string | null;
          image_1_orientation: string | null;
          image_1_src: string | null;
          image_2: string | null;
          image_2_order_image: string | null;
          image_2_orientation: string | null;
          image_2_src: string | null;
          page_layout: string | null;
          spacing_theme_id: string | null;
          tech_1_order: string | null;
          tech_2_order: string | null;
          tech_description_1: string | null;
          tech_description_2: string | null;
          text_1_horizontal_align: string | null;
          text_1_vertical_align: string | null;
          text_2_horizontal_align: string | null;
          text_2_vertical_align: string | null;
          title: string | null;
          typography_theme_id: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          color_theme_id?: string | null;
          created_at?: string | null;
          description_1?: string | null;
          description_1_order?: string | null;
          description_2?: string | null;
          description_2_order?: string | null;
          id?: string;
          image_1?: string | null;
          image_1_order_image?: string | null;
          image_1_orientation?: string | null;
          image_1_src?: string | null;
          image_2?: string | null;
          image_2_order_image?: string | null;
          image_2_orientation?: string | null;
          image_2_src?: string | null;
          page_layout?: string | null;
          spacing_theme_id?: string | null;
          tech_1_order?: string | null;
          tech_2_order?: string | null;
          tech_description_1?: string | null;
          tech_description_2?: string | null;
          text_1_horizontal_align?: string | null;
          text_1_vertical_align?: string | null;
          text_2_horizontal_align?: string | null;
          text_2_vertical_align?: string | null;
          title?: string | null;
          typography_theme_id?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          color_theme_id?: string | null;
          created_at?: string | null;
          description_1?: string | null;
          description_1_order?: string | null;
          description_2?: string | null;
          description_2_order?: string | null;
          id?: string;
          image_1?: string | null;
          image_1_order_image?: string | null;
          image_1_orientation?: string | null;
          image_1_src?: string | null;
          image_2?: string | null;
          image_2_order_image?: string | null;
          image_2_orientation?: string | null;
          image_2_src?: string | null;
          page_layout?: string | null;
          spacing_theme_id?: string | null;
          tech_1_order?: string | null;
          tech_2_order?: string | null;
          tech_description_1?: string | null;
          tech_description_2?: string | null;
          text_1_horizontal_align?: string | null;
          text_1_vertical_align?: string | null;
          text_2_horizontal_align?: string | null;
          text_2_vertical_align?: string | null;
          title?: string | null;
          typography_theme_id?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'work_color_theme_id_fkey';
            columns: ['color_theme_id'];
            isOneToOne: false;
            referencedRelation: 'color_theme';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'work_spacing_theme_id_fkey';
            columns: ['spacing_theme_id'];
            isOneToOne: false;
            referencedRelation: 'spacing_theme';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'work_typography_theme_id_fkey';
            columns: ['typography_theme_id'];
            isOneToOne: false;
            referencedRelation: 'typography_theme';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'work_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      pricing_plan_interval: 'day' | 'week' | 'month' | 'year';
      pricing_type: 'one_time' | 'recurring';
      subscription_status:
        | 'trialing'
        | 'active'
        | 'canceled'
        | 'incomplete'
        | 'incomplete_expired'
        | 'past_due'
        | 'unpaid'
        | 'paused';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
