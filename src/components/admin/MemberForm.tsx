import React, { useState, useEffect } from 'react'
import { supabase, Member } from '../../lib/supabase'
import { X } from 'lucide-react'

interface MemberFormProps {
  member?: Member | null
  onClose: () => void
  onSave: () => void
}

const MemberForm: React.FC<MemberFormProps> = ({ member, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nama: '',
    jabatan: '',
    foto: '',
    kontak: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (member) {
      setFormData({
        nama: member.nama,
        jabatan: member.jabatan,
        foto: member.foto || '',
        kontak: member.kontak || ''
      })
      setImagePreview(member.foto || null)
    }
  }, [member])

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
    const filePath = `members/${fileName}`

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
      let imageUrl = formData.foto
      
      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const dataToSave = {
        ...formData,
        foto: imageUrl
      }

      if (member) {
        // Update existing member
        const { error } = await supabase
          .from('anggota')
          .update(dataToSave)
          .eq('id', member.id)
        
        if (error) throw error
      } else {
        // Create new member
        const { error } = await supabase
          .from('anggota')
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
          {member ? 'Edit Anggota' : 'Tambah Anggota'}
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
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap *
          </label>
          <input
            type="text"
            id="nama"
            required
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div>
          <label htmlFor="jabatan" className="block text-sm font-medium text-gray-700 mb-2">
            Jabatan *
          </label>
          <input
            type="text"
            id="jabatan"
            required
            value={formData.jabatan}
            onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Masukkan jabatan"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto Anggota
          </label>
          
          {imagePreview && (
            <div className="mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full border mx-auto"
              />
            </div>
          )}
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Pilih foto dari device Anda (JPG, PNG, GIF)
          </p>
        </div>

        <div>
          <label htmlFor="kontak" className="block text-sm font-medium text-gray-700 mb-2">
            Kontak (WhatsApp/Email)
          </label>
          <input
            type="text"
            id="kontak"
            value={formData.kontak}
            onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="081234567890 atau email@example.com"
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

export default MemberForm