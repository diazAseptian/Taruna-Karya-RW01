
import { ArrowRight, Users } from 'lucide-react'

const Hero = () => {
  return (
    <section
  id="beranda"
  className="min-h-screen flex items-center relative pt-16"
  style={{
    backgroundImage: "url('/img/bg.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>

      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            <span className="text-green-400">Taruna Karya</span>
            <br />
            <span className="text-blue-400">Kampung Ciperang</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto">
            Bersama Berkarya untuk Ciperang yang Lebih Baik
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#kegiatan"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Users className="mr-2" size={20} />
              Lihat Kegiatan
              <ArrowRight className="ml-2" size={20} />
            </a>
            
            <a
              href="#kontak"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Komunitas Solid</h3>
            <p className="text-gray-600">Membangun kebersamaan yang kuat untuk kemajuan kampung</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Kegiatan Positif</h3>
            <p className="text-gray-600">Berbagai program untuk meningkatkan kualitas hidup warga</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Dampak Nyata</h3>
            <p className="text-gray-600">Perubahan positif yang dapat dirasakan semua warga</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero