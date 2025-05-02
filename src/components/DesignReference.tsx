import React from 'react';
import Image from 'next/image';

type DesignReferenceProps = {
  type: 'image' | 'pdf' | 'figma' | 'canva';
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

/**
 * Component for displaying design references from various sources
 * Supports images, PDFs, Figma and Canva designs
 */
export const DesignReference: React.FC<DesignReferenceProps> = ({
  type,
  src,
  alt = 'Design Reference',
  width = 800,
  height = 600,
}) => {
  // Check if the source is a URL or a local file
  const isExternalUrl = src.startsWith('http://') || src.startsWith('https://');
  const basePath = '/siwi';
  const localSrc = isExternalUrl ? src : `${basePath}${src}`;

  // Render different content based on the type
  switch (type) {
    case 'image':
      return (
        <div className="design-reference-container">
          {isExternalUrl ? (
            // For external images, use a regular img tag
            <img 
              src={localSrc} 
              alt={alt} 
              style={{ maxWidth: '100%', height: 'auto' }} 
            />
          ) : (
            // For local images, use Next.js Image component
            <Image 
              src={localSrc} 
              alt={alt} 
              width={width} 
              height={height} 
              className="max-w-full h-auto"
            />
          )}
        </div>
      );
    
    case 'pdf':
      return (
        <div className="design-reference-container">
          <iframe 
            src={localSrc} 
            width={width} 
            height={height} 
            style={{ border: 'none' }}
            title={alt}
          />
        </div>
      );
    
    case 'figma':
      // Ensure the Figma URL is in the correct embed format
      const figmaEmbedUrl = src.includes('embed') 
        ? src 
        : `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(src)}`;
      
      return (
        <div className="design-reference-container">
          <iframe 
            src={figmaEmbedUrl} 
            width={width} 
            height={height} 
            style={{ border: 'none' }}
            allowFullScreen
            title={alt}
          />
        </div>
      );
    
    case 'canva':
      // Ensure the Canva URL is in the correct embed format
      const canvaEmbedUrl = src.includes('design/view') 
        ? src.replace('design/view', 'design/embed')
        : src;
      
      return (
        <div className="design-reference-container">
          <iframe 
            src={canvaEmbedUrl} 
            width={width} 
            height={height} 
            style={{ border: 'none' }}
            allowFullScreen
            title={alt}
          />
        </div>
      );
    
    default:
      return <div>Unsupported design reference type</div>;
  }
};