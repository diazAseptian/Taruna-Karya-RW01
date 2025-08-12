import React, { useState } from 'react'
import { useGallery } from '../hooks/useSupabase'
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'

const Gallery = () => {
  const { gallery, loading } = useGallery()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const defaultImages = [
    {
      url: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      caption: 'Kegiatan Kerja Bakti Bersama'
    },
    {
      url: 'https://images.pexels.com/photos/8088495/pexels-photo-8088495.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      caption: 'Pengajian Rutin Mingguan'
    },
    {
      url: 'https://images.pexels.com/photos/8815238/pexels-photo-8815238.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      caption: 'Perayaan 17 Agustus'
    },
    {
      url: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      caption: 'Rapat Koordinasi'
    },
    {
      url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      caption: 'Kegiatan Sosial'
    },
    {
      url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      caption: 'Pelatihan Keterampilan'
    }
  ]

  const images = gallery.length > 0 
    ? gallery.map(item => ({ url: item.url_foto, caption: item.keterangan || '' }))
    : defaultImages

  const openLightbox = (index: number) => {
    setCurrentImage(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => prev === 0 ? images.length - 1 : prev - 1)
  }

  if (loading) {
    return (
      <section id="galeri" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat galeri...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="galeri" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Galeri</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-4"></div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Dokumentasi kegiatan dan momen berharga bersama Taruna Karya
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">Belum ada foto yang diupload</p>
          </div>
        ) : (
          <>
            {/* Mobile Slider (2 rows, 3 photos each) */}
            <div className="block sm:hidden">
              <div className="space-y-4">
                {/* First Row */}
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {images.slice(0, 6).map((image, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-28 cursor-pointer"
                      onClick={() => openLightbox(index)}
                    >
                      <div className="relative h-20 overflow-hidden rounded-lg shadow-md">
                        <img
                          src={image.url}
                          alt={image.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {image.caption && (
                        <p className="text-xs text-gray-600 mt-1 truncate">{image.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
                {/* Second Row */}
                {images.length > 6 && (
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {images.slice(6, 12).map((image, index) => (
                      <div
                        key={index + 6}
                        className="flex-shrink-0 w-28 cursor-pointer"
                        onClick={() => openLightbox(index + 6)}
                      >
                        <div className="relative h-20 overflow-hidden rounded-lg shadow-md">
                          <img
                            src={image.url}
                            alt={image.caption}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {image.caption && (
                          <p className="text-xs text-gray-600 mt-1 truncate">{image.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ImageIcon className="text-white" size={32} />
                      </div>
                    </div>
                  </div>
                  {image.caption && (
                    <div className="p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-gray-600">{image.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X size={24} />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <ChevronRight size={24} />
            </button>
            
            <img
              src={images[currentImage].url}
              alt={images[currentImage].caption}
              className="w-full h-full object-contain"
            />
            
            {images[currentImage].caption && (
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center px-4">
                <p className="text-sm sm:text-lg font-medium">{images[currentImage].caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery