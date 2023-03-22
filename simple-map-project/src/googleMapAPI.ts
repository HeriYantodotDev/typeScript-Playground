import * as dotenv from 'dotenv';
dotenv.config();

export function installGoogleMapAPI() {
  return new Promise((resolve, reject) => {
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    const scriptGoogleAPI = document.createElement('script');
    scriptGoogleAPI.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    scriptGoogleAPI.defer = true;
    scriptGoogleAPI.onload = resolve;
    scriptGoogleAPI.onerror = reject;
    document.body.appendChild(scriptGoogleAPI);
  });
}

