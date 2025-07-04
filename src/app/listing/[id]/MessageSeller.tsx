'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/lib/actions";
import { LoadingButton } from "@/components/ui/loading-spinner";

interface MessageSellerProps {
  listingId: string;
  sellerEmail: string;
}

export default function MessageSeller({ listingId, sellerEmail }: MessageSellerProps) {
  const [buyerEmail, setBuyerEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSending(true);

    try {
      // Validate inputs
      if (!buyerEmail.trim() || !message.trim()) {
        throw new Error('Please fill in all fields');
      }

      // Send message to seller via Supabase
      const result = await sendMessage({
        listing_id: listingId,
        buyer_email: buyerEmail,
        seller_email: sellerEmail,
        message: message
      });

      if (result) {
        setIsSuccess(true);
        setMessage('');
        setBuyerEmail('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Send seller a message</h2>
      
      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p>Message sent successfully! The seller will be notified via email.</p>
          </div>
          <Button 
            variant="outline" 
            className="mt-3"
            onClick={() => setIsSuccess(false)}
          >
            Send another message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4 flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-red-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="buyer-email" className="block text-sm font-medium mb-1">
              Your email
            </label>
            <Input
              id="buyer-email"
              type="email"
              placeholder="your-email@example.com"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              required
              className="mb-4"
              disabled={isSending}
            />
            
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <Textarea 
              id="message"
              placeholder="I'm interested in this item. Is it still available?" 
              className="min-h-[120px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={isSending}
            />
          </div>
          
          <LoadingButton 
            loading={isSending}
            loadingText="Sending Message..."
            className="w-full h-10 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Message
          </LoadingButton>
        </form>
      )}
    </div>
  );
} 