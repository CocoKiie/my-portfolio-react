import '../styles/App.css';
import React, { Suspense } from 'react';

import { LazyLoadComponent } from 'react-lazy-load-image-component';
const Spline = React.lazy(() => import('@splinetool/react-spline'));


function Contact() {
  return (
    <section className='contact' id='contact' aria-label='Page Contact'>
      <div>
        <h2>Contact</h2>
        <ul>
          <li>
            <a href="mailto:laurieperbet@gmail.com" target='_blank' rel="noreferrer">
              <svg role="img" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fillRule="currentColor" xmlns="http://www.w3.org/2000/svg" className='svg' aria-label="Image d'un mail">
                <path d="M20 4H6C4.897 4 4 4.897 4 6V11H6V8L12.4 12.8C12.5732 12.9297 12.7837 12.9998 13 12.9998C13.2163 12.9998 13.4268 12.9297 13.6 12.8L20 8V17H12V19H20C21.103 19 22 18.103 22 17V6C22 4.897 21.103 4 20 4ZM13 10.75L6.666 6H19.334L13 10.75Z" fill="black" />
                <path d="M2 13C2 12.4477 2.44772 12 3 12H8C8.55228 12 9 12.4477 9 13V13C9 13.5523 8.55228 14 8 14H3C2.44772 14 2 13.5523 2 13V13ZM4 16C4 15.4477 4.44772 15 5 15H9C9.55228 15 10 15.4477 10 16V16C10 16.5523 9.55228 17 9 17H5C4.44772 17 4 16.5523 4 16V16ZM7 19C7 18.4477 7.44772 18 8 18H10C10.5523 18 11 18.4477 11 19V19C11 19.5523 10.5523 20 10 20H8C7.44772 20 7 19.5523 7 19V19Z" fill="black" />
              </svg>
              laurieperbet@gmail.com</a>
          </li>
          <li>
            <a href="tel:+3350606847">
              <svg role="img" aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fillRule="currentColor" xmlns="http://www.w3.org/2000/svg" className='svg' aria-label="Image d'un téléphone">
                <g clipPath="url(#clip0_14_99)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.1207 0.574674C2.31754 0.378124 2.55391 0.225652 2.81414 0.127363C3.07437 0.0290734 3.35252 -0.0127889 3.63015 0.00454979C3.90779 0.0218885 4.17856 0.0980324 4.42454 0.227936C4.67052 0.357839 4.88608 0.538535 5.05695 0.758049L7.07632 3.3523C7.44645 3.82817 7.57695 4.44805 7.4307 5.03305L6.81532 7.4968C6.7835 7.62441 6.78522 7.75807 6.82031 7.88482C6.8554 8.01157 6.92266 8.12709 7.01557 8.22017L9.7797 10.9843C9.87289 11.0774 9.9886 11.1448 10.1156 11.1799C10.2425 11.215 10.3764 11.2166 10.5042 11.1845L12.9668 10.5692C13.2555 10.497 13.5568 10.4914 13.848 10.5528C14.1392 10.6142 14.4126 10.741 14.6476 10.9235L17.2418 12.9418C18.1744 13.6674 18.2599 15.0455 17.4252 15.8792L16.2619 17.0424C15.4294 17.8749 14.1852 18.2405 13.0253 17.8322C10.0567 16.7876 7.36125 15.0881 5.13907 12.8597C2.91077 10.6378 1.21126 7.94282 0.166572 4.97455C-0.240678 3.8158 0.124947 2.57042 0.957447 1.73792L2.1207 0.574674Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0_14_99">
                    <rect width="18" height="18" fillRule="white" />
                  </clipPath>
                </defs>
              </svg>
              0650606847</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/laurieperbet/" rel="noreferrer" target='_blank'>
              <svg role="img" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fillRule="currentColor" xmlns="http://www.w3.org/2000/svg" className='svg' aria-label="Logo LinkedIn">
                <g clipPath="url(#clip0_14_104)">
                  <path d="M0 1.719C0 0.7695 0.789 0 1.7625 0H22.2375C23.211 0 24 0.7695 24 1.719V22.281C24 23.2305 23.211 24 22.2375 24H1.7625C0.789 24 0 23.2305 0 22.281V1.719ZM7.4145 20.091V9.2535H3.813V20.091H7.4145ZM5.6145 7.773C6.87 7.773 7.6515 6.942 7.6515 5.901C7.629 4.8375 6.8715 4.029 5.6385 4.029C4.4055 4.029 3.6 4.839 3.6 5.901C3.6 6.942 4.3815 7.773 5.5905 7.773H5.6145ZM12.9765 20.091V14.0385C12.9765 13.7145 13.0005 13.3905 13.0965 13.1595C13.356 12.513 13.9485 11.8425 14.9445 11.8425C16.248 11.8425 16.7685 12.8355 16.7685 14.2935V20.091H20.37V13.875C20.37 10.545 18.594 8.997 16.224 8.997C14.313 8.997 13.4565 10.047 12.9765 10.7865V10.824H12.9525C12.9605 10.8115 12.9685 10.799 12.9765 10.7865V9.2535H9.3765C9.4215 10.2705 9.3765 20.091 9.3765 20.091H12.9765Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0_14_104">
                    <rect width="24" height="24" fillRule="white" />
                  </clipPath>
                </defs>
              </svg>
              in/laurieperbet/</a>
          </li>
        </ul>
      </div>
      <div className='integration'>
        <LazyLoadComponent>
          <Suspense fallback={<div>Loading...</div>}>
            <Spline scene="https://prod.spline.design/HmLhHryWsuZfYYKc/scene.splinecode" events-target="global" role="img" aria-hidden="true" aria-label='scene montrant un petit animal sympa en 3D' />
          </Suspense>
        </LazyLoadComponent>
      </div>
    </section>
  );
}

export default Contact;