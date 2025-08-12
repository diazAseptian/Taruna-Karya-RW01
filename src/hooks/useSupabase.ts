import { useState, useEffect } from 'react'
import { supabase, Article, Member, Gallery } from '../lib/supabase'

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('artikel')
        .select('*')
        .order('tanggal', { ascending: false })
      
      if (error) throw error
      setArticles(data || [])
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  return { articles, loading, error, refetch: fetchArticles }
}

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('anggota')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setMembers(data || [])
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  return { members, loading, error, refetch: fetchMembers }
}

export const useGallery = () => {
  const [gallery, setGallery] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGallery = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('galeri')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setGallery(data || [])
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGallery()
  }, [])

  return { gallery, loading, error, refetch: fetchGallery }
}