import React, { useState, useEffect } from 'react'
import { useArticles } from '../hooks/useSupabase'
import { ChevronLeft, ChevronRight, Calendar, FileText, X } from 'lucide-react'

const Articles = () => {
  const { articles, loading } = useArticles()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const itemsPerSlide = 3

  useEffect(() => {
    if (articles.length > itemsPerSlide) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(articles.length / itemsPerSlide))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [articles.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(articles.length / itemsPerSlide))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => prev === 0 ? Math.ceil(articles.length / itemsPerSlide) - 1 : prev - 1)
  }

  const handleReadMore = (article: any) => {
    setSelectedArticle(article)
  }

  const handleCloseModal = () => {
    setSelectedArticle(null)
  }

  if (loading) {
    return (
      <section id="artikel" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat artikel...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="artikel" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Artikel & Berita</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-4"></div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Informasi terkini dan artikel menarik seputar kegiatan organisasi
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">Belum ada artikel yang dipublikasikan</p>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(articles.length / itemsPerSlide) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                      {articles
                        .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                        .map((article) => (
                          <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            {article.gambar && (
                              <div className="h-40 sm:h-48 overflow-hidden">
                                <img
                                  src={article.gambar}
                                  alt={article.judul}
                                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                            )}
                            
                            <div className="p-4 sm:p-6">
                              <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3">
                                <Calendar size={14} className="mr-2" />
                                <span>{new Date(article.tanggal).toLocaleDateString('id-ID')}</span>
                              </div>
                              
                              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                {article.judul}
                              </h3>
                              
                              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                {article.isi}
                              </p>
                              
                              <button 
                                onClick={() => handleReadMore(article)}
                                className="text-sm sm:text-base text-green-600 font-semibold hover:text-green-700 transition-colors duration-200"
                              >
                                Baca Selengkapnya →
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {articles.length > itemsPerSlide && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 sm:-left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
                >
                  <ChevronLeft className="text-green-600" size={20} />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-0 sm:-right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
                >
                  <ChevronRight className="text-green-600" size={20} />
                </button>

                <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
                  {Array.from({ length: Math.ceil(articles.length / itemsPerSlide) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                        index === currentSlide ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Detail Artikel</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              
              {selectedArticle.gambar && (
                <img
                  src={selectedArticle.gambar}
                  alt={selectedArticle.judul}
                  className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4 sm:mb-6"
                />
              )}
              
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {selectedArticle.judul}
              </h1>
              
              <div className="flex items-center text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                <Calendar size={14} className="mr-2" />
                <span>
                  {new Date(selectedArticle.tanggal).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedArticle.isi}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Articles