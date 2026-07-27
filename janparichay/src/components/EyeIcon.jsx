import React, { useId } from 'react';

export function EyeIcon({ show = false, size = '1.1em', className = '', onClick, ...props }) {
  const maskId = useId();

  if(show){
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        className={`custom-eye-icon ${className}`}
        style={{ display: 'inline-block', verticalAlign: 'middle', cursor: onClick ? 'pointer' : 'inherit' }}
        onClick={onClick}
        {...props}
      >
        <path
          d="M 2.5 12 C 5 6.8 8.8 4.8 12 4.8 C 15.2 4.8 19 6.8 21.5 12 C 19 17.2 15.2 19.2 12 19.2 C 8.8 19.2 5 17.2 2.5 12 Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="4.3" fill="currentColor" stroke="none" />
        <path
          d="M 9.5 10 A 2.8 2.8 0 0 1 12 8.5"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      className={`custom-eye-icon custom-eye-slash-icon ${className}`}
      style={{ display: 'inline-block', verticalAlign: 'middle', cursor: onClick ? 'pointer' : 'inherit' }}
      onClick={onClick}
      {...props}
    >
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <line x1="16.5" y1="2.5" x2="7.5" y2="21.5" stroke="black" strokeWidth="4.2" strokeLinecap="round" />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        <path
          d="M 2.5 12 C 5 6.8 8.8 4.8 12 4.8 C 15.2 4.8 19 6.8 21.5 12 C 19 17.2 15.2 19.2 12 19.2 C 8.8 19.2 5 17.2 2.5 12 Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="4.3" fill="currentColor" stroke="none" />
        <path
          d="M 9.5 10 A 2.8 2.8 0 0 1 12 8.5"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <line x1="16.5" y1="2.5" x2="7.5" y2="21.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export default EyeIcon;
