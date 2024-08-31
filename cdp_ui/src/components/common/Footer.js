import React from 'react'

export default function Footer() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return (
    <footer className="main-footer">
        <strong>&copy; 2024 <a href="#">{user ? user.name : "Saurabh Shukla"}</a> ( <a href="#" className="text-danger">{user ? user.email : "admin@gmail.com"}</a> ) </strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 11.17.0
        </div>
    </footer>
  )
}
