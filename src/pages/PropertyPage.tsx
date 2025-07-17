import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Heart, Share, Star, Wifi, Car, Tv, Coffee, Users, Calendar } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Separator } from '../components/ui/separator'
import { Calendar as CalendarComponent } from '../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'

const sampleProperty = {
  id: '1',
  title: 'Stunning Beachfront Villa',
  location: 'Malibu, California',
  price: 450,
  rating: 4.9,
  reviews: 127,
  images: [
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'
  ],
  host: {
    name: 'Sarah',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9e0e4d4?w=100&h=100&fit=crop&crop=face',
    superhost: true,
    joinedYear: 2018
  },
  details: {
    guests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 3
  },
  amenities: [
    { icon: Wifi, name: 'Wifi' },
    { icon: Car, name: 'Free parking' },
    { icon: Tv, name: 'TV' },
    { icon: Coffee, name: 'Kitchen' },
  ],
  description: 'Escape to this stunning beachfront villa in Malibu, where luxury meets the Pacific Ocean. This spacious 4-bedroom home offers breathtaking ocean views, a private beach access, and all the amenities you need for an unforgettable getaway.',
  reviews: [
    {
      id: 1,
      user: 'Michael',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      rating: 5,
      date: 'December 2023',
      comment: 'Absolutely incredible place! The views are breathtaking and Sarah was an amazing host.'
    },
    {
      id: 2,
      user: 'Emma',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      rating: 5,
      date: 'November 2023',
      comment: 'Perfect location right on the beach. The house is exactly as described and very clean.'
    }
  ]
}

export default function PropertyPage() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState(1)

  const property = sampleProperty // In real app, fetch by id

  const totalNights = checkIn && checkOut ? 
    Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0
  const totalPrice = totalNights * property.price

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link to="/search">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">{property.title}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-4 gap-2 mb-8 h-96">
        <div className="col-span-2 row-span-2">
          <img
            src={property.images[selectedImage]}
            alt={property.title}
            className="w-full h-full object-cover rounded-l-xl cursor-pointer"
            onClick={() => setSelectedImage(0)}
          />
        </div>
        {property.images.slice(1, 5).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${property.title} ${index + 2}`}
            className={`w-full h-full object-cover cursor-pointer hover:opacity-90 ${
              index === 1 ? 'rounded-tr-xl' : ''
            } ${index === 3 ? 'rounded-br-xl' : ''}`}
            onClick={() => setSelectedImage(index + 1)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Property Info */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Entire villa hosted by {property.host.name}
                </h2>
                <p className="text-gray-600">
                  {property.details.guests} guests · {property.details.bedrooms} bedrooms · {property.details.beds} beds · {property.details.bathrooms} bathrooms
                </p>
              </div>
              <img
                src={property.host.avatar}
                alt={property.host.name}
                className="w-12 h-12 rounded-full"
              />
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-medium">{property.rating}</span>
              </div>
              <span className="text-gray-600">·</span>
              <span className="text-gray-600">{property.reviews.length} reviews</span>
              <span className="text-gray-600">·</span>
              <span className="text-gray-600">{property.location}</span>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Amenities */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">What this place offers</h3>
            <div className="grid grid-cols-2 gap-4">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <amenity.icon className="h-5 w-5 text-gray-600" />
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">About this place</h3>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </div>

          <Separator className="my-8" />

          {/* Reviews */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Star className="h-5 w-5 fill-current" />
              <span className="text-lg font-semibold">{property.rating} · {property.reviews.length} reviews</span>
            </div>
            
            <div className="space-y-6">
              {property.reviews.map((review) => (
                <div key={review.id} className="flex space-x-4">
                  <img
                    src={review.avatar}
                    alt={review.user}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">{review.user}</span>
                      <span className="text-gray-600 text-sm">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6 shadow-xl border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-2xl font-semibold">${property.price}</span>
                <span className="text-gray-600">night</span>
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {checkIn ? checkIn.toLocaleDateString() : 'Check in'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {checkOut ? checkOut.toLocaleDateString() : 'Check out'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guest Selection */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal mb-6">
                    <Users className="mr-2 h-4 w-4" />
                    {guests} guest{guests !== 1 ? 's' : ''}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex items-center justify-between">
                    <span>Guests</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{guests}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGuests(Math.min(property.details.guests, guests + 1))}
                        disabled={guests >= property.details.guests}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button className="w-full mb-4 bg-primary hover:bg-primary/90">
                Reserve
              </Button>

              <p className="text-center text-sm text-gray-600 mb-4">
                You won't be charged yet
              </p>

              {totalNights > 0 && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>${property.price} x {totalNights} nights</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>$75</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$67</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${totalPrice + 75 + 67}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}