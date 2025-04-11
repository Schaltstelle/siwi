import * as React from 'react'

interface LinkedInProps {
  className?: string
}

const LinkedIn: React.FC<LinkedInProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24">
    <rect width="24" height="24" fill="#0077B5" rx="4" />
    <path
      fill="#FFFFFF"
      d="M6.94 9H4V19H6.94V9ZM5.47 7.65C6.39 7.65 7.1 6.94 7.1 6.05C7.1 5.17 6.39 4.45 5.47 4.45C4.55 4.45 3.84 5.17 3.84 6.05C3.84 6.94 4.55 7.65 5.47 7.65ZM9 19H11.94V13.88C11.94 12.62 12.5 11.89 13.53 11.89C14.5 11.89 14.94 12.54 14.94 13.75V19H17.94V13.5C17.94 11.1 16.55 10 14.72 10C13.06 10 12.38 10.92 12 11.5V10.25H9V19Z"
    />
  </svg>
)

export default LinkedIn
