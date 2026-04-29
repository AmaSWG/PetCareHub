/**
 * Robust helper to build full image URLs from relative paths.
 * Supports both backend uploads and product images.
 */
export const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    
    let normalizedPath = path.replace(/^[\\\/]+/, '').replace(/\\/g, '/');
    
    // If it's a product image from DataInitializer, it might already start with api/
    // If it's a pet upload, it might already start with uploads/
    // Otherwise, assume it's in uploads/
    if (!normalizedPath.startsWith('uploads/') && !normalizedPath.startsWith('api/')) {
        normalizedPath = `uploads/${normalizedPath}`;
    }
    
    const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
    
    // Ensure we don't double up on slashes
    return BASE_URL 
        ? `${BASE_URL.replace(/\/+$/, '')}/${normalizedPath}` 
        : `/${normalizedPath}`;
};
