import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Authorized({children}) {
    const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div>{children}</div>
  )
}
