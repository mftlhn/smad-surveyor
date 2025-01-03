import React from 'react'

const Header = ({title}) => {
  return (
    <header className="bg-gray-700 text-white p-4 w-full fixed top-0 z-50">
        <h1>
            {title}
        </h1>
    </header>
  )
}

export default Header