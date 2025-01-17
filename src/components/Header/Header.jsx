import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the side menu
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  return (
        <header className='w-full flex flex-col bg-white shadow-md rounded-2xl'>
      <Container>
        <nav className='flex justify-between items-center py-4 px-6'>
          {/* Logo Section */}
          <div className='flex items-center'>
            <Link to='/'>
              <Logo width='55px' height="55px" className="rounded-full" />
            </Link>
          </div>

          {/* Hamburger Menu (Visible on small screens) */}
          <button
            className='block sm:hidden text-gray-700 focus:outline-none'
            onClick={() => setIsMenuOpen(true)}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </button>

          {/* Desktop Menu (Visible on larger screens) */}
          <ul className='hidden sm:flex space-x-8'>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='px-6 py-2 text-gray-700 font-medium rounded-lg transition-colors duration-300 hover:bg-blue-200 hover:text-blue-600 sm:text-sm'
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>

     
      <div
        className={`fixed inset-0 bg-gray-700 bg-opacity-50 z-50 transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={() => setIsMenuOpen(false)} // Close the menu when clicked outside
      >
        <div
          className={`fixed left-0 top-0 w-64 h-full bg-white shadow-xl transform transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className='flex justify-end p-4'>
            <button
              onClick={() => setIsMenuOpen(false)}
              className='text-gray-700 text-2xl'
            >
              &times;
            </button>
          </div>
          <ul className='flex flex-col items-center space-y-4 mt-12'>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsMenuOpen(false); // Close the menu after navigation
                      }}
                      className='w-full px-6 py-2 text-gray-700 font-medium rounded-lg transition-colors duration-300 hover:bg-blue-200 hover:text-blue-600 sm:text-sm'
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <div className='w-full px-6 py-2'>
                <LogoutBtn />
              </div>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
