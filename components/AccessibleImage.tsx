import Image, { ImageProps } from 'next/image';

interface AccessibleImageProps extends Omit<ImageProps, 'alt'> {
  alt?: string;
  decorative?: boolean;
}

/**
 * AccessibleImage Component
 * Ensures all images have proper alt text for accessibility
 * If decorative prop is true, sets empty alt text (for purely decorative images)
 */
export default function AccessibleImage({
  alt,
  decorative = false,
  src,
  ...props
}: AccessibleImageProps) {
  // If decorative, use empty alt text (screen readers will skip it)
  if (decorative) {
    return <Image src={src} alt="" {...props} />;
  }

  // If alt text is not provided, generate a descriptive one based on src
  const altText = alt || generateAltFromSrc(src);

  return <Image src={src} alt={altText} {...props} />;
}

/**
 * Generate alt text from image source if not provided
 * This is a fallback - always prefer explicit alt text
 */
function generateAltFromSrc(src: string | any): string {
  if (typeof src !== 'string') {
    return 'Image';
  }

  // Extract filename without extension
  const filename = src.split('/').pop()?.split('.')[0] || 'image';
  
  // Convert kebab-case or snake_case to readable text
  return filename
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
