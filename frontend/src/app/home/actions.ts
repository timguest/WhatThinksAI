"use server"
export async function fetchImage (imageUrl: string) {
    console.log('fetch cities function called', imageUrl);
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch the image');
              }
            
              const arrayBuffer = await response.arrayBuffer(); // Get image as ArrayBuffer
              const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
              const base64String = buffer.toString('base64');
                        
            //add domain and country code for more results
            resolve(base64String);
          } catch (error) {
            console.error('Error from the locations api:', error);
            reject(error)
          }   
    })
}