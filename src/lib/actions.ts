'use server';

import { revalidatePath } from 'next/cache';
import { supabase, ListingType, MessageType } from './supabase';

// Maximum file size for image uploads (8MB)
const MAX_FILE_SIZE = 8 * 1024 * 1024;

// Function to fetch all listings or filter by category
export async function getListings(category?: string) {
  try {
    let query = supabase.from('listings').select('*').order('created_at', { ascending: false });
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching listings:', error);
      return [];
    }
    
    return data as ListingType[];
  } catch (error) {
    console.error('Error in getListings:', error);
    return [];
  }
}

// Function to search listings
export async function searchListings(searchTerm: string) {
  try {
    if (!searchTerm || searchTerm.trim() === "") {
      return [];
    }

    const sanitizedSearch = searchTerm.trim().toLowerCase();
    
    // First, try to find exact matches in titles
    const { data: exactTitleMatches, error: exactError } = await supabase
      .from('listings')
      .select('*')
      .ilike('title', `%${sanitizedSearch}%`)
      .order('created_at', { ascending: false });
    
    if (exactError) {
      console.error('Error searching for exact title matches:', exactError);
    }
    
    // Then find matches in descriptions and other fields
    const { data: otherMatches, error: otherError } = await supabase
      .from('listings')
      .select('*')
      .not('title', 'ilike', `%${sanitizedSearch}%`) // Exclude title matches we already have
      .or(`description.ilike.%${sanitizedSearch}%,category.ilike.%${sanitizedSearch}%`)
      .order('created_at', { ascending: false });
    
    if (otherError) {
      console.error('Error searching for other matches:', otherError);
    }
    
    // Combine results, with title matches first
    const allResults = [
      ...(exactTitleMatches || []), 
      ...(otherMatches || [])
    ];
    
    return allResults as ListingType[];
  } catch (error) {
    console.error('Error in searchListings:', error);
    return [];
  }
}

// Function to get a single listing by ID
export async function getListing(id: string) {
  try {
    if (!id) {
      console.error('Error fetching listing: Missing ID');
      return null;
    }
    
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching listing:', error);
      return null;
    }
    
    return data as ListingType;
  } catch (error) {
    console.error('Error in getListing:', error);
    return null;
  }
}

// Function to create a new listing
export async function createListing(listing: ListingType) {
  try {
    const { data, error } = await supabase
      .from('listings')
      .insert([listing])
      .select();
    
    if (error) {
      console.error('Error creating listing:', error);
      return null;
    }
    
    revalidatePath('/');
    return data[0] as ListingType;
  } catch (error) {
    console.error('Error in createListing:', error);
    return null;
  }
}

// Function to send a message to a seller
export async function sendMessage(message: MessageType) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select();
    
    if (error) {
      console.error('Error sending message:', error);
      return null;
    }
    
    // In a real application, you would trigger an email to the seller here
    // This would typically use a serverless function or email service
    
    return data[0] as MessageType;
  } catch (error) {
    console.error('Error in sendMessage:', error);
    return null;
  }
}

// Function to upload an image to Supabase storage
export async function uploadImage(file: File) {
  try {
    if (!file) {
      throw new Error('No file provided for upload');
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`Image size exceeds the maximum allowed size of ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
    }
    
    // Check file type
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
      throw new Error('Only JPEG, PNG, GIF and WebP images are allowed');
    }
    
    // Create a unique file name to prevent collisions
    const fileExt = file.name.split('.').pop() || 'jpg';
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 10);
    const fileName = `${timestamp}-${randomString}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Image compression could be added here for very large images
    
    console.log(`Uploading file ${fileName} (${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
    
    const { data, error } = await supabase
      .storage
      .from('listing-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      if (error.message?.includes('size limit') || error.message?.includes('413')) {
        throw new Error(`File size too large. Please upload an image smaller than ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
      }
      console.error('Error uploading image:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
    
    // Make sure data exists before trying to get public URL
    if (!data?.path) {
      throw new Error('No path returned from upload');
    }
    
    const { data: urlData } = supabase
      .storage
      .from('listing-images')
      .getPublicUrl(filePath);
    
    if (!urlData?.publicUrl) {
      throw new Error('Could not get public URL for uploaded image');
    }
    
    return urlData.publicUrl;
  } catch (error: any) {
    console.error('Error in uploadImage:', error);
    throw error;
  }
} 