import { useState } from 'react'
import { assets } from "../assets/assets"
import { Link, useNavigate } from 'react-router-dom'
import { BoxIcon, GripIcon, ListIcon, MenuIcon, MessageCircleMoreIcon, XIcon } from "lucide-react"
import { useClerk, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

const Navbar = () => {
    const { openSignIn } = useClerk()
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <nav className='h-20'>
            <div className='fixed left-0 top-0 right-0 z-100 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all'>
                <img
                    src={assets.logo}
                    onClick={() => { navigate('/'); scrollTo(0, 0) }}
                    alt="Flipearn logo"
                    className='h-10 cursor-pointer'
                />

                {/* Desktop Menu */}
                <div className='hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800'>
                    <Link to="/"> Home </Link>
                    <Link to="/marketplace"> Marketplace </Link>

                    <SignedIn>
                        <Link to="/messages"> Messages </Link>
                        <Link to="/my-listings"> My Listings </Link>
                    </SignedIn>

                    <SignedOut>
                        <button onClick={() => openSignIn()} className='text-gray-800'>
                            Messages
                        </button>
                        <button onClick={() => openSignIn()} className='text-gray-800'>
                            My Listings
                        </button>
                    </SignedOut>
                </div>

                {/* Right side buttons */}
                <SignedIn>
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action
                                label="Marketplace"
                                labelIcon={<GripIcon size={16} />}
                                onClick={() => navigate('/marketplace')}
                            />
                            <UserButton.Action
                                label="Messages"
                                labelIcon={<MessageCircleMoreIcon size={16} />}
                                onClick={() => navigate('/messages')}
                            />
                            <UserButton.Action
                                label="My Listings"
                                labelIcon={<ListIcon size={16} />}
                                onClick={() => navigate('/my-listings')}
                            />
                            <UserButton.Action
                                label="My Orders"
                                labelIcon={<BoxIcon size={16} />}
                                onClick={() => navigate('/my-orders')}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                </SignedIn>

                <SignedOut>
                    <div>
                        <button
                            onClick={() => openSignIn()}
                            className='max-sm:hidden cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full'
                        >
                            Login
                        </button>
                        <MenuIcon onClick={() => setMenuOpen(true)} className='sm:hidden cursor-pointer' />
                    </div>
                </SignedOut>
            </div>

            {/* Mobile Menu */}
            <div className={`sm:hidden fixed inset-0 ${menuOpen ? 'w-full' : 'w-0'} overflow-hidden bg-white shadow-xl z-200 text-sm transition-all`}>
                <div className='flex flex-col items-center justify-center h-full text-xl font-semibold gap-6 p-4'>
                    <Link to="/" onClick={() => setMenuOpen(false)}> Home </Link>
                    <Link to="/marketplace" onClick={() => setMenuOpen(false)}> Marketplace </Link>

                    <SignedIn>
                        <Link to="/messages" onClick={() => setMenuOpen(false)}> Messages </Link>
                        <Link to="/my-listings" onClick={() => setMenuOpen(false)}> My Listings </Link>

                        <UserButton />
                    </SignedIn>

                    <SignedOut>
                        <button onClick={() => openSignIn()}>Messages</button>
                        <button onClick={() => openSignIn()}>My Listings</button>
                        <button
                            onClick={() => openSignIn()}
                            className='px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full'
                        >
                            Login
                        </button>
                    </SignedOut>

                    <XIcon
                        className="absolute size-8 right-6 top-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={() => setMenuOpen(false)}
                    />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
