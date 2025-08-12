import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Article {
  id: number
  judul: string
  isi: string
  gambar?: string
  tanggal: string
  created_at?: string
}

export interface Member {
  id: number
  nama: string
  jabatan: string
  foto?: string
  kontak?: string
  created_at?: string
}

export interface Gallery {
  id: number
  url_foto: string
  keterangan?: string
  created_at?: string
}