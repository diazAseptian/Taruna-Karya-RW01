import React, { useState } from 'react'
import { useArticles, useMembers, useGallery } from '../../hooks/useSupabase'
import { supabase } from '../../lib/supabase'
import { FileText, Users, Image as ImageIcon, Plus, Edit, Trash2, LogOut, Eye, X } from 'lucide-react'
import ArticleForm from './ArticleForm'
import MemberForm from './MemberForm'
import GalleryForm from './GalleryForm'

interface DashboardProps {
  onLogout?: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { articles, refetch: refetchArticles } = useArticles()
  const { members, refetch: refetchMembers } = useMembers()
  const { gallery, refetch: refetchGallery } = useGallery()
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'articles' | 'members' | 'gallery'>('dashboard')
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [viewingArticle, setViewingArticle] = useState<any>(null)
  const [viewingMember, setViewingMember] = useState<any>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{type: string, id: number} | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingItem(null)
  }

  const handleView = (article: any) => {
    setViewingArticle(article)
  }

  const handleViewMember = (member: any) => {
    setViewingMember(member)
  }

  const handleCloseView = () => {
    setViewingArticle(null)
    setViewingMember(null)
  }

  const handleDelete = async (type: string, id: number) => {
    try {
      let tableName = ''
      if (type === 'article') tableName = 'artikel'
      else if (type === 'member') tableName = 'anggota'
      else if (type === 'gallery') tableName = 'galeri'

      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)

      if (error) throw error

      // Refresh data
      if (type === 'article') refetchArticles()
      else if (type === 'member') refetchMembers()
      else refetchGallery()

      setDeleteConfirm(null)
    } catch (error: any) {
      console.error('Delete error:', error)
    }
  }

  const handleSave = () => {
    setShowForm(false)
    setEditingItem(null)
    if (activeTab === 'articles') refetchArticles()
    else if (activeTab === 'members') refetchMembers()
    else refetchGallery()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src="/img/Logo.png"
              alt="Logo Taruna Karya"
              className="w-12 h-12 rounded-xl"
            />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">Taruna Karya</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">📊</span>
              <span className="font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === 'articles'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <FileText size={20} />
              <span className="font-medium">Artikel</span>
            </button>

            <button
              onClick={() => setActiveTab('members')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === 'members'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Users size={20} />
              <span className="font-medium">Anggota</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ImageIcon size={20} />
              <span className="font-medium">Galeri</span>
            </button>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-3 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {activeTab === 'dashboard' ? '📊 Dashboard' : activeTab === 'articles' ? '📰 Artikel' : activeTab === 'members' ? '👥 Anggota' : '🖼️ Galeri'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  {activeTab === 'dashboard' ? 'Ringkasan dan statistik' : activeTab === 'articles' ? 'Kelola artikel dan berita' : activeTab === 'members' ? 'Kelola data anggota' : 'Kelola foto galeri'}
                </p>
              </div>
            </div>
            {activeTab !== 'dashboard' && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <Plus size={16} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Tambah </span>
                <span className="sm:hidden">+</span>
                <span className="hidden sm:inline">{activeTab === 'articles' ? 'Artikel' : activeTab === 'members' ? 'Anggota' : 'Foto'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-xs sm:text-sm font-medium">Total Artikel</p>
                    <p className="text-2xl sm:text-3xl font-bold mt-2">{articles.length}</p>
                    <p className="text-blue-100 text-xs mt-1">Artikel dipublikasikan</p>
                  </div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Total Anggota</p>
                    <p className="text-3xl font-bold mt-2">{members.length}</p>
                    <p className="text-green-100 text-xs mt-1">Anggota terdaftar</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Users size={28} />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Total Foto</p>
                    <p className="text-3xl font-bold mt-2">{gallery.length}</p>
                    <p className="text-purple-100 text-xs mt-1">Foto di galeri</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <ImageIcon size={28} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="p-4 sm:p-6">
            {activeTab === 'articles' && (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="bg-gray-50 rounded-xl p-4 sm:p-6 hover:bg-white hover:shadow-lg transition-all duration-200 border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div className="flex-1 mb-3 sm:mb-0">
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2">{article.judul}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{article.isi}</p>
                        <div className="flex items-center text-xs sm:text-sm text-gray-500">
                          <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full font-medium text-xs">
                            {new Date(article.tanggal).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-1 sm:space-x-2 sm:ml-4">
                        <button
                          onClick={() => handleView(article)}
                          className="p-1.5 sm:p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-200"
                          title="Lihat"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(article)}
                          className="p-1.5 sm:p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm({type: 'article', id: article.id})}
                          className="p-1.5 sm:p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {articles.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="text-gray-400" size={32} />
                    </div>
                    <p className="text-gray-500 text-lg">Belum ada artikel</p>
                    <p className="text-gray-400 text-sm mt-2">Klik tombol "Tambah Artikel" untuk memulai</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'members' && (
              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="bg-gray-50 rounded-xl p-4 sm:p-6 hover:bg-white hover:shadow-lg transition-all duration-200 border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 mb-3 sm:mb-0">
                        {member.foto ? (
                          <img
                            src={member.foto}
                            alt={member.nama}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="text-gray-400" size={20} />
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-gray-900 text-base sm:text-lg">{member.nama}</h3>
                          <p className="text-green-600 font-medium text-sm sm:text-base">{member.jabatan}</p>
                          {member.kontak && (
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">{member.kontak}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-1 sm:space-x-2 sm:ml-4">
                        <button
                          onClick={() => handleViewMember(member)}
                          className="p-1.5 sm:p-2 text-green-600 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-200"
                          title="Lihat"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(member)}
                          className="p-1.5 sm:p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm({type: 'member', id: member.id})}
                          className="p-1.5 sm:p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {members.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="text-gray-400" size={32} />
                    </div>
                    <p className="text-gray-500 text-lg">Belum ada anggota</p>
                    <p className="text-gray-400 text-sm mt-2">Klik tombol "Tambah Anggota" untuk memulai</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="relative group">
                    <img
                      src={item.url_foto}
                      alt={item.keterangan}
                      className="w-full h-24 sm:h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 sm:p-2 text-white hover:bg-blue-600 rounded-lg transition-all duration-200"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => setDeleteConfirm({type: 'gallery', id: item.id})}
                        className="p-1.5 sm:p-2 text-white hover:bg-red-600 rounded-lg transition-all duration-200"
                        title="Hapus"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                {gallery.length === 0 && (
                  <div className="col-span-full text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ImageIcon className="text-gray-400" size={32} />
                    </div>
                    <p className="text-gray-500 text-lg">Belum ada foto</p>
                    <p className="text-gray-400 text-sm mt-2">Klik tombol "Tambah Foto" untuk memulai</p>
                  </div>
                )}
              </div>
            )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Forms */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {activeTab === 'articles' && (
              <ArticleForm
                article={editingItem}
                onClose={handleCloseForm}
                onSave={handleSave}
              />
            )}
            {activeTab === 'members' && (
              <MemberForm
                member={editingItem}
                onClose={handleCloseForm}
                onSave={handleSave}
              />
            )}
            {activeTab === 'gallery' && (
              <GalleryForm
                galleryItem={editingItem}
                onClose={handleCloseForm}
                onSave={handleSave}
              />
            )}
          </div>
        </div>
      )}

      {/* Article View Modal */}
      {viewingArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Detail Artikel</h2>
                <button
                  onClick={handleCloseView}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Trash2 size={24} />
                </button>
              </div>
              
              {viewingArticle.gambar && (
                <img
                  src={viewingArticle.gambar}
                  alt={viewingArticle.judul}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {viewingArticle.judul}
              </h1>
              
              <p className="text-gray-600 mb-6">
                {new Date(viewingArticle.tanggal).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {viewingArticle.isi}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member View Modal */}
      {viewingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Detail Anggota</h2>
                <button
                  onClick={handleCloseView}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="text-center mb-6">
                {viewingMember.foto ? (
                  <img
                    src={viewingMember.foto}
                    alt={viewingMember.nama}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                    <Users className="text-gray-400" size={48} />
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Nama Lengkap</label>
                  <p className="text-xl font-bold text-gray-900">{viewingMember.nama}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Jabatan</label>
                  <p className="text-lg text-green-600 font-medium">{viewingMember.jabatan}</p>
                </div>
                
                {viewingMember.kontak && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Kontak</label>
                    <p className="text-lg text-gray-700">{viewingMember.kontak}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Bergabung Sejak</label>
                  <p className="text-lg text-gray-700">
                    {new Date(viewingMember.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Trash2 className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Konfirmasi Hapus</h3>
                  <p className="text-sm text-gray-500">Tindakan ini tidak dapat dibatalkan</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Apakah Anda yakin ingin menghapus {deleteConfirm.type === 'article' ? 'artikel' : deleteConfirm.type === 'member' ? 'anggota' : 'foto'} ini?
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm.type, deleteConfirm.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard