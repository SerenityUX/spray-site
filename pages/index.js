import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:HIeiN0nD/spray');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 


  const printImage = (imageUrl) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<img src="${imageUrl}" onload="window.print();window.close();" style="max-width:100%;"/>`);
  };

  return (
    <>
      <Head>         
        <title>Spray</title>
      </Head>      
      <main>
      <h2 style={{marginLeft: 16}}>Print</h2> 

        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 16}}>
          {photos.map((photo) => (
            <div key={photo.id}>
              <img
                style={{ border: "2px solid #000", width: '100px', cursor: 'pointer' }}
                src={photo.image}
                onClick={() => printImage(photo.image)}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
