import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { FirecrawlService } from '@/utils/FirecrawlService';
import { useToast } from '@/hooks/use-toast';
import { Key, CheckCircle, AlertCircle } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeyValidated: () => void;
}

export const ApiKeyInput = ({ onApiKeyValidated }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedKey = FirecrawlService.getApiKey();
    if (savedKey) {
      setApiKey(savedKey);
      setIsValid(true);
    }
  }, []);

  const handleValidateKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Firecrawl API key",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    
    try {
      const isValidKey = await FirecrawlService.testApiKey(apiKey);
      
      if (isValidKey) {
        FirecrawlService.saveApiKey(apiKey);
        setIsValid(true);
        toast({
          title: "Success",
          description: "API key validated successfully!",
        });
        onApiKeyValidated();
      } else {
        toast({
          title: "Invalid API Key",
          description: "Please check your Firecrawl API key and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Failed to validate API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  if (isValid) {
    return (
      <Card className="shadow-soft border-0 bg-secondary/50">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-secondary mr-2" />
            <span className="text-sm font-medium">Firecrawl API Connected</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsValid(false);
              setApiKey('');
              localStorage.removeItem('firecrawl_api_key');
            }}
          >
            Disconnect
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-soft border-0 bg-gradient-subtle">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Key className="w-5 h-5 text-primary mr-2" />
          <h3 className="font-semibold">Connect Firecrawl API</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          To view real iXBRL documents, please provide your Firecrawl API key.
          <br />
          <a 
            href="https://firecrawl.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Get your free API key here →
          </a>
        </p>

        <div className="space-y-3">
          <Input
            type="password"
            placeholder="Enter your Firecrawl API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="font-mono text-sm"
          />
          
          <Button
            onClick={handleValidateKey}
            disabled={isValidating || !apiKey.trim()}
            className="w-full"
            variant="default"
          >
            {isValidating ? 'Validating...' : 'Connect API'}
          </Button>
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-4 h-4 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Your API key is stored locally and only used to fetch iXBRL documents for demonstration purposes.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};