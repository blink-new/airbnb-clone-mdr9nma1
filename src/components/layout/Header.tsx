import { Link } from 'react-router-dom'
import { Menu, User, Globe } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import SearchForm from '../SearchForm'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-primary">airbnb</div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center max-w-md mx-8 flex-1">
            <SearchForm compact className="w-full" />
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex text-sm font-medium">
              Airbnb your home
            </Button>
            
            <Button variant="ghost" size="sm">
              <Globe className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full border-gray-300 px-3 py-2">
                  <Menu className="h-4 w-4 mr-2" />
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Sign up</DropdownMenuItem>
                <DropdownMenuItem>Log in</DropdownMenuItem>
                <DropdownMenuItem className="border-t">Airbnb your home</DropdownMenuItem>
                <DropdownMenuItem>Host an experience</DropdownMenuItem>
                <DropdownMenuItem>Help Center</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}