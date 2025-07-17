import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Calendar, Users, MapPin } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar as CalendarComponent } from './ui/calendar'
import { format } from 'date-fns'

interface SearchFormProps {
  onSearch?: (params: SearchParams) => void
  className?: string
  compact?: boolean
}

export interface SearchParams {
  location: string
  checkIn: Date | null
  checkOut: Date | null
  guests: number
}

export default function SearchForm({ onSearch, className = '', compact = false }: SearchFormProps) {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [guests, setGuests] = useState(1)
  const [showGuestPicker, setShowGuestPicker] = useState(false)

  const handleSearch = () => {
    const searchParams = {
      location,
      checkIn,
      checkOut,
      guests
    }

    if (onSearch) {
      onSearch(searchParams)
    } else {
      // Navigate to search page with parameters
      const params = new URLSearchParams()
      if (location) params.set('location', location)
      if (checkIn) params.set('checkIn', checkIn.toISOString())
      if (checkOut) params.set('checkOut', checkOut.toISOString())
      params.set('guests', guests.toString())
      
      navigate(`/search?${params.toString()}`)
    }
  }

  const incrementGuests = () => setGuests(prev => Math.min(prev + 1, 16))
  const decrementGuests = () => setGuests(prev => Math.max(prev - 1, 1))

  if (compact) {
    return (
      <div className={`flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow bg-white ${className}`}>
        <div className="flex-1 px-6 py-3">
          <Input
            type="text"
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-none bg-transparent p-0 text-sm font-medium placeholder:text-gray-500 focus-visible:ring-0"
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <div className="border-l border-gray-300 px-6 py-3 cursor-pointer hover:bg-gray-50 flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {checkIn && checkOut 
                  ? `${format(checkIn, 'MMM d')} - ${format(checkOut, 'MMM d')}`
                  : 'Any week'
                }
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="range"
              selected={{ from: checkIn || undefined, to: checkOut || undefined }}
              onSelect={(range) => {
                if (range?.from) setCheckIn(range.from)
                if (range?.to) setCheckOut(range.to)
              }}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover open={showGuestPicker} onOpenChange={setShowGuestPicker}>
          <PopoverTrigger asChild>
            <div className="border-l border-gray-300 px-6 py-3 cursor-pointer hover:bg-gray-50 flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {guests === 1 ? '1 guest' : `${guests} guests`}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Guests</div>
                  <div className="text-sm text-gray-500">Ages 13 or above</div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decrementGuests}
                    disabled={guests <= 1}
                    className="h-8 w-8 rounded-full p-0"
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{guests}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={incrementGuests}
                    disabled={guests >= 16}
                    className="h-8 w-8 rounded-full p-0"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button 
          onClick={handleSearch}
          size="sm" 
          className="rounded-full m-2 bg-primary hover:bg-primary/90"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Where</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Check in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, 'MMM d, yyyy') : 'Add dates'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkIn || undefined}
                onSelect={(date) => setCheckIn(date || null)}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Check out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, 'MMM d, yyyy') : 'Add dates'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkOut || undefined}
                onSelect={(date) => setCheckOut(date || null)}
                disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Who</label>
          <Popover open={showGuestPicker} onOpenChange={setShowGuestPicker}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Users className="mr-2 h-4 w-4" />
                {guests === 1 ? '1 guest' : `${guests} guests`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Guests</div>
                    <div className="text-sm text-gray-500">Ages 13 or above</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={decrementGuests}
                      disabled={guests <= 1}
                      className="h-8 w-8 rounded-full p-0"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{guests}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={incrementGuests}
                      disabled={guests >= 16}
                      className="h-8 w-8 rounded-full p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button onClick={handleSearch} className="px-8 py-3 bg-primary hover:bg-primary/90">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  )
}