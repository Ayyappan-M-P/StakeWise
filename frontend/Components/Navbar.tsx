"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/UserContext";


const Navbar = () => {

  const router = useRouter();
  
  const { userStatus, logout } = useContext(UserContext); // Access user and logout from context

   const usersdata = localStorage.getItem("authToken")
  


  useEffect(() => {
    // Fetch user data from the backend
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/getUser", {
          credentials: "include", // Ensures cookies or tokens are sent
        });
        if (response.ok) {
          const data = await response.json();
        
        } else {
          
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3001/api/logout", {
        method: "POST",
        credentials: "include",
      });
      logout();
      
      router.push("/"); // Redirect to home after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleAvatarClick = () => {
    router.push("/profile"); // Navigate to dashboard
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/investment-logo.jpg" alt="logo" width={70} height={25} />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        <li className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
          <Link href="/">Home</Link>
        </li>
        <li className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
          <Link href="/About">About</Link>
        </li>
        <li className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
          <Link href="/Service">Service</Link>
        </li>
        <li className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
          <Link href="/companystock">Company Stock</Link>
        </li>
        <li className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
          <Link href="/Leaderboard">Leaderboard</Link>
        </li>
        <li className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
          <Link href="/News">News</Link>
        </li>
      </ul>

      <div>
        {usersdata ? (
          <div className="flex items-center gap-4">
            <Image
              src="/images.png" // Replace with actual avatar if available
              alt="Profile Avatar"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
              onClick={handleAvatarClick}
              
            />
            {/* <span className="text-gray-50">{user.name}</span> */}
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="contained" href="/Login">
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;