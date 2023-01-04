import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Space } from 'antd';
import { useAuthContext } from '../context/auth_context';

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <Link className="blog-link" to="/blog-list">
            Blog List
          </Link>
        )
      },
      {
        key: '2',
        label: (
          <Link className="blog-link" to="/post">
            Blog Post
          </Link>
        )
      }
    ]}
  />
);

const Header = () => {
  const { role, logoutHandler } = useAuthContext();

  return (
    <header>
      <Link to="/" className="logo">
        <span style={{ color: '#2EB872' }}>Smart</span>
        <span>English</span>
      </Link>

      <div id="menu" className="fas fa-bars"></div>

      <nav className="navbar" style={{ display: 'flex' }}>
        <Link to="/" style={{ marginTop: '15px' }}>
          Home
        </Link>
        <Link to="/practice" style={{ marginTop: '15px' }}>
          Practice
        </Link>
        <Dropdown overlay={menu}>
          <div onClick={(e) => e.preventDefault()}>
            <Space style={{ fontSize: '20px', marginTop: '15px', marginLeft: '13px' }}>Blog</Space>
          </div>
        </Dropdown>

        {role && (
          <Link to="/exam" style={{ marginTop: '15px' }}>
            Exam
          </Link>
        )}

        {role === 'admin' && (
          <Link to="/admin/create-question" style={{ marginTop: '15px' }}>
            Admin
          </Link>
        )}

        {role === 'user' && (
          <Link to="/profile" style={{ marginTop: '15px' }}>
            Profile
          </Link>
        )}

        {!role && (
          <Link to="/login" style={{ color: '#2EB872', marginTop: '15px' }}>
            Login
          </Link>
        )}

        {role && (
          <Link to="/" style={{ color: '#2EB872', marginTop: '15px' }} onClick={logoutHandler}>
            Logout
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
