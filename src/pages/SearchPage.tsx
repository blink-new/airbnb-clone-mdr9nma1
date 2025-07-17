import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link, useSearchParams } from 'react-router-dom'
import { Heart, Star, Filter } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Slider } from '../components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import SearchForm from '../components/SearchForm'
import { PropertyService, Property, SearchFilters } from '../services/propertyService'
import { format } from 'date-fns'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const [showMap, setShowMap] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [propertyType, setPropertyType] = useState<string>('')
  const [sortBy, setSortBy] = useState('recommended')

  // Get search parameters from URL
  const location = searchParams.get('location') || ''
  const checkInStr = searchParams.get('checkIn')
  const checkOutStr = searchParams.get('checkOut')
  const guests = parseInt(searchParams.get('guests') || '1')
  
  const checkIn = checkInStr ? new Date(checkInStr) : null
  const checkOut = checkOutStr ? new Date(checkOutStr) : null

  useEffect(() => {
    const searchProperties = async () => {
      setLoading(true)
      try {
        const filters: SearchFilters = {
          location,
          checkIn,
          checkOut,
          guests,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          propertyType: propertyType || undefined
        }

        const results = await PropertyService.searchProperties(filters)
        
        // Sort results
        let sortedResults = [...results]
        switch (sortBy) {
          case 'price_low':
            sortedResults.sort((a, b) => a.pricePerNight - b.pricePerNight)
            break
          case 'price_high':
            sortedResults.sort((a, b) => b.pricePerNight - a.pricePerNight)
            break
          case 'rating':
            sortedResults.sort((a, b) => b.rating - a.rating)
            break
          default:
            // Keep recommended order (default from service)
            break
        }
        
        setProperties(sortedResults)
      } catch (error) {
        console.error('Failed to search properties:', error)
      } finally {
        setLoading(false)
      }
    }

    searchProperties()
  }, [location, checkIn, checkOut, guests, priceRange, propertyType, sortBy])

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  const formatDateRange = () => {
    if (checkIn && checkOut) {
      return `${format(checkIn, 'MMM d')} - ${format(checkOut, 'MMM d')}`
    }
    return 'Any dates'
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Search Bar */}
      <div className="border-b bg-white p-4">
        <div className="max-w-7xl mx-auto">
          <SearchForm 
            compact 
            className="max-w-4xl mx-auto"
          />
        </div>
      </div>

      <div className="flex flex-1">
        {/* Properties List */}
        <div className={`${showMap ? 'w-1/2' : 'w-full'} overflow-y-auto bg-white`}>
          <div className="p-6">
            {/* Header with filters */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold">
                  {loading ? 'Searching...' : `${properties.length} stays`}
                  {location && <span className="text-gray-600"> in {location}</span>}
                </h1>
                {(checkIn || checkOut || guests > 1) && (
                  <p className="text-gray-600 mt-1">
                    {formatDateRange()} • {guests} guest{guests > 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {/* Sort dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                {/* Filters */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Filter className="h-4 w-4" />
                      <span>Filters</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-3">Price range</h3>
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={1000}
                          min={0}
                          step={10}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}+</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3">Property type</h3>
                        <Select value={propertyType} onValueChange={setPropertyType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any type</SelectItem>
                            <SelectItem value="House">House</SelectItem>
                            <SelectItem value="Apartment">Apartment</SelectItem>
                            <SelectItem value="Villa">Villa</SelectItem>
                            <SelectItem value="Cabin">Cabin</SelectItem>
                            <SelectItem value="Loft">Loft</SelectItem>
                            <SelectItem value="Studio">Studio</SelectItem>
                            <SelectItem value="Cottage">Cottage</SelectItem>
                            <SelectItem value="Penthouse">Penthouse</SelectItem>
                            <SelectItem value="Treehouse">Treehouse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  variant="outline"
                  onClick={() => setShowMap(!showMap)}
                  className="flex items-center space-x-2"
                >
                  <span>{showMap ? 'Hide map' : 'Show map'}</span>
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-lg text-gray-600">Searching properties...</div>
              </div>
            ) : properties.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="text-lg text-gray-900 mb-2">No properties found</div>
                <div className="text-gray-600">Try adjusting your search criteria</div>
              </div>
            ) : (
              <div className="space-y-6">
                {properties.map((property) => (
                  <Card 
                    key={property.id} 
                    className={`group cursor-pointer transition-all hover:shadow-lg ${
                      selectedProperty === property.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onMouseEnter={() => setSelectedProperty(property.id)}
                    onMouseLeave={() => setSelectedProperty(null)}
                  >
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="relative w-80 h-64 flex-shrink-0">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover rounded-l-lg"
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
                        
                        <div className="flex-1 p-6">
                          <Link to={`/property/${property.id}`}>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">
                                {property.title}
                              </h3>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-current text-gray-900" />
                                <span className="text-sm font-medium">{property.rating}</span>
                                <span className="text-sm text-gray-600">({property.reviewCount})</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{property.location}</p>
                            
                            <div className="flex items-baseline space-x-1">
                              <span className="text-xl font-semibold text-gray-900">${property.pricePerNight}</span>
                              <span className="text-gray-600">night</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        {showMap && (
          <div className="w-1/2 relative">
            <MapContainer
              center={[39.8283, -98.5795]} // Center of USA
              zoom={4}
              style={{ height: '100%', width: '100%' }}
              className="z-10"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {properties.map((property) => (
                <Marker
                  key={property.id}
                  position={[property.latitude, property.longitude]}
                  eventHandlers={{
                    mouseover: () => setSelectedProperty(property.id),
                    mouseout: () => setSelectedProperty(null),
                  }}
                >
                  <Popup>
                    <div className="w-64">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <h4 className="font-semibold text-sm mb-1">{property.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{property.location}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs font-medium">{property.rating}</span>
                        </div>
                        <div className="text-sm font-semibold">${property.pricePerNight}/night</div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  )
}