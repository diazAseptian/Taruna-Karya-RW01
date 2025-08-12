import React, { useState, useEffect } from 'react'
import { supabase, Gallery } from '../../lib/supabase'
import { X } from 'lucide-react'

interface GalleryFormProps {
  galleryItem?: Gallery | null
  onClose: () => void
  onSave: () => void
}

const GalleryForm: React.FC<GalleryFormProps> = ({ galleryItem, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    url_foto: '',
    keterangan: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (galleryItem) {
      setFormData({
        url_foto: galleryItem.url_foto,
        keterangan: galleryItem.keterangan || ''
      })
      setImagePreview(galleryItem.url_foto || null)
    }
  }, [galleryItem])

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
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `gallery/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let imageUrl = formData.url_foto
      
      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const dataToSave = {
        ...formData,
        url_foto: imageUrl
      }

      if (galleryItem) {
        // Update existing gallery item
        const { error } = await supabase
          .from('galeri')
          .update(dataToSave)
          .eq('id', galleryItem.id)
        
        if (error) throw error
      } else {
        // Create new gallery item
        const { error } = await supabase
          .from('galeri')
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
          {galleryItem ? 'Edit Foto' : 'Tambah Foto'}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto Galeri *
          </label>
          
          {imagePreview && (
            <div className="mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-w-xs h-48 object-cover rounded-lg border"
              />
            </div>
          )}
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!galleryItem}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Pilih foto dari device Anda (JPG, PNG, GIF)
          </p>
        </div>

        <div>
          <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700 mb-2">
            Keterangan
          </label>
          <input
            type="text"
            id="keterangan"
            value={formData.keterangan}
            onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Masukkan keterangan foto (opsional)"
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

export default GalleryForm