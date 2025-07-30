
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Mail } from 'lucide-react';
import React, { useState } from 'react';

export const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbytBHPOSJdkXyGuKVjgA9LVyYLzoTUzcfTqISpuhCnVC5A9S47v4Nv3dYEdZA6P6w9P/exec';
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError(null); // Clear previous errors
    if (!email) {
      setError('Please enter your email address.');
      return;
    }


  setIsLoading(true);

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        // mode: 'no-cors' is typically needed for Google Apps Script
        // when sending a simple POST request from a different origin.
        // It means the browser won't enforce CORS policy for the request,
        // but you also won't be able to read the response body directly.
        // If you need to read the response from Apps Script for detailed feedback,
        // you would need to configure CORS headers in your Apps Script itself.
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }), // Send data as JSON, matching your Apps Script's expectation
      });

      // Because of 'no-cors' mode, 'response.ok' or 'response.json()' will not work as expected.
      // We assume success if the fetch operation itself completes without a network error.
      // For more robust error handling and feedback from the Apps Script,
      // you would need to enable CORS on the Apps Script side, which involves
      // setting 'Access-Control-Allow-Origin' headers in your doGet/doPost functions.
      // For a simple waitlist, this approach is often sufficient.

      setIsSubmitted(true);
      setEmail(''); // Clear the email field on success
      console.log('Waitlist submission initiated. Check Google Sheet for data.');

    } catch (err) {
        console.error('Error submitting to waitlist:', err);
        setError('Failed to join waitlist. Please try again.');
    } finally {
        setIsLoading(false);
    }


  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-medium bg-gradient-subtle border-0">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">You're on the list!</h3>
          <p className="text-muted-foreground">
            We'll notify you when XBRL Master launches. Get ready to master financial reporting!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-medium bg-gradient-subtle border-0">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <Mail className="w-12 h-12 text-primary mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">Join the Waitlist</h3>
          <p className="text-muted-foreground">
            Be the first to experience interactive XBRL learning
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-0 bg-background/50 focus:bg-background shadow-soft"
            />
          </div>
          
          <Button 
            type="submit" 
            variant="cta" 
            size="lg" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Joining...' : 'Join Waitlist'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            No spam, ever. Unsubscribe at any time.
          </p>
        </form>
      </CardContent>
    </Card>
  );
  };
};