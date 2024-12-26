export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: UserProfile
        Insert: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserProfile, 'id'>>
      }
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id'>>
      }
      quotes: {
        Row: Quote
        Insert: Omit<Quote, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Quote, 'id'>>
      }
      appointments: {
        Row: Appointment
        Insert: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Appointment, 'id'>>
      }
      verticals: {
        Row: Vertical
        Insert: Omit<Vertical, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Vertical, 'id'>>
      }
      quote_templates: {
        Row: QuoteTemplate
        Insert: Omit<QuoteTemplate, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<QuoteTemplate, 'id'>>
      }
    }
  }
}

export interface UserProfile {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'SALES_REP'
  created_at: string
  updated_at: string
}

export interface Quote {
  id: string
  client_name: string
  client_email: string
  total_amount: number
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED'
  created_by: string
  items: QuoteItem[]
  created_at: string
  updated_at: string
}

export interface QuoteItem {
  id: string
  quote_id: string
  product_id: string
  quantity: number
  unit_price: number
  options: Record<string, any>
  subtotal: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  category: string
  vertical: string
  name: string
  description: string
  base_price: number
  options: ProductOption[]
  created_at: string
  updated_at: string
}

export interface ProductOption {
  name: string
  type: 'checkbox' | 'select' | 'number'
  values: string[]
  price_modifier: number
}

export interface Vertical {
  id: string
  name: string
  description: string
  categories: string[]
  active: boolean
  created_at: string
  updated_at: string
}

export interface QuoteTemplate {
  id: string
  name: string
  vertical: string
  default_products: DefaultProduct[]
  created_by: string
  created_at: string
  updated_at: string
}

export interface DefaultProduct {
  product_id: string
  default_options: Record<string, any>
}

// ... rest of your types as defined above 