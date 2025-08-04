import { useState } from 'react'

// Custom Feather Icon Component
const FeatherIcon = ({ size = 24 }: { size?: number; strokeWidth?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>feather</title>
    <g fill="none">
      <path d="M13.9141 6.04669C14.3966 5.89291 14.9272 6.12614 15.1338 6.6004C15.3541 7.10678 15.1216 7.69643 14.6152 7.91681L14.2285 8.08966C10.2586 9.9015 7.27634 12.5886 5.90039 15.4354C5.80424 15.6341 5.65002 15.7855 5.46875 15.8817L5.46387 15.8943C4.46467 18.3639 4.0895 20.4327 4.00391 21.1424L3.98633 21.244C3.87508 21.7384 3.40461 22.0784 2.89062 22.0164C2.34262 21.9501 1.95153 21.4513 2.01758 20.9031L2.07715 20.4871C2.25741 19.3536 2.74854 17.129 3.83496 14.6043L3.88086 14.5125C3.9884 14.3194 4.15277 14.1726 4.34375 14.0867C6.11614 10.7969 9.5613 7.93457 13.8174 6.08282L13.9141 6.04669Z" fill="currentColor" data-glass="origin"></path>
      <path d="M21.996 2.97831C21.9443 2.38904 21.4169 1.95015 20.8353 2.00456C10.3866 2.9187 5.66294 10.0172 3.57739 15.2239C3.38207 15.7115 3.61863 16.2586 4.09897 16.4711L5.18087 16.9499C6.32808 17.459 7.45527 17.6848 7.52185 17.6962C8.74173 17.919 9.86938 18.031 10.9036 18.031C13.0562 18.031 14.8029 17.5472 16.1171 16.5872C16.6465 16.2 17.5038 15.4252 18.1023 14.1039C14.0582 14.8651 13.0046 11.9807 13.0046 11.9807C16.1248 12.7703 19.6729 13.0131 20.6233 9.36491C20.8218 8.49059 20.9483 7.64435 21.0697 6.82729L21.0738 6.79966C21.2651 5.52313 21.4453 4.32071 21.8551 3.6047C21.961 3.42108 22.0159 3.20542 21.996 2.97831Z" fill="currentColor" opacity="0.6" data-glass="blur"></path>
    </g>
  </svg>
)

// Custom Layers Icon Component
const LayersIcon = ({ size = 24 }: { size?: number; strokeWidth?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M9.12015 8.16C10.1529 7.38542 10.6693 6.99813 11.2364 6.84884C11.737 6.71706 12.2632 6.71705 12.7638 6.84883C13.331 6.99812 13.8474 7.38541 14.8801 8.15999L20.5868 12.44C21.7448 13.3085 22.3238 13.7427 22.5308 14.275C22.7122 14.7413 22.7122 15.2586 22.5308 15.7249C22.3238 16.2573 21.7448 16.6915 20.5868 17.56L14.8801 21.84C13.8474 22.6146 13.331 23.0019 12.7638 23.1512C12.2632 23.2829 11.737 23.2829 11.2364 23.1512C10.6693 23.0019 10.1529 22.6146 9.12014 21.84L3.41349 17.56C2.25552 16.6915 1.67654 16.2573 1.4695 15.7249C1.28816 15.2586 1.28816 14.7413 1.46951 14.275C1.67655 13.7427 2.25553 13.3085 3.41349 12.44L9.12015 8.16Z" 
      fill="currentColor"
    />
    <path 
      d="M9.12015 2.15999C10.1529 1.38542 10.6693 0.998128 11.2364 0.848835C11.737 0.717055 12.2632 0.717055 12.7638 0.848834C13.331 0.998124 13.8474 1.38541 14.8801 2.15999L20.5868 6.43998C21.7448 7.30845 22.3238 7.74269 22.5308 8.27503C22.7122 8.74132 22.7122 9.25864 22.5308 9.72492C22.3238 10.2573 21.7448 10.6915 20.5868 11.56L14.8801 15.84C13.8474 16.6146 13.331 17.0019 12.7638 17.1512C12.2632 17.2829 11.737 17.2829 11.2364 17.1512C10.6693 17.0019 10.1529 16.6146 9.12014 15.84L3.41349 11.56C2.25552 10.6915 1.67654 10.2573 1.4695 9.72492C1.28816 9.25864 1.28816 8.74132 1.46951 8.27504C1.67655 7.74269 2.25553 7.30846 3.41349 6.43998L9.12015 2.15999Z" 
      fill="currentColor" 
      opacity="0.6"
    />
  </svg>
)

// Custom User Icon Component for About
const UserIcon = ({ size = 24 }: { size?: number; strokeWidth?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>user</title>
    <g fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M2 11C2 5.47723 6.47723 1 12 1C17.5228 1 22 5.47723 22 11C22 16.5228 17.5228 21 12 21C6.47723 21 2 16.5228 2 11Z" fill="url(#user_gradient_0)" data-glass="origin" mask="url(#user_mask)"></path>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 11C2 5.47723 6.47723 1 12 1C17.5228 1 22 5.47723 22 11C22 16.5228 17.5228 21 12 21C6.47723 21 2 16.5228 2 11Z" fill="url(#user_gradient_0)" data-glass="clone" filter="url(#user_filter)" clipPath="url(#user_clipPath)"></path>
      <path d="M12.4414 14C16.3397 14.0001 19.4999 17.1603 19.5 21.0586C19.5 22.1307 18.6307 23 17.5586 23H6.44141C5.36932 23 4.5 22.1307 4.5 21.0586C4.50012 17.1603 7.6603 14.0001 11.5586 14H12.4414ZM12 5C13.933 5 15.5 6.567 15.5 8.5C15.5 10.433 13.933 12 12 12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5Z" fill="url(#user_gradient_1)" data-glass="blur"></path>
      <path d="M17.5586 22.25V23H6.44141V22.25H17.5586ZM18.75 21.0586C18.7499 17.5745 15.9255 14.7501 12.4414 14.75H11.5586C8.07451 14.7501 5.25012 17.5745 5.25 21.0586C5.25 21.7165 5.78354 22.25 6.44141 22.25V23L6.24316 22.9902C5.26408 22.891 4.5 22.0638 4.5 21.0586C4.50012 17.1603 7.6603 14.0001 11.5586 14H12.4414L12.8047 14.0088C16.5342 14.198 19.4999 17.2821 19.5 21.0586C19.5 22.1307 18.6307 23 17.5586 23V22.25C18.2165 22.25 18.75 21.7165 18.75 21.0586Z" fill="url(#user_gradient_2)"></path>
      <path d="M14.75 8.5C14.75 6.98122 13.5188 5.75 12 5.75C10.4812 5.75 9.25 6.98122 9.25 8.5C9.25 10.0188 10.4812 11.25 12 11.25V12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5C13.933 5 15.5 6.567 15.5 8.5C15.5 10.433 13.933 12 12 12V11.25C13.5188 11.25 14.75 10.0188 14.75 8.5Z" fill="url(#user_gradient_3)"></path>
      <defs>
        <linearGradient id="user_gradient_0" x1="12" y1="1" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#575757"></stop>
          <stop offset="1" stopColor="#151515"></stop>
        </linearGradient>
        <linearGradient id="user_gradient_1" x1="12" y1="5" x2="12" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E3E3E5" stopOpacity=".6"></stop>
          <stop offset="1" stopColor="#BBBBC0" stopOpacity=".6"></stop>
        </linearGradient>
        <linearGradient id="user_gradient_2" x1="12" y1="14" x2="12" y2="19.212" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
        </linearGradient>
        <linearGradient id="user_gradient_3" x1="12" y1="5" x2="12" y2="9.054" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
        </linearGradient>
        <filter id="user_filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
        </filter>
        <clipPath id="user_clipPath">
          <path d="M12.4414 14C16.3397 14.0001 19.4999 17.1603 19.5 21.0586C19.5 22.1307 18.6307 23 17.5586 23H6.44141C5.36932 23 4.5 22.1307 4.5 21.0586C4.50012 17.1603 7.6603 14.0001 11.5586 14H12.4414ZM12 5C13.933 5 15.5 6.567 15.5 8.5C15.5 10.433 13.933 12 12 12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5Z" fill="url(#user_gradient_1)"></path>
        </clipPath>
        <mask id="user_mask">
          <rect width="100%" height="100%" fill="#FFF"></rect>
          <path d="M12.4414 14C16.3397 14.0001 19.4999 17.1603 19.5 21.0586C19.5 22.1307 18.6307 23 17.5586 23H6.44141C5.36932 23 4.5 22.1307 4.5 21.0586C4.50012 17.1603 7.6603 14.0001 11.5586 14H12.4414ZM12 5C13.933 5 15.5 6.567 15.5 8.5C15.5 10.433 13.933 12 12 12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5Z" fill="#000"></path>
        </mask>
      </defs>
    </g>
  </svg>
)

// Custom Question Mark Icon Component for Help
const QuestionIcon = ({ size = 24 }: { size?: number; strokeWidth?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>circle-question</title>
    <g fill="none">
      <path d="M10 18.0098V18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18V18.0098C14 19.1143 13.1046 20.0098 12 20.0098C10.8954 20.0098 10 19.1143 10 18.0098ZM13 9.5C13 8.94772 12.5523 8.5 12 8.5C11.4477 8.5 11 8.94772 11 9.5C11 10.6046 10.1046 11.5 9 11.5C7.89543 11.5 7 10.6046 7 9.5C7 6.73858 9.23858 4.5 12 4.5C14.7614 4.5 17 6.73858 17 9.5C17 11.3954 15.9442 13.0415 14.3984 13.8877C14.2927 13.9456 14.1982 14.0068 14.1201 14.0664C14.0611 14.1114 14.0192 14.1508 13.9902 14.1807C13.8988 15.2005 13.0436 16 12 16C10.8954 16 10 15.1046 10 14C10 12.9774 10.4464 12.1659 10.9287 11.6035C11.4024 11.0512 11.9791 10.6523 12.4785 10.3789C12.7936 10.2062 13 9.87572 13 9.5Z" fill="url(#question_gradient_0)" data-glass="origin" mask="url(#question_mask)"></path>
      <path d="M10 18.0098V18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18V18.0098C14 19.1143 13.1046 20.0098 12 20.0098C10.8954 20.0098 10 19.1143 10 18.0098ZM13 9.5C13 8.94772 12.5523 8.5 12 8.5C11.4477 8.5 11 8.94772 11 9.5C11 10.6046 10.1046 11.5 9 11.5C7.89543 11.5 7 10.6046 7 9.5C7 6.73858 9.23858 4.5 12 4.5C14.7614 4.5 17 6.73858 17 9.5C17 11.3954 15.9442 13.0415 14.3984 13.8877C14.2927 13.9456 14.1982 14.0068 14.1201 14.0664C14.0611 14.1114 14.0192 14.1508 13.9902 14.1807C13.8988 15.2005 13.0436 16 12 16C10.8954 16 10 15.1046 10 14C10 12.9774 10.4464 12.1659 10.9287 11.6035C11.4024 11.0512 11.9791 10.6523 12.4785 10.3789C12.7936 10.2062 13 9.87572 13 9.5Z" fill="url(#question_gradient_0)" data-glass="clone" filter="url(#question_filter)" clipPath="url(#question_clipPath)"></path>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 16.5C11.3096 16.5 10.75 17.0596 10.75 17.75V17.7598C10.75 18.4501 11.3096 19.0098 12 19.0098C12.6904 19.0098 13.25 18.4501 13.25 17.7598V17.75C13.25 17.0596 12.6904 16.5 12 16.5ZM12 5.5C9.79086 5.5 8 7.29086 8 9.5C8 10.0523 8.44772 10.5 9 10.5C9.55229 10.5 10 10.0523 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5C14 10.2557 13.5809 10.9149 12.958 11.2559C12.5267 11.492 12.0587 11.8211 11.6875 12.2539C11.3119 12.6918 11 13.2816 11 14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14C13 13.89 13.0442 13.7454 13.2061 13.5566C13.3724 13.3627 13.6236 13.1724 13.9189 13.0107C15.157 12.3329 16 11.0155 16 9.5C16 7.29086 14.2091 5.5 12 5.5Z" fill="url(#question_gradient_1)" data-glass="blur"></path>
      <path d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 1.75C6.33908 1.75 1.75 6.33908 1.75 12C1.75 17.6609 6.33908 22.25 12 22.25C17.6609 22.25 22.25 17.6609 22.25 12C22.25 6.33908 17.6609 1.75 12 1.75Z" fill="url(#question_gradient_2)"></path>
      <defs>
        <linearGradient id="question_gradient_0" x1="12" y1="4.5" x2="12" y2="20.01" gradientUnits="userSpaceOnUse">
          <stop stopColor="#575757"></stop>
          <stop offset="1" stopColor="#151515"></stop>
        </linearGradient>
        <linearGradient id="question_gradient_1" x1="12" y1="1" x2="12" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E3E3E5" stopOpacity=".6"></stop>
          <stop offset="1" stopColor="#BBBBC0" stopOpacity=".6"></stop>
        </linearGradient>
        <linearGradient id="question_gradient_2" x1="12" y1="1" x2="12" y2="13.74" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
        </linearGradient>
        <filter id="question_filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
        </filter>
        <clipPath id="question_clipPath">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 16.5C11.3096 16.5 10.75 17.0596 10.75 17.75V17.7598C10.75 18.4501 11.3096 19.0098 12 19.0098C12.6904 19.0098 13.25 18.4501 13.25 17.7598V17.75C13.25 17.0596 12.6904 16.5 12 16.5ZM12 5.5C9.79086 5.5 8 7.29086 8 9.5C8 10.0523 8.44772 10.5 9 10.5C9.55229 10.5 10 10.0523 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5C14 10.2557 13.5809 10.9149 12.958 11.2559C12.5267 11.492 12.0587 11.8211 11.6875 12.2539C11.3119 12.6918 11 13.2816 11 14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14C13 13.89 13.0442 13.7454 13.2061 13.5566C13.3724 13.3627 13.6236 13.1724 13.9189 13.0107C15.157 12.3329 16 11.0155 16 9.5C16 7.29086 14.2091 5.5 12 5.5Z" fill="url(#question_gradient_1)"></path>
        </clipPath>
        <mask id="question_mask">
          <rect width="100%" height="100%" fill="#FFF"></rect>
          <path fillRule="evenodd" clipRule="evenodd" d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 16.5C11.3096 16.5 10.75 17.0596 10.75 17.75V17.7598C10.75 18.4501 11.3096 19.0098 12 19.0098C12.6904 19.0098 13.25 18.4501 13.25 17.7598V17.75C13.25 17.0596 12.6904 16.5 12 16.5ZM12 5.5C9.79086 5.5 8 7.29086 8 9.5C8 10.0523 8.44772 10.5 9 10.5C9.55229 10.5 10 10.0523 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5C14 10.2557 13.5809 10.9149 12.958 11.2559C12.5267 11.492 12.0587 11.8211 11.6875 12.2539C11.3119 12.6918 11 13.2816 11 14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14C13 13.89 13.0442 13.7454 13.2061 13.5566C13.3724 13.3627 13.6236 13.1724 13.9189 13.0107C15.157 12.3329 16 11.0155 16 9.5C16 7.29086 14.2091 5.5 12 5.5Z" fill="#000"></path>
        </mask>
      </defs>
    </g>
  </svg>
)

// Custom Star Sparkle Icon Component
const StarSparkleIcon = ({ size = 24 }: { size?: number; strokeWidth?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>star-sparkle</title>
    <g fill="none">
      <path d="M20.3174 8.19531C20.0357 8.8823 19.5416 9.61008 18.9248 10.332C17.6628 11.8091 15.7312 13.4472 13.4355 14.9248C11.14 16.4022 8.8494 17.4826 6.98242 18.0195C6.31873 18.2104 5.67868 18.3394 5.09375 18.3857L5.45996 16.3232C5.74837 16.2727 6.07264 16.1993 6.42969 16.0967C8.06215 15.6272 10.1747 14.6455 12.3535 13.2432C14.5326 11.8406 16.3019 10.3247 17.4053 9.0332C17.7661 8.61089 18.0377 8.22999 18.2305 7.90234L20.3174 8.19531Z" fill="url(#star-sparkle_gradient_0)" data-glass="origin" mask="url(#star-sparkle_mask)"></path>
      <path d="M20.3174 8.19531C20.0357 8.8823 19.5416 9.61008 18.9248 10.332C17.6628 11.8091 15.7312 13.4472 13.4355 14.9248C11.14 16.4022 8.8494 17.4826 6.98242 18.0195C6.31873 18.2104 5.67868 18.3394 5.09375 18.3857L5.45996 16.3232C5.74837 16.2727 6.07264 16.1993 6.42969 16.0967C8.06215 15.6272 10.1747 14.6455 12.3535 13.2432C14.5326 11.8406 16.3019 10.3247 17.4053 9.0332C17.7661 8.61089 18.0377 8.22999 18.2305 7.90234L20.3174 8.19531Z" fill="url(#star-sparkle_gradient_0)" data-glass="clone" filter="url(#star-sparkle_filter)" clipPath="url(#star-sparkle_clipPath)"></path>
      <path d="M10.6642 2.61922C11.2208 1.52816 12.7794 1.52811 13.336 2.61922L15.5069 6.87508C15.7292 7.31078 16.1505 7.6107 16.6349 7.67879L21.4083 8.34969C22.654 8.52479 23.1438 10.0637 22.2286 10.9268L18.839 14.1231C18.4713 14.4699 18.3034 14.979 18.3917 15.4766L19.2003 20.0372C19.4164 21.2558 18.1473 22.1966 17.0441 21.6358L12.6798 19.418C12.2526 19.2009 11.7476 19.2009 11.3204 19.418L6.95616 21.6358C5.85285 22.1967 4.58376 21.2559 4.79991 20.0372L5.60851 15.4766C5.69678 14.9789 5.52801 14.4699 5.16027 14.1231L1.77159 10.9268C0.856418 10.0637 1.34619 8.52479 2.59191 8.34969L7.36534 7.67879C7.84961 7.61064 8.27006 7.31071 8.4923 6.87508L10.6642 2.61922Z" fill="url(#star-sparkle_gradient_1)" data-glass="blur"></path>
      <path d="M10.6641 2.61911C11.2207 1.52809 12.7793 1.52809 13.336 2.61911L15.5079 6.87498C15.7301 7.31065 16.1505 7.61058 16.6348 7.67869L21.4083 8.34959C22.654 8.5247 23.1438 10.0637 22.2286 10.9267L18.839 14.123C18.4713 14.4698 18.3034 14.9789 18.3917 15.4766L19.2003 20.0371C19.4097 21.2177 18.2249 22.1382 17.1475 21.6846L17.044 21.6367L12.6797 19.418C12.2525 19.2008 11.7475 19.2008 11.3203 19.418L6.95602 21.6367L6.85251 21.6846C5.80984 22.1236 4.6659 21.2757 4.78315 20.1504L4.79975 20.0371L5.60835 15.4766C5.68559 15.0411 5.56634 14.5972 5.28901 14.2607L5.16108 14.123L1.7714 10.9267C0.884703 10.0905 1.31671 8.62007 2.47746 8.3701L2.59172 8.34959L7.36521 7.67869C7.84952 7.61057 8.26991 7.31064 8.49217 6.87498L10.6641 2.61911ZM12.668 2.95993C12.3897 2.41442 11.6104 2.41442 11.332 2.95993L9.16015 7.2158C8.82676 7.86931 8.19619 8.31969 7.4697 8.42185L2.69621 9.09275C2.07335 9.18031 1.82846 9.9493 2.28605 10.3808L5.67574 13.5771C6.22733 14.0974 6.47906 14.8609 6.34664 15.6074L5.53804 20.168C5.42998 20.7772 6.06456 21.248 6.61618 20.9678L10.9805 18.749C11.6212 18.4234 12.3789 18.4234 13.0196 18.749L17.3839 20.9678C17.9355 21.248 18.5701 20.7772 18.462 20.168L17.6534 15.6074C17.521 14.8609 17.7727 14.0974 18.3243 13.5771L21.714 10.3808C22.1716 9.9493 21.9267 9.18031 21.3038 9.09275L16.5303 8.42185C15.8038 8.31969 15.1733 7.86931 14.8399 7.2158L12.668 2.95993Z" fill="url(#star-sparkle_gradient_2)"></path>
      <path d="M6.07314 2.88824L5.44324 1.30101C5.28398 0.8997 4.71603 0.89965 4.55669 1.30094L3.92644 2.88824C3.91951 2.90563 3.90577 2.91938 3.88838 2.9263L2.30091 3.55671C1.89969 3.71604 1.8997 4.28396 2.30092 4.44329L3.88838 5.0737C3.90577 5.08063 3.91951 5.09437 3.92644 5.11176L4.55668 6.69906C4.71602 7.10035 5.28397 7.1003 5.44324 6.69899L6.07314 5.11176C6.08008 5.0943 6.094 5.08061 6.11147 5.0737L7.69907 4.4433C8.10031 4.28398 8.10031 3.71602 7.69907 3.5567L6.11147 2.9263C6.094 2.91939 6.08008 2.9057 6.07314 2.88824Z" fill="url(#star-sparkle_gradient_3)"></path>
      <path d="M23.5 16.25C23.5 16.9404 22.9404 17.5 22.25 17.5C21.5596 17.5 21 16.9404 21 16.25C21 15.5596 21.5596 15 22.25 15C22.9404 15 23.5 15.5596 23.5 16.25Z" fill="url(#star-sparkle_gradient_4)"></path>
      <path d="M18.2307 4.89743C18.949 4.93039 19.7944 5.15041 20.2727 5.89353L20.3548 6.03415C20.7312 6.74332 20.584 7.53845 20.3333 8.16404C20.3289 8.17492 20.3231 8.18536 20.3186 8.19626L18.2327 7.90329C18.3369 7.72619 18.4187 7.56496 18.4768 7.4199C18.578 7.16745 18.5847 7.03502 18.5813 6.98142C18.5338 6.95616 18.4108 6.90798 18.1399 6.89548C17.6948 6.87509 17.0493 6.96563 16.2268 7.20212C14.5943 7.67159 12.482 8.65321 10.303 10.0556C8.12386 11.4582 6.3547 12.974 5.25125 14.2656C4.69526 14.9164 4.34675 15.4662 4.18093 15.8799C4.07977 16.1323 4.07313 16.2646 4.07644 16.3183C4.12416 16.3436 4.24758 16.3918 4.51882 16.4043C4.76947 16.4157 5.08313 16.3909 5.45632 16.3261L5.09011 18.3867C4.86005 18.4047 4.63829 18.412 4.42703 18.4023C3.70884 18.3694 2.86334 18.1492 2.38504 17.4062C1.90698 16.6632 2.05709 15.803 2.32449 15.1357C2.60377 14.4391 3.10509 13.7002 3.73172 12.9668C4.99373 11.4897 6.92524 9.85163 9.22097 8.374C11.5166 6.89649 13.8071 5.81617 15.6741 5.27927C16.6011 5.01275 17.4811 4.86312 18.2307 4.89743Z" fill="url(#star-sparkle_gradient_5)"></path>
      <defs>
        <linearGradient id="star-sparkle_gradient_0" x1="12.706" y1="7.902" x2="12.706" y2="18.386" gradientUnits="userSpaceOnUse">
          <stop stopColor="#575757"></stop>
          <stop offset="1" stopColor="#151515"></stop>
        </linearGradient>
        <linearGradient id="star-sparkle_gradient_1" x1="12" y1="1.801" x2="12" y2="21.802" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E3E3E5" stopOpacity=".6"></stop>
          <stop offset="1" stopColor="#BBBBC0" stopOpacity=".6"></stop>
        </linearGradient>
        <linearGradient id="star-sparkle_gradient_2" x1="12" y1="1.801" x2="12" y2="13.384" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
        </linearGradient>
        <linearGradient id="star-sparkle_gradient_3" x1="5" y1="1" x2="5" y2="7" gradientUnits="userSpaceOnUse">
          <stop stopColor="#575757"></stop>
          <stop offset="1" stopColor="#151515"></stop>
        </linearGradient>
        <linearGradient id="star-sparkle_gradient_4" x1="22.25" y1="15" x2="22.25" y2="17.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#575757"></stop>
          <stop offset="1" stopColor="#151515"></stop>
        </linearGradient>
        <linearGradient id="star-sparkle_gradient_5" x1="11.329" y1="4.893" x2="11.329" y2="18.407" gradientUnits="userSpaceOnUse">
          <stop stopColor="#575757"></stop>
          <stop offset="1" stopColor="#151515"></stop>
        </linearGradient>
        <filter id="star-sparkle_filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
        </filter>
        <clipPath id="star-sparkle_clipPath">
          <path d="M10.6642 2.61922C11.2208 1.52816 12.7794 1.52811 13.336 2.61922L15.5069 6.87508C15.7292 7.31078 16.1505 7.6107 16.6349 7.67879L21.4083 8.34969C22.654 8.52479 23.1438 10.0637 22.2286 10.9268L18.839 14.1231C18.4713 14.4699 18.3034 14.979 18.3917 15.4766L19.2003 20.0372C19.4164 21.2558 18.1473 22.1966 17.0441 21.6358L12.6798 19.418C12.2526 19.2009 11.7476 19.2009 11.3204 19.418L6.95616 21.6358C5.85285 22.1967 4.58376 21.2559 4.79991 20.0372L5.60851 15.4766C5.69678 14.9789 5.52801 14.4699 5.16027 14.1231L1.77159 10.9268C0.856418 10.0637 1.34619 8.52479 2.59191 8.34969L7.36534 7.67879C7.84961 7.61064 8.27006 7.31071 8.4923 6.87508L10.6642 2.61922Z" fill="url(#star-sparkle_gradient_1)"></path>
        </clipPath>
        <mask id="star-sparkle_mask">
          <rect width="100%" height="100%" fill="#FFF"></rect>
          <path d="M10.6642 2.61922C11.2208 1.52816 12.7794 1.52811 13.336 2.61922L15.5069 6.87508C15.7292 7.31078 16.1505 7.6107 16.6349 7.67879L21.4083 8.34969C22.654 8.52479 23.1438 10.0637 22.2286 10.9268L18.839 14.1231C18.4713 14.4699 18.3034 14.979 18.3917 15.4766L19.2003 20.0372C19.4164 21.2558 18.1473 22.1966 17.0441 21.6358L12.6798 19.418C12.2526 19.2009 11.7476 19.2009 11.3204 19.418L6.95616 21.6358C5.85285 22.1967 4.58376 21.2559 4.79991 20.0372L5.60851 15.4766C5.69678 14.9789 5.52801 14.4699 5.16027 14.1231L1.77159 10.9268C0.856418 10.0637 1.34619 8.52479 2.59191 8.34969L7.36534 7.67879C7.84961 7.61064 8.27006 7.31071 8.4923 6.87508L10.6642 2.61922Z" fill="#000"></path>
        </mask>
      </defs>
    </g>
  </svg>
)

interface DockItem {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
  href?: string
  isActive?: boolean
  isOpen?: boolean
  isMinimized?: boolean
}

interface WindowState {
  id: string
  isOpen: boolean
  isMinimized: boolean
  isActive: boolean
}

interface DockProps {
  activeItem?: string
  onItemClick?: (itemId: string) => void
  windows?: Record<string, WindowState>
}

export default function Dock({ activeItem, onItemClick, windows }: DockProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const dockItems: DockItem[] = [
    {
      id: 'home',
      label: 'Notes',
      icon: FeatherIcon,
      isActive: activeItem === 'home' && windows?.['home']?.isOpen && !windows?.['home']?.isMinimized,
      isOpen: windows?.['home']?.isOpen || false,
      isMinimized: windows?.['home']?.isMinimized || false
    },
    {
      id: 'prototype1',
      label: 'Draw',
      icon: LayersIcon,
      isActive: activeItem === 'prototype1' && windows?.['prototype1']?.isOpen && !windows?.['prototype1']?.isMinimized,
      isOpen: windows?.['prototype1']?.isOpen || false,
      isMinimized: windows?.['prototype1']?.isMinimized || false
    },
    {
      id: 'starsparkle',
      label: 'Motion',
      icon: StarSparkleIcon,
      isActive: activeItem === 'starsparkle' && windows?.['starsparkle']?.isOpen && !windows?.['starsparkle']?.isMinimized,
      isOpen: windows?.['starsparkle']?.isOpen || false,
      isMinimized: windows?.['starsparkle']?.isMinimized || false
    },
    {
      id: 'webview',
      label: 'About',
      icon: UserIcon,
      isActive: activeItem === 'webview' && windows?.['webview']?.isOpen && !windows?.['webview']?.isMinimized,
      isOpen: windows?.['webview']?.isOpen || false,
      isMinimized: windows?.['webview']?.isMinimized || false
    },
    {
      id: 'help',
      label: 'System Info',
      icon: QuestionIcon,
      isActive: activeItem === 'help' && windows?.['help']?.isOpen && !windows?.['help']?.isMinimized,
      isOpen: windows?.['help']?.isOpen || false,
      isMinimized: windows?.['help']?.isMinimized || false
    }
  ]

  const handleItemClick = (itemId: string) => {
    onItemClick?.(itemId)
  }

  const handleItemHover = (itemId: string | null) => {
    setHoveredItem(itemId)
  }

      return (
    <div className="fixed left-0 top-0 bottom-0 z-50">
      {/* Left-side Dock */}
             <div 
         className="h-full border-r border-white/10 shadow-2xl bg-stone-800/40 backdrop-blur-[40px]"
       >
        <div className="flex flex-col items-center justify-between gap-1 px-2 py-4 h-full">
          {/* Main Dock Items */}
          <div className="flex flex-col items-center gap-1">
            {dockItems.slice(0, dockItems.length - 1).map((item) => {
              const Icon = item.icon
              const isHovered = hoveredItem === item.id
              const isActive = item.isActive
              const isOpen = item.isOpen
              const isMinimized = item.isMinimized
              
              return (
                <div
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => handleItemHover(item.id)}
                  onMouseLeave={() => handleItemHover(null)}
                  onClick={() => handleItemClick(item.id)}
                >
                                                   <div
                    className={`relative p-2 rounded cursor-pointer transition-all duration-200`}
                    style={{
                      background: isActive || isHovered
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'transparent',
                      backdropFilter: isActive || isHovered
                        ? 'blur(20px) saturate(150%)'
                        : 'none',
                      WebkitBackdropFilter: isActive || isHovered
                        ? 'blur(20px) saturate(150%)'
                        : 'none'
                    }}
                  >
                    {/* Icon */}
                    <div className={`relative z-10 text-white transition-opacity duration-200 ${isMinimized ? 'opacity-60' : 'opacity-100'}`}>
                      <Icon 
                        size={20} 
                        strokeWidth={1.5}
                      />
                    </div>
                    
                                       {/* Active Indicator - Left Edge */}
                     <div 
                       className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-0.75 rounded-full transition-all duration-200 ease-out ${
                         isActive ? 'h-4 opacity-100' : 'h-0 opacity-0'
                       }`}
                       style={{
                         background: 'linear-gradient(180deg, #60a5fa, #3b82f6)',
                         boxShadow: isActive ? '0 0 4px rgba(59, 130, 246, 0.6)' : 'none'
                       }}
                     />
                     
                     {/* Opened Indicator - Left Edge */}
                     <div 
                       className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-0.75 rounded-full transition-all duration-200 ease-out ${
                         isOpen && !isActive ? 'h-1 opacity-100' : 'h-0 opacity-0'
                       }`}
                       style={{
                         background: isMinimized ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.4)',
                         boxShadow: isOpen && !isActive ? '0 0 2px rgba(255, 255, 255, 0.2)' : 'none'
                       }}
                     />
                  </div>
                  
                  {/* Tooltip */}
                  {isHovered && (
                    <div 
                      className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 text-sm rounded-lg whitespace-nowrap opacity-0 animate-in fade-in duration-200"
                      style={{
                        background: 'rgba(0, 0, 0, 0.9)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        color: 'white',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      {item.label}
                      <div className="absolute top-1/2 right-full transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent" style={{ borderRightColor: 'rgba(0, 0, 0, 0.9)' }}></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          
          {/* Help Item at Bottom */}
          <div className="flex flex-col items-center gap-1">
            {dockItems.slice(dockItems.length - 1).map((item) => {
              const Icon = item.icon
              const isHovered = hoveredItem === item.id
              const isActive = item.isActive
              const isOpen = item.isOpen
              const isMinimized = item.isMinimized
              
              return (
                <div
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => handleItemHover(item.id)}
                  onMouseLeave={() => handleItemHover(null)}
                  onClick={() => handleItemClick(item.id)}
                >
                  <div
                    className={`relative p-2 rounded cursor-pointer transition-all duration-200`}
                    style={{
                      background: isActive || isHovered
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'transparent',
                      backdropFilter: isActive || isHovered
                        ? 'blur(20px) saturate(150%)'
                        : 'none',
                      WebkitBackdropFilter: isActive || isHovered
                        ? 'blur(20px) saturate(150%)'
                        : 'none'
                    }}
                  >
                    {/* Icon */}
                    <div className={`relative z-10 text-white transition-opacity duration-200 ${isMinimized ? 'opacity-60' : 'opacity-100'}`}>
                      <Icon 
                        size={20} 
                        strokeWidth={1.5}
                      />
                    </div>
                    
                    {/* Active Indicator - Left Edge */}
                    <div 
                      className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-0.75 rounded-full transition-all duration-200 ease-out ${
                        isActive ? 'h-4 opacity-100' : 'h-0 opacity-0'
                      }`}
                      style={{
                        background: 'linear-gradient(180deg, #60a5fa, #3b82f6)',
                        boxShadow: isActive ? '0 0 4px rgba(59, 130, 246, 0.6)' : 'none'
                      }}
                    />
                    
                    {/* Opened Indicator - Left Edge */}
                    <div 
                      className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-0.75 rounded-full transition-all duration-200 ease-out ${
                        isOpen && !isActive ? 'h-1 opacity-100' : 'h-0 opacity-0'
                      }`}
                      style={{
                        background: isMinimized ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.4)',
                        boxShadow: isOpen && !isActive ? '0 0 2px rgba(255, 255, 255, 0.2)' : 'none'
                      }}
                    />
                  </div>
                  
                  {/* Tooltip */}
                  {isHovered && (
                    <div 
                      className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 text-sm rounded-lg whitespace-nowrap opacity-0 animate-in fade-in duration-200"
                      style={{
                        background: 'rgba(0, 0, 0, 0.9)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        color: 'white',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      {item.label}
                      <div className="absolute top-1/2 right-full transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent" style={{ borderRightColor: 'rgba(0, 0, 0, 0.9)' }}></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 