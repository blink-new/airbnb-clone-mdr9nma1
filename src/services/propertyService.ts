export interface Property {
  id: string
  title: string
  description: string
  location: string
  city: string
  country: string
  pricePerNight: number
  maxGuests: number
  bedrooms: number
  bathrooms: number
  propertyType: string
  category: string
  amenities: string[]
  images: string[]
  latitude: number
  longitude: number
  rating: number
  reviewCount: number
  hostId: string
}

export interface SearchFilters {
  location?: string
  checkIn?: Date | null
  checkOut?: Date | null
  guests?: number
  minPrice?: number
  maxPrice?: number
  propertyType?: string
  category?: string
}

// Sample properties data
const properties: Property[] = [
  {
    id: 'prop_1',
    title: 'Stunning Beachfront Villa',
    description: 'Wake up to ocean views in this luxurious beachfront villa with private beach access.',
    location: 'Malibu, California, USA',
    city: 'Malibu',
    country: 'USA',
    pricePerNight: 450,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'Villa',
    category: 'beachfront',
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Parking', 'Kitchen', 'Air Conditioning'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop'],
    latitude: 34.0259,
    longitude: -118.7798,
    rating: 4.9,
    reviewCount: 127,
    hostId: 'host_1'
  },
  {
    id: 'prop_2',
    title: 'Cozy Mountain Cabin',
    description: 'Escape to the mountains in this charming cabin with fireplace and mountain views.',
    location: 'Aspen, Colorado, USA',
    city: 'Aspen',
    country: 'USA',
    pricePerNight: 280,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'Cabin',
    category: 'cabins',
    amenities: ['WiFi', 'Fireplace', 'Mountain View', 'Parking', 'Kitchen', 'Heating'],
    images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop'],
    latitude: 39.1911,
    longitude: -106.8175,
    rating: 4.8,
    reviewCount: 89,
    hostId: 'host_2'
  },
  {
    id: 'prop_3',
    title: 'Modern Downtown Loft',
    description: 'Stylish loft in the heart of the city with skyline views and modern amenities.',
    location: 'New York, NY, USA',
    city: 'New York',
    country: 'USA',
    pricePerNight: 320,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'Loft',
    category: 'city',
    amenities: ['WiFi', 'City View', 'Elevator', 'Kitchen', 'Air Conditioning', 'Gym'],
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'],
    latitude: 40.7128,
    longitude: -74.0060,
    rating: 4.7,
    reviewCount: 203,
    hostId: 'host_3'
  },
  {
    id: 'prop_4',
    title: 'Luxury Penthouse Suite',
    description: 'Ultimate luxury with panoramic ocean views, private terrace, and premium amenities.',
    location: 'Miami Beach, Florida, USA',
    city: 'Miami Beach',
    country: 'USA',
    pricePerNight: 650,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    propertyType: 'Penthouse',
    category: 'luxury',
    amenities: ['WiFi', 'Ocean View', 'Private Terrace', 'Pool', 'Concierge', 'Spa', 'Kitchen'],
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'],
    latitude: 25.7907,
    longitude: -80.1300,
    rating: 4.9,
    reviewCount: 156,
    hostId: 'host_4'
  },
  {
    id: 'prop_5',
    title: 'Charming Countryside Cottage',
    description: 'Peaceful retreat surrounded by vineyards with rustic charm and modern comfort.',
    location: 'Napa Valley, California, USA',
    city: 'Napa Valley',
    country: 'USA',
    pricePerNight: 195,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: 'Cottage',
    category: 'countryside',
    amenities: ['WiFi', 'Garden', 'Wine Tasting', 'Parking', 'Kitchen', 'Fireplace'],
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'],
    latitude: 38.2975,
    longitude: -122.2869,
    rating: 4.6,
    reviewCount: 74,
    hostId: 'host_5'
  },
  {
    id: 'prop_6',
    title: 'Unique Treehouse Experience',
    description: 'Sleep among the trees in this magical treehouse with all modern amenities.',
    location: 'Portland, Oregon, USA',
    city: 'Portland',
    country: 'USA',
    pricePerNight: 175,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: 'Treehouse',
    category: 'unique',
    amenities: ['WiFi', 'Forest View', 'Unique Design', 'Kitchen', 'Heating'],
    images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'],
    latitude: 45.5152,
    longitude: -122.6784,
    rating: 4.8,
    reviewCount: 92,
    hostId: 'host_6'
  },
  {
    id: 'prop_7',
    title: 'Villa with Infinity Pool',
    description: 'Desert oasis with stunning infinity pool and mountain views.',
    location: 'Scottsdale, Arizona, USA',
    city: 'Scottsdale',
    country: 'USA',
    pricePerNight: 380,
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4,
    propertyType: 'Villa',
    category: 'pools',
    amenities: ['WiFi', 'Infinity Pool', 'Mountain View', 'BBQ', 'Kitchen', 'Air Conditioning'],
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'],
    latitude: 33.4942,
    longitude: -111.9261,
    rating: 4.9,
    reviewCount: 118,
    hostId: 'host_7'
  },
  {
    id: 'prop_8',
    title: 'Trendy Urban Apartment',
    description: 'Hip apartment in the coolest neighborhood with local cafes and music venues nearby.',
    location: 'Austin, Texas, USA',
    city: 'Austin',
    country: 'USA',
    pricePerNight: 220,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'Apartment',
    category: 'trending',
    amenities: ['WiFi', 'Local Area', 'Kitchen', 'Air Conditioning', 'Parking'],
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'],
    latitude: 30.2672,
    longitude: -97.7431,
    rating: 4.7,
    reviewCount: 145,
    hostId: 'host_8'
  },
  {
    id: 'prop_9',
    title: 'Parisian Studio Apartment',
    description: 'Charming studio in the heart of Paris with classic French architecture.',
    location: 'Paris, Île-de-France, France',
    city: 'Paris',
    country: 'France',
    pricePerNight: 180,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: 'Studio',
    category: 'city',
    amenities: ['WiFi', 'City Center', 'Historic Building', 'Kitchen', 'Heating'],
    images: ['https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop'],
    latitude: 48.8566,
    longitude: 2.3522,
    rating: 4.5,
    reviewCount: 89,
    hostId: 'host_9'
  },
  {
    id: 'prop_10',
    title: 'London Victorian House',
    description: 'Beautiful Victorian house in trendy Notting Hill with garden.',
    location: 'London, England, UK',
    city: 'London',
    country: 'UK',
    pricePerNight: 350,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'House',
    category: 'city',
    amenities: ['WiFi', 'Garden', 'Historic', 'Kitchen', 'Heating', 'Parking'],
    images: ['https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop'],
    latitude: 51.5074,
    longitude: -0.1278,
    rating: 4.8,
    reviewCount: 156,
    hostId: 'host_10'
  }
]

export class PropertyService {
  static async searchProperties(filters: SearchFilters): Promise<Property[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let filteredProperties = [...properties]

    // Filter by location (city or country)
    if (filters.location) {
      const searchTerm = filters.location.toLowerCase()
      filteredProperties = filteredProperties.filter(property => 
        property.city.toLowerCase().includes(searchTerm) ||
        property.country.toLowerCase().includes(searchTerm) ||
        property.location.toLowerCase().includes(searchTerm)
      )
    }

    // Filter by guest capacity
    if (filters.guests) {
      filteredProperties = filteredProperties.filter(property => 
        property.maxGuests >= filters.guests!
      )
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      filteredProperties = filteredProperties.filter(property => 
        property.pricePerNight >= filters.minPrice!
      )
    }

    if (filters.maxPrice !== undefined) {
      filteredProperties = filteredProperties.filter(property => 
        property.pricePerNight <= filters.maxPrice!
      )
    }

    // Filter by property type
    if (filters.propertyType) {
      filteredProperties = filteredProperties.filter(property => 
        property.propertyType.toLowerCase() === filters.propertyType!.toLowerCase()
      )
    }

    // Filter by category
    if (filters.category) {
      filteredProperties = filteredProperties.filter(property => 
        property.category === filters.category
      )
    }

    // TODO: Add date availability filtering when we have booking data
    // For now, we'll assume all properties are available

    return filteredProperties
  }

  static async getPropertyById(id: string): Promise<Property | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return properties.find(property => property.id === id) || null
  }

  static async getAllProperties(): Promise<Property[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...properties]
  }

  static getCategories(): string[] {
    return [...new Set(properties.map(p => p.category))]
  }

  static getCities(): string[] {
    return [...new Set(properties.map(p => p.city))]
  }
}