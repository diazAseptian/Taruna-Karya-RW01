import React, { useState, useEffect } from 'react'
import { supabase, Article } from '../../lib/supabase'
import { X } from 'lucide-react'

interface ArticleFormProps {
  article?: Article | null
  onClose: () => void
  onSave: () => void
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, onClose, onSave }: ArticleFormProps) => {
  const [formData, setFormData] = useState({
    judul: '',
    isi: '',
    gambar: '',
    tanggal: new Date().toISOString().split('T')[0]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (article) {
      setFormData({
        judul: article.judul,
        isi: article.isi,
        gambar: article.gambar || '',
        tanggal: article.tanggal
      })
      setImagePreview(article.gambar || null)
    }
  }, [article])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `articles/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        throw new Error('Gagal upload gambar: ' + uploadError.message)
      }

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let imageUrl = formData.gambar
      
      // Upload new image if selected
      if (imageFile) {
        try {
          imageUrl = await uploadImage(imageFile)
        } catch (uploadError) {
          // If upload fails, continue without image
          console.error('Image upload failed:', uploadError)
          setError('Upload gambar gagal, artikel disimpan tanpa gambar')
          imageUrl = ''
        }
      }

      const dataToSave = {
        ...formData,
        gambar: imageUrl
      }

      if (article) {
        // Update existing article
        const { error } = await supabase
          .from('artikel')
          .update(dataToSave)
          .eq('id', article.id)
        
        if (error) throw error
      } else {
        // Create new article
        const { error } = await supabase
          .from('artikel')
          .insert([dataToSave])
        
        if (error) throw error
      }
      
      onSave()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {article ? 'Edit Artikel' : 'Tambah Artikel'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="judul" className="block text-sm font-medium text-gray-700 mb-2">
            Judul Artikel *
          </label>
          <input
            type="text"
            id="judul"
            required
            value={formData.judul}
            onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Masukkan judul artikel"
          />
        </div>

        <div>
          <label htmlFor="isi" className="block text-sm font-medium text-gray-700 mb-2">
            Isi Artikel *
          </label>
          <textarea
            id="isi"
            required
            rows={8}
            value={formData.isi}
            onChange={(e) => setFormData({ ...formData, isi: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            placeholder="Tulis isi artikel di sini..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gambar Artikel
          </label>
          
          {imagePreview && (
            <div className="mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border"
              />
            </div>
          )}
          
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 text-center">atau</p>
            <input
              type="url"
              value={formData.gambar}
              onChange={(e) => {
                setFormData({ ...formData, gambar: e.target.value })
                setImagePreview(e.target.value)
                setImageFile(null)
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Upload dari device atau masukkan URL gambar
          </p>
        </div>

        <div>
          <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-2">
            Tanggal Publikasi *
          </label>
          <input
            type="date"
            id="tanggal"
            required
            value={formData.tanggal}
            onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors duration-200"
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ArticleForm