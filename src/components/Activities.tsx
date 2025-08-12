
import { Users, BookOpen, Star, Calendar } from 'lucide-react'

const Activities = () => {
  const activities = [
    {
      title: 'Kerja Bakti',
      description: 'Kegiatan gotong royong membersihkan lingkungan kampung Ciperang yang dilaksanakan setiap minggu',
      icon: Users,
      image: '/img/kerja bakti.jpeg',
      schedule: 'Setiap Minggu',
      color: 'green'
    },
    {
      title: 'Pengajian',
      description: 'Kegiatan spiritual rutin untuk meningkatkan kualitas iman dan taqwa warga',
      icon: BookOpen,
      image: '/img/img-6.jpeg',
      schedule: 'Setiap Malam Jumat/Selasa',
      color: 'blue'
    },
    {
      title: 'Agustusan',
      description: 'Perayaan kemerdekaan Indonesia dengan berbagai lomba dan kegiatan menarik',
      icon: Star,
      image: '/img/agustusan.jpeg',
      schedule: 'Bulan Agustus',
      color: 'red'
    }
  ]

  return (
    <section id="kegiatan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Kegiatan Kami</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Berbagai kegiatan positif yang kami lakukan untuk membangun kampung yang lebih baik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon
            return (
              <div key={index} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  <div className={`absolute top-4 right-4 w-12 h-12 bg-${activity.color}-600 rounded-full flex items-center justify-center`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{activity.title}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-1" />
                      <span>{activity.schedule}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                  
                  {/* <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className={`text-${activity.color}-600 font-semibold hover:text-${activity.color}-700 transition-colors duration-200`}>
                      Pelajari Lebih Lanjut →
                    </button>
                  </div> */}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Activities