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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      ai_credit_ledger: {
        Row: {
          balance_after: number
          business_id: string
          created_at: string
          created_by: string | null
          delta: number
          id: string
          reason: string
        }
        Insert: {
          balance_after: number
          business_id: string
          created_at?: string
          created_by?: string | null
          delta: number
          id?: string
          reason: string
        }
        Update: {
          balance_after?: number
          business_id?: string
          created_at?: string
          created_by?: string | null
          delta?: number
          id?: string
          reason?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_credit_ledger_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_reference_documents: {
        Row: {
          business_id: string
          created_at: string
          doc_type: Database["public"]["Enums"]["reference_doc_type"]
          file_url: string
          id: string
          notes: string | null
          uploaded_by: string | null
        }
        Insert: {
          business_id: string
          created_at?: string
          doc_type: Database["public"]["Enums"]["reference_doc_type"]
          file_url: string
          id?: string
          notes?: string | null
          uploaded_by?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string
          doc_type?: Database["public"]["Enums"]["reference_doc_type"]
          file_url?: string
          id?: string
          notes?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_reference_documents_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_usage_logs: {
        Row: {
          business_id: string
          cost_usd: number
          created_at: string
          credits_used: number
          feature: Database["public"]["Enums"]["ai_feature"]
          id: string
          input_tokens: number | null
          model: string | null
          output_tokens: number | null
          related_entity_id: string | null
          related_entity_type: string | null
        }
        Insert: {
          business_id: string
          cost_usd?: number
          created_at?: string
          credits_used?: number
          feature: Database["public"]["Enums"]["ai_feature"]
          id?: string
          input_tokens?: number | null
          model?: string | null
          output_tokens?: number | null
          related_entity_id?: string | null
          related_entity_type?: string | null
        }
        Update: {
          business_id?: string
          cost_usd?: number
          created_at?: string
          credits_used?: number
          feature?: Database["public"]["Enums"]["ai_feature"]
          id?: string
          input_tokens?: number | null
          model?: string | null
          output_tokens?: number | null
          related_entity_id?: string | null
          related_entity_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_logs_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          actor_type: Database["public"]["Enums"]["actor_type"]
          business_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          metadata: Json
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_type: Database["public"]["Enums"]["actor_type"]
          business_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_type?: Database["public"]["Enums"]["actor_type"]
          business_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_members: {
        Row: {
          business_id: string
          created_at: string
          id: string
          role: Database["public"]["Enums"]["member_role"]
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["member_role"]
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["member_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_members_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          ai_credit_balance: number
          branding: Json
          business_type: string
          created_at: string
          created_by: string | null
          id: string
          name: string
          plan: Database["public"]["Enums"]["business_plan"]
          primary_contact: string | null
          status: Database["public"]["Enums"]["business_status"]
          stripe_customer_id: string | null
          updated_at: string
        }
        Insert: {
          ai_credit_balance?: number
          branding?: Json
          business_type: string
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          plan?: Database["public"]["Enums"]["business_plan"]
          primary_contact?: string | null
          status?: Database["public"]["Enums"]["business_status"]
          stripe_customer_id?: string | null
          updated_at?: string
        }
        Update: {
          ai_credit_balance?: number
          branding?: Json
          business_type?: string
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          plan?: Database["public"]["Enums"]["business_plan"]
          primary_contact?: string | null
          status?: Database["public"]["Enums"]["business_status"]
          stripe_customer_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      client_segment_members: {
        Row: {
          added_at: string
          client_id: string
          segment_id: string
        }
        Insert: {
          added_at?: string
          client_id: string
          segment_id: string
        }
        Update: {
          added_at?: string
          client_id?: string
          segment_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_segment_members_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_segment_members_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "client_segments"
            referencedColumns: ["id"]
          },
        ]
      }
      client_segments: {
        Row: {
          business_id: string
          created_at: string
          id: string
          name: string
          rules: Json
        }
        Insert: {
          business_id: string
          created_at?: string
          id?: string
          name: string
          rules?: Json
        }
        Update: {
          business_id?: string
          created_at?: string
          id?: string
          name?: string
          rules?: Json
        }
        Relationships: [
          {
            foreignKeyName: "client_segments_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          business_id: string
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          notes: string | null
          phone: string | null
          source: Database["public"]["Enums"]["client_source"]
          tags: string[]
          updated_at: string
          whatsapp_id: string | null
        }
        Insert: {
          business_id: string
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          notes?: string | null
          phone?: string | null
          source?: Database["public"]["Enums"]["client_source"]
          tags?: string[]
          updated_at?: string
          whatsapp_id?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          notes?: string | null
          phone?: string | null
          source?: Database["public"]["Enums"]["client_source"]
          tags?: string[]
          updated_at?: string
          whatsapp_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          business_id: string
          client_id: string
          content_html: string
          created_at: string
          id: string
          pdf_url: string | null
          public_token: string
          quote_id: string | null
          signature_data: string | null
          signed_at: string | null
          signer_ip: string | null
          signer_name: string | null
          status: Database["public"]["Enums"]["contract_status"]
          updated_at: string
        }
        Insert: {
          business_id: string
          client_id: string
          content_html: string
          created_at?: string
          id?: string
          pdf_url?: string | null
          public_token?: string
          quote_id?: string | null
          signature_data?: string | null
          signed_at?: string | null
          signer_ip?: string | null
          signer_name?: string | null
          status?: Database["public"]["Enums"]["contract_status"]
          updated_at?: string
        }
        Update: {
          business_id?: string
          client_id?: string
          content_html?: string
          created_at?: string
          id?: string
          pdf_url?: string | null
          public_token?: string
          quote_id?: string | null
          signature_data?: string | null
          signed_at?: string | null
          signer_ip?: string | null
          signer_name?: string | null
          status?: Database["public"]["Enums"]["contract_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          business_id: string
          channel: Database["public"]["Enums"]["conversation_channel"]
          client_id: string
          created_at: string
          id: string
          last_message_at: string | null
          status: Database["public"]["Enums"]["conversation_status"]
        }
        Insert: {
          business_id: string
          channel: Database["public"]["Enums"]["conversation_channel"]
          client_id: string
          created_at?: string
          id?: string
          last_message_at?: string | null
          status?: Database["public"]["Enums"]["conversation_status"]
        }
        Update: {
          business_id?: string
          channel?: Database["public"]["Enums"]["conversation_channel"]
          client_id?: string
          created_at?: string
          id?: string
          last_message_at?: string | null
          status?: Database["public"]["Enums"]["conversation_status"]
        }
        Relationships: [
          {
            foreignKeyName: "conversations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      email_sends: {
        Row: {
          business_id: string
          client_id: string
          created_at: string
          id: string
          resend_email_id: string | null
          scheduled_for: string | null
          sent_at: string | null
          sequence_step_id: string | null
          status: Database["public"]["Enums"]["email_send_status"]
          template_id: string | null
        }
        Insert: {
          business_id: string
          client_id: string
          created_at?: string
          id?: string
          resend_email_id?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          sequence_step_id?: string | null
          status?: Database["public"]["Enums"]["email_send_status"]
          template_id?: string | null
        }
        Update: {
          business_id?: string
          client_id?: string
          created_at?: string
          id?: string
          resend_email_id?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          sequence_step_id?: string | null
          status?: Database["public"]["Enums"]["email_send_status"]
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_sends_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sends_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sends_sequence_step_id_fkey"
            columns: ["sequence_step_id"]
            isOneToOne: false
            referencedRelation: "email_sequence_steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sends_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_sequence_steps: {
        Row: {
          delay_days: number
          id: string
          sequence_id: string
          sort_order: number
          template_id: string
        }
        Insert: {
          delay_days?: number
          id?: string
          sequence_id: string
          sort_order?: number
          template_id: string
        }
        Update: {
          delay_days?: number
          id?: string
          sequence_id?: string
          sort_order?: number
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_sequence_steps_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "email_sequences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sequence_steps_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_sequences: {
        Row: {
          business_id: string
          created_at: string
          id: string
          name: string
          segment_id: string | null
          status: Database["public"]["Enums"]["sequence_status"]
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          id?: string
          name: string
          segment_id?: string | null
          status?: Database["public"]["Enums"]["sequence_status"]
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          id?: string
          name?: string
          segment_id?: string | null
          status?: Database["public"]["Enums"]["sequence_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_sequences_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sequences_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "client_segments"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          body_html: string
          business_id: string
          created_at: string
          id: string
          name: string
          subject: string
          updated_at: string
        }
        Insert: {
          body_html: string
          business_id: string
          created_at?: string
          id?: string
          name: string
          subject: string
          updated_at?: string
        }
        Update: {
          body_html?: string
          business_id?: string
          created_at?: string
          id?: string
          name?: string
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_templates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      form_fields: {
        Row: {
          field_type: Database["public"]["Enums"]["form_field_type"]
          form_id: string
          id: string
          is_required: boolean
          label: string
          options: Json
          sort_order: number
        }
        Insert: {
          field_type?: Database["public"]["Enums"]["form_field_type"]
          form_id: string
          id?: string
          is_required?: boolean
          label: string
          options?: Json
          sort_order?: number
        }
        Update: {
          field_type?: Database["public"]["Enums"]["form_field_type"]
          form_id?: string
          id?: string
          is_required?: boolean
          label?: string
          options?: Json
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "form_fields_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submissions: {
        Row: {
          business_id: string
          client_id: string | null
          created_at: string
          data: Json
          form_id: string
          id: string
        }
        Insert: {
          business_id: string
          client_id?: string | null
          created_at?: string
          data?: Json
          form_id: string
          id?: string
        }
        Update: {
          business_id?: string
          client_id?: string | null
          created_at?: string
          data?: Json
          form_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_submissions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_submissions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_submissions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms: {
        Row: {
          business_id: string
          created_at: string
          embed_token: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          embed_token?: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          embed_token?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forms_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount_due: number
          amount_paid: number
          amount_type: Database["public"]["Enums"]["invoice_amount_type"]
          business_id: string
          client_id: string
          contract_id: string | null
          created_at: string
          currency: string
          id: string
          paid_at: string | null
          public_token: string
          quote_id: string | null
          status: Database["public"]["Enums"]["invoice_status"]
          stripe_payment_intent_id: string | null
          unlocked_at: string | null
          updated_at: string
        }
        Insert: {
          amount_due: number
          amount_paid?: number
          amount_type?: Database["public"]["Enums"]["invoice_amount_type"]
          business_id: string
          client_id: string
          contract_id?: string | null
          created_at?: string
          currency?: string
          id?: string
          paid_at?: string | null
          public_token?: string
          quote_id?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          stripe_payment_intent_id?: string | null
          unlocked_at?: string | null
          updated_at?: string
        }
        Update: {
          amount_due?: number
          amount_paid?: number
          amount_type?: Database["public"]["Enums"]["invoice_amount_type"]
          business_id?: string
          client_id?: string
          contract_id?: string | null
          created_at?: string
          currency?: string
          id?: string
          paid_at?: string | null
          public_token?: string
          quote_id?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          stripe_payment_intent_id?: string | null
          unlocked_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string | null
          business_id: string
          content_type: Database["public"]["Enums"]["message_content_type"]
          conversation_id: string
          created_at: string
          id: string
          media_url: string | null
          sender_type: Database["public"]["Enums"]["message_sender"]
          sender_user_id: string | null
          whatsapp_message_id: string | null
        }
        Insert: {
          body?: string | null
          business_id: string
          content_type?: Database["public"]["Enums"]["message_content_type"]
          conversation_id: string
          created_at?: string
          id?: string
          media_url?: string | null
          sender_type: Database["public"]["Enums"]["message_sender"]
          sender_user_id?: string | null
          whatsapp_message_id?: string | null
        }
        Update: {
          body?: string | null
          business_id?: string
          content_type?: Database["public"]["Enums"]["message_content_type"]
          conversation_id?: string
          created_at?: string
          id?: string
          media_url?: string | null
          sender_type?: Database["public"]["Enums"]["message_sender"]
          sender_user_id?: string | null
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          business_id: string
          created_at: string
          currency: string
          id: string
          invoice_id: string
          raw_event: Json | null
          status: Database["public"]["Enums"]["payment_status"]
          stripe_payment_intent_id: string | null
        }
        Insert: {
          amount: number
          business_id: string
          created_at?: string
          currency?: string
          id?: string
          invoice_id: string
          raw_event?: Json | null
          status?: Database["public"]["Enums"]["payment_status"]
          stripe_payment_intent_id?: string | null
        }
        Update: {
          amount?: number
          business_id?: string
          created_at?: string
          currency?: string
          id?: string
          invoice_id?: string
          raw_event?: Json | null
          status?: Database["public"]["Enums"]["payment_status"]
          stripe_payment_intent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_subscriptions: {
        Row: {
          business_id: string
          created_at: string
          current_period_end: string | null
          id: string
          plan: Database["public"]["Enums"]["business_plan"]
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan?: Database["public"]["Enums"]["business_plan"]
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          current_period_end?: string | null
          id?: string
          plan?: Database["public"]["Enums"]["business_plan"]
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "platform_subscriptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_events: {
        Row: {
          business_id: string
          event_type: Database["public"]["Enums"]["quote_event_type"]
          id: string
          metadata: Json
          occurred_at: string
          quote_id: string
        }
        Insert: {
          business_id: string
          event_type: Database["public"]["Enums"]["quote_event_type"]
          id?: string
          metadata?: Json
          occurred_at?: string
          quote_id: string
        }
        Update: {
          business_id?: string
          event_type?: Database["public"]["Enums"]["quote_event_type"]
          id?: string
          metadata?: Json
          occurred_at?: string
          quote_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_events_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_items: {
        Row: {
          description: string
          id: string
          quantity: number
          quote_id: string
          sort_order: number
          total: number
          unit_price: number
        }
        Insert: {
          description: string
          id?: string
          quantity?: number
          quote_id: string
          sort_order?: number
          total?: number
          unit_price?: number
        }
        Update: {
          description?: string
          id?: string
          quantity?: number
          quote_id?: string
          sort_order?: number
          total?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_items_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          approved_at: string | null
          business_id: string
          client_id: string
          conversation_id: string | null
          created_at: string
          currency: string
          generated_by: Database["public"]["Enums"]["message_sender"]
          id: string
          pdf_url: string | null
          public_token: string
          status: Database["public"]["Enums"]["quote_status"]
          subtotal: number
          tax: number
          total: number
          updated_at: string
          version: number
        }
        Insert: {
          approved_at?: string | null
          business_id: string
          client_id: string
          conversation_id?: string | null
          created_at?: string
          currency?: string
          generated_by?: Database["public"]["Enums"]["message_sender"]
          id?: string
          pdf_url?: string | null
          public_token?: string
          status?: Database["public"]["Enums"]["quote_status"]
          subtotal?: number
          tax?: number
          total?: number
          updated_at?: string
          version?: number
        }
        Update: {
          approved_at?: string | null
          business_id?: string
          client_id?: string
          conversation_id?: string | null
          created_at?: string
          currency?: string
          generated_by?: Database["public"]["Enums"]["message_sender"]
          id?: string
          pdf_url?: string | null
          public_token?: string
          status?: Database["public"]["Enums"]["quote_status"]
          subtotal?: number
          tax?: number
          total?: number
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "quotes_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      super_admins: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_connections: {
        Row: {
          access_token_secret: string
          business_id: string
          created_at: string
          display_phone: string | null
          id: string
          phone_number_id: string
          status: string
          updated_at: string
          webhook_verify_token: string
        }
        Insert: {
          access_token_secret: string
          business_id: string
          created_at?: string
          display_phone?: string | null
          id?: string
          phone_number_id: string
          status?: string
          updated_at?: string
          webhook_verify_token?: string
        }
        Update: {
          access_token_secret?: string
          business_id?: string
          created_at?: string
          display_phone?: string | null
          id?: string
          phone_number_id?: string
          status?: string
          updated_at?: string
          webhook_verify_token?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_connections_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_member_of: { Args: { p_business_id: string }; Returns: boolean }
      is_super_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      actor_type: "super_admin" | "staff" | "client" | "system" | "ai"
      ai_feature:
        | "quote_generation"
        | "contract_generation"
        | "chat_reply"
        | "audio_transcription"
        | "vision_analysis"
        | "other"
      business_plan: "starter" | "pro" | "scale"
      business_status: "active" | "suspended" | "trial"
      client_source: "whatsapp" | "web_form" | "manual"
      contract_status: "draft" | "sent" | "signed" | "void"
      conversation_channel: "whatsapp" | "internal"
      conversation_status: "open" | "pending_ai" | "closed"
      email_send_status:
        | "queued"
        | "sent"
        | "delivered"
        | "opened"
        | "clicked"
        | "bounced"
        | "failed"
      form_field_type:
        | "text"
        | "textarea"
        | "email"
        | "phone"
        | "select"
        | "checkbox"
        | "date"
        | "file"
      invoice_amount_type: "full" | "deposit"
      invoice_status: "locked" | "unlocked" | "partially_paid" | "paid" | "void"
      member_role: "owner" | "staff"
      message_content_type: "text" | "audio" | "image" | "document"
      message_sender: "client" | "staff" | "ai" | "system"
      payment_status: "pending" | "succeeded" | "failed" | "refunded"
      quote_event_type:
        | "viewed"
        | "pdf_downloaded"
        | "approved"
        | "adjustment_requested"
      quote_status:
        | "draft"
        | "sent"
        | "viewed"
        | "adjustment_requested"
        | "approved"
        | "expired"
      reference_doc_type: "quote" | "contract" | "invoice" | "other"
      sequence_status: "draft" | "active" | "paused" | "archived"
      subscription_status: "trialing" | "active" | "past_due" | "canceled"
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
    Enums: {
      actor_type: ["super_admin", "staff", "client", "system", "ai"],
      ai_feature: [
        "quote_generation",
        "contract_generation",
        "chat_reply",
        "audio_transcription",
        "vision_analysis",
        "other",
      ],
      business_plan: ["starter", "pro", "scale"],
      business_status: ["active", "suspended", "trial"],
      client_source: ["whatsapp", "web_form", "manual"],
      contract_status: ["draft", "sent", "signed", "void"],
      conversation_channel: ["whatsapp", "internal"],
      conversation_status: ["open", "pending_ai", "closed"],
      email_send_status: [
        "queued",
        "sent",
        "delivered",
        "opened",
        "clicked",
        "bounced",
        "failed",
      ],
      form_field_type: [
        "text",
        "textarea",
        "email",
        "phone",
        "select",
        "checkbox",
        "date",
        "file",
      ],
      invoice_amount_type: ["full", "deposit"],
      invoice_status: ["locked", "unlocked", "partially_paid", "paid", "void"],
      member_role: ["owner", "staff"],
      message_content_type: ["text", "audio", "image", "document"],
      message_sender: ["client", "staff", "ai", "system"],
      payment_status: ["pending", "succeeded", "failed", "refunded"],
      quote_event_type: [
        "viewed",
        "pdf_downloaded",
        "approved",
        "adjustment_requested",
      ],
      quote_status: [
        "draft",
        "sent",
        "viewed",
        "adjustment_requested",
        "approved",
        "expired",
      ],
      reference_doc_type: ["quote", "contract", "invoice", "other"],
      sequence_status: ["draft", "active", "paused", "archived"],
      subscription_status: ["trialing", "active", "past_due", "canceled"],
    },
  },
} as const
