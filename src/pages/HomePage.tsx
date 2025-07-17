import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import SearchForm from '../components/SearchForm'
import { PropertyService, Property } from '../services/propertyService'

const categories = [
  { id: 'beachfront', name: 'Beachfront', icon: '🏖️' },
  { id: 'cabins', name: 'Cabins', icon: '🏕️' },
  { id: 'trending', name: 'Trending', icon: '🔥' },
  { id: 'city', name: 'City', icon: '🏙️' },
  { id: 'countryside', name: 'Countryside', icon: '🌾' },
  { id: 'luxury', name: 'Luxury', icon: '💎' },
  { id: 'unique', name: 'Unique stays', icon: '🏰' },
  { id: 'pools', name: 'Amazing pools', icon: '🏊' },
]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favorites, setFavorites] = useState<string[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const allProperties = await PropertyService.getAllProperties()
        setProperties(allProperties)
      } catch (error) {
        console.error('Failed to load properties:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  const filteredProperties = selectedCategory === 'all' 
    ? properties 
    : properties.filter(property => property.category === selectedCategory)

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading properties...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero Search Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find your next stay</h1>
          <p className="text-lg text-gray-600">Search low prices on hotels, homes and much more...</p>
        </div>
        <SearchForm className="max-w-4xl mx-auto" />
      </div>

      {/* Categories */}
      <div className="flex items-center space-x-8 overflow-x-auto pb-4 mb-8 border-b">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'ghost'}
          onClick={() => setSelectedCategory('all')}
          className="flex-shrink-0 text-sm"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'ghost'}
            onClick={() => setSelectedCategory(category.id)}
            className="flex-shrink-0 flex items-center space-x-2 text-sm"
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="group cursor-pointer border-0 shadow-none hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 right-3 rounded-full bg-white/80 hover:bg-white p-2"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFavorite(property.id)
                  }}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      favorites.includes(property.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-600'
                    }`} 
                  />
                </Button>
              </div>
              
              <Link to={`/property/${property.id}`} className="block pt-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{property.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current text-gray-900" />
                    <span className="text-sm font-medium">{property.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-1">{property.location}</p>
                <p className="text-gray-600 text-sm mb-2">{property.reviewCount} reviews</p>
                
                <div className="flex items-baseline space-x-1">
                  <span className="font-semibold text-gray-900">${property.pricePerNight}</span>
                  <span className="text-gray-600 text-sm">night</span>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Map Button */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <Link to="/search">
          <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg">
            Show map
          </Button>
        </Link>
      </div>
    </div>
  )
}