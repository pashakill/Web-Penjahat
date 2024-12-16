const API_URL = "http://localhost:8080";

export async function initPage() {
   try {
        const response = await fetch(API_URL + "/initPage", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // Jika respons gagal
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        // Mengembalikan data JSON dari API
        return await response.json();
    } catch (error) {
        console.error("Error during fetch:", error);
        throw error;
    }
}


export async function initPortofolio() {
    try {
         const response = await fetch(API_URL + "/initPortopolio", {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json'
             }
         });
         
         // Jika respons gagal
         if (!response.ok) {
             throw new Error("Failed to fetch data");
         }
 
         // Mengembalikan data JSON dari API
         return await response.json();
     } catch (error) {
         console.error("Error during fetch:", error);
         throw error;
     }
 }
 
 export async function initService() {
    try {
         const response = await fetch(API_URL + "/initService", {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json'
             }
         });
         
         // Jika respons gagal
         if (!response.ok) {
             throw new Error("Failed to fetch data");
         }
 
         // Mengembalikan data JSON dari API
         return await response.json();
     } catch (error) {
         console.error("Error during fetch:", error);
         throw error;
     }
 }

 export async function initPortopolio() {
    try {
         const response = await fetch(API_URL + "/initPortopolio", {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json'
             }
         });
         
         // Jika respons gagal
         if (!response.ok) {
             throw new Error("Failed to fetch data");
         }
 
         // Mengembalikan data JSON dari API
         return await response.json();
     } catch (error) {
         console.error("Error during fetch:", error);
         throw error;
     }
 }

 export async function initCrew() {
    try {
         const response = await fetch(API_URL + "/initCrew", {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json'
             }
         });
         
         // Jika respons gagal
         if (!response.ok) {
             throw new Error("Failed to fetch data");
         }
 
         // Mengembalikan data JSON dari API
         return await response.json();
     } catch (error) {
         console.error("Error during fetch:", error);
         throw error;
     }
 }

 export async function addBooking(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Pastikan data dikirim sebagai JSON
            },
            body: JSON.stringify(data), // Mengubah objek JavaScript ke JSON string
        });

        // Cek apakah respons berhasil
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Mengembalikan data JSON dari respons
        return await response.json();
    } catch (error) {
        console.error('Error during POST request:', error);
        throw error; // Lempar ulang error agar bisa ditangani di pemanggil
    }
 }