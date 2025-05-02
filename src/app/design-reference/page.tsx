import React from 'react';
import { DesignReference } from '@/components/DesignReference';

export default function DesignReferencePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Design Reference Examples</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How to Share Your Design</h2>
        <div className="bg-gray-100 p-6 rounded-lg">
          <p className="mb-4">You can share your design ideas for the Gazorpazorp theme in several ways:</p>
          
          <h3 className="text-xl font-medium mb-2">Option 1: Upload Image Files</h3>
          <p className="mb-4">
            You can upload image files (PNG, JPG, SVG) to the <code className="bg-gray-200 px-2 py-1 rounded">/public/backgrounds/gazorpazorp</code> directory.
            These images will be accessible at <code className="bg-gray-200 px-2 py-1 rounded">/backgrounds/gazorpazorp/your-image.png</code>.
          </p>
          
          <h3 className="text-xl font-medium mb-2">Option 2: Share Figma Design</h3>
          <p className="mb-4">
            Create your design in Figma and share the link. Make sure your Figma design is set to "Anyone with the link can view".
            The link should look like: <code className="bg-gray-200 px-2 py-1 rounded">https://www.figma.com/file/abcdef123456/Design</code>
          </p>
          
          <h3 className="text-xl font-medium mb-2">Option 3: Share Canva Design</h3>
          <p className="mb-4">
            Create your design in Canva and share the link. Make sure your Canva design is set to "Public".
            The link should look like: <code className="bg-gray-200 px-2 py-1 rounded">https://www.canva.com/design/ABC123/view</code>
          </p>
          
          <h3 className="text-xl font-medium mb-2">Option 4: Share PDF</h3>
          <p>
            You can also share a PDF file with your design. Upload it to the <code className="bg-gray-200 px-2 py-1 rounded">/public/backgrounds/gazorpazorp</code> directory
            or provide a link to an externally hosted PDF.
          </p>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Example: Local Image</h2>
        <p className="mb-4">This is how a local image would be displayed:</p>
        <div className="border p-4 rounded-lg">
          {/* Replace with an actual image path when available */}
          <p className="text-gray-500 italic mb-2">Example code (uncomment when you have an actual image):</p>
          <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
            {`<DesignReference 
  type="image" 
  src="/backgrounds/gazorpazorp/example.png" 
  alt="Gazorpazorp Theme Design" 
/>`}
          </pre>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Example: Figma Embed</h2>
        <p className="mb-4">This is how a Figma design would be displayed:</p>
        <div className="border p-4 rounded-lg">
          <p className="text-gray-500 italic mb-2">Example code:</p>
          <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
            {`<DesignReference 
  type="figma" 
  src="https://www.figma.com/file/example/your-design" 
  width={800} 
  height={600} 
/>`}
          </pre>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Example: Canva Embed</h2>
        <p className="mb-4">This is how a Canva design would be displayed:</p>
        <div className="border p-4 rounded-lg">
          <p className="text-gray-500 italic mb-2">Example code:</p>
          <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
            {`<DesignReference 
  type="canva" 
  src="https://www.canva.com/design/ABC123/view" 
  width={800} 
  height={600} 
/>`}
          </pre>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <p>
          Once you've shared your design, we can implement it in the Gazorpazorp theme. 
          The design can influence colors, layout, typography, and other visual elements of the theme.
        </p>
      </section>
    </div>
  );
}