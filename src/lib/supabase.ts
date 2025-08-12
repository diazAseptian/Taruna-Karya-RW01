import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ovvimknnphyiefxticdq.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92dmlta25ucGh5aWVmeHRpY2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTc1NDgsImV4cCI6MjA3MDU3MzU0OH0.QcL5TlQsEoQM-R3hX4PDGLaduxqLQdiVYiZ6-c-W8mA'

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
}

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