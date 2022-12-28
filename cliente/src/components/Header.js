import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/header/header.scss';

const links = [
  { label: 'Home', icon: <FaHome className='header-icon icon' />, link: '/' },
  {
    label: 'About',
    icon: <FaHome className='header-icon icon' />,
    link: '/about',
  },
  {
    label: 'Contact',
    icon: <FaHome className='header-icon icon' />,
    link: '/contact',
  },
];

export default function Header() {
  const linkElement = links.map((link) => {
    return (
      <li key={link.label}>
        <Link to={link.link}>
          <p>{link.label}</p>
          {link.icon}
        </Link>
      </li>
    );
  });

  return (
    <nav>
      <div className='logo'>Emporium</div>
      <ul>{linkElement}</ul>
    </nav>
  );
}
