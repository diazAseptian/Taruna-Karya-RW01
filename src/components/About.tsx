import { useState } from 'react'
import { useMembers } from '../hooks/useSupabase'
import { X, Users, Target, Eye } from 'lucide-react'

const About = () => {
  const [showMembersModal, setShowMembersModal] = useState(false)
  const { members, loading } = useMembers()

  const coreMembers = [
    {
      name: 'Tata',
      position: 'Ketua',
      image: '/img/ketua.jpg'
    },
    {
      name: 'Aji Jakaria',
      position: 'Wakil Ketua',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Diaz Ahmad Septian',
      position: 'Sekretaris',
      image: '/img/sekretaris.jpg' 
    },
    {
      name: 'Tirta Diansyah Septian',
      position: 'Bendahara',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    }
  ]

  return (
    <section id="tentang" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tentang Kami</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center justify-center mb-8">
              <img
                src="/img/Logo.png"
                alt="Logo Taruna Karya"
                className="w-32 h-32 rounded-full shadow-lg"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Sejarah Singkat</h3>
            <p className="text-gray-600 leading-relaxed">
              Taruna Karya Kampung Ciperang didirikan pada tahun 2020 dengan semangat gotong royong 
              untuk memajukan kampung. Berawal dari sekelompok pemuda yang peduli terhadap 
              lingkungan sekitar, organisasi ini terus berkembang menjadi wadah 
              yang menaungi berbagai kegiatan positif untuk kemajuan masyarakat Ciperang.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="text-green-600" size={24} />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Visi</h4>
                <p className="text-gray-600">
                  Menjadi organisasi pemuda terdepan dalam membangun kampung Ciperang 
                  yang maju, sejahtera, dan berkarakter.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="text-blue-600" size={24} />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Misi</h4>
                <ul className="text-gray-600 space-y-2">
                  <li>• Mengadakan kegiatan pemberdayaan masyarakat</li>
                  <li>• Meningkatkan kualitas lingkungan hidup</li>
                  <li>• Membangun solidaritas antar warga</li>
                  <li>• Melestarikan nilai-nilai budaya lokal</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Struktur Kepengurusan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {coreMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-green-600 font-medium">{member.position}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowMembersModal(true)}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Users className="mr-2" size={20} />
              Lihat Semua Anggota
            </button>
          </div>
        </div>
      </div>

      {/* Members Modal */}
      {showMembersModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowMembersModal(false)}></div>
            
            <div className="relative inline-block w-full max-w-4xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Daftar Anggota</h3>
                <button
                  onClick={() => setShowMembersModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Memuat data...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((member) => (
                    <div key={member.id} className="bg-gray-50 p-4 rounded-lg">
                      {member.foto && (
                        <img
                          src={member.foto}
                          alt={member.nama}
                          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                        />
                      )}
                      <h4 className="font-semibold text-gray-900 text-center">{member.nama}</h4>
                      <p className="text-green-600 text-center text-sm">{member.jabatan}</p>
                      {member.kontak && (
                        <p className="text-gray-500 text-center text-sm mt-1">{member.kontak}</p>
                      )}
                    </div>
                  ))}
                  {members.length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-600">Belum ada data anggota</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default About