
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/img/Logo.png"
                alt="Logo Taruna Karya"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-bold">Taruna Karya</h3>
                <p className="text-gray-300">Kampung Ciperang</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Bersama membangun kampung Ciperang yang lebih baik melalui kegiatan 
              positif dan semangat gotong royong yang kuat.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2">
              <li>
                <a href="#beranda" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#tentang" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#kegiatan" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Kegiatan
                </a>
              </li>
              <li>
                <a href="#artikel" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Artikel
                </a>
              </li>
              <li>
                <a href="#galeri" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Galeri
                </a>
              </li>
              <li>
                <a href="#kontak" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="text-green-500 flex-shrink-0 mt-1" size={16} />
                <span className="text-gray-300 text-sm">
                  Kampung Ciperang, Sukarame, Leles, Garut, Jawa Barat
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-green-500" size={16} />
                <span className="text-gray-300 text-sm">+62 821-1761-7962</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-green-500" size={16} />
                <span className="text-gray-300 text-sm">tarunakarya.ciperang@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Instagram className="text-green-500" size={16} />
                <span className="text-gray-300 text-sm">@tarunakarya_ciperang</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; 2025 Taruna Karya Kampung Ciperang. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="bg-green-600 hover:bg-green-700 p-2 rounded-full transition-colors duration-200"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer