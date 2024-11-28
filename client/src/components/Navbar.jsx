import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">React App</h1>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-semibold border-b-2 border-white'
                : 'text-gray-200 hover:text-white'
            }
            end
          >
            Home (Textract)
          </NavLink>
          <NavLink
            to="/translate"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-semibold border-b-2 border-white'
                : 'text-gray-200 hover:text-white'
            }
          >
            Translate
          </NavLink>
          <NavLink
            to="/sentiment"
            className={({ isActive }) =>
              isActive
                ? 'text-white font-semibold border-b-2 border-white'
                : 'text-gray-200 hover:text-white'
            }
          >
            Sentiment
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
