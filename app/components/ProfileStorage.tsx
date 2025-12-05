'use client';

import { useEffect } from 'react';

export default function ProfileStorage() {
  useEffect(() => {
    // Function to store profile from middleware header
    const storeProfileFromHeader = () => {
      // Check if we're on a protected route and have profile data
      const userProfileHeader = document.querySelector('meta[name="x-user-profile"]')?.getAttribute('content');
      if (userProfileHeader) {
        try {
          const profileData = JSON.parse(userProfileHeader);
          localStorage.setItem('userProfile', JSON.stringify(profileData));
        } catch (error) {
          console.error('Failed to parse profile data:', error);
        }
      }
    };

    // Alternative: Check for profile data via API call if header approach doesn't work
    const fetchAndStoreProfile = async () => {
      try {
        const response = await fetch('/api/auth/profile', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.ok) {
          const profileData = await response.json();
          if (profileData.user) {
            localStorage.setItem('userProfile', JSON.stringify(profileData.user));
          }
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    // Try header first, fallback to API call
    storeProfileFromHeader();
    
    // If no profile in localStorage after header check, try API
    if (!localStorage.getItem('userProfile')) {
      fetchAndStoreProfile();
    }
  }, []);

  return null; // This component doesn't render anything
}