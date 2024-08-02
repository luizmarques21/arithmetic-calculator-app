import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom"
import Logo from '../../assets/calculator-logo.jpg'
import { CleanButtonUI } from '../UIButtons'
import { isAuthenticated, logout, getUser } from '../../services/auth'
import { StyledHeader, PlainText } from './styles'

const Header = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUsername(user.username);
    }
  }, [])

  function logoutFunction() {
    logout();
    window.location.href = '/'
  }

  return (
    <>
      {isAuthenticated() &&
        <StyledHeader>
          <div className="brand">
            <Link to="/">
              <img src={Logo} style={{ width: '50px', height: '100%' }} alt="AMT logo" />
            </Link>
          </div>
          <Menu
            mode="horizontal"
            overflowedIndicator={"🔽"}
            style={{ backgroundColor: "inherit", textAlign: "center", border: "none", width: "100%" }}
            >
            <Menu.Item key="operation">
              <Link to="/operation" className="menu-color-first">
                Operation
              </Link>
            </Menu.Item>
            <Menu.Item key="record">
              <Link to="/records" className="menu-color-first">
                Records
              </Link>
            </Menu.Item>
          </Menu>
          <div style={{ marginRight: "3rem", marginTop: "1em", textAlign: "center" }}>
            <PlainText>Hello {username}</PlainText>
          </div>
          <div style={{ marginLeft: "auto", marginTop: "1em", width: 90, textAlign: "center" }}>
            <CleanButtonUI 
              style={{ color: "white", fontWeight: "bold" }} 
              onClick={() => { logoutFunction() }}
              >
                <ExportOutlined /> 
                Logout 
              </CleanButtonUI>
          </div>
        </StyledHeader>
      }
    </>
  )
};

export default Header;
