import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, BarChart3, ArrowRight, FileText, ExternalLink, Loader2 } from 'lucide-react';
import { FirecrawlService } from '@/utils/FirecrawlService';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { useToast } from '@/hooks/use-toast';
import xbrlPreviewImage from '@/assets/xbrl-preview.jpg';

export const XBRLPreview = () => {
  const [activeView, setActiveView] = useState<'code' | 'visual'>('code');
  const [iXBRLData, setIXBRLData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const apiKey = FirecrawlService.getApiKey();
    setHasApiKey(!!apiKey);
  }, []);

  const sampleXBRL = `<xbrl>
  <context id="2023">
    <entity>
      <identifier>123456789</identifier>
    </entity>
    <period>
      <startDate>2023-01-01</startDate>
      <endDate>2023-12-31</endDate>
    </period>
  </context>
  
  <us-gaap:Revenue contextRef="2023" 
    unitRef="USD" decimals="-3">
    1,250,000
  </us-gaap:Revenue>
</xbrl>`;

  // Popular iXBRL document URLs for demonstration
  const sampleDocuments = [
    {
      name: "Apple Inc. 10-K",
      url: "https://www.sec.gov/Archives/edgar/data/320193/000032019323000077/aapl-20230930.htm",
      description: "Apple's latest annual report in iXBRL format"
    },
    {
      name: "Microsoft Corp 10-Q",
      url: "https://www.sec.gov/Archives/edgar/data/789019/000156459023047021/msft-10q_20230930.htm", 
      description: "Microsoft's quarterly report"
    },
    {
      name: "Tesla Inc. 10-K",
      url: "https://www.sec.gov/Archives/edgar/data/1318605/000095017023001409/tsla-20221231.htm",
      description: "Tesla's annual report with embedded XBRL data"
    }
  ];

  const fetchIXBRLDocument = async (url: string, name: string) => {
    if (!hasApiKey) {
      toast({
        title: "API Key Required",
        description: "Please connect your Firecrawl API key first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await FirecrawlService.scrapeIXBRLDocument(url);
      
      if (result.success && result.data) {
        setIXBRLData({
          ...result.data,
          documentName: name,
          sourceUrl: url
        });
        setActiveView('visual');
        toast({
          title: "Document Loaded",
          description: `Successfully loaded ${name}`,
        });
      } else {
        toast({
          title: "Failed to Load",
          description: result.error || "Could not fetch the iXBRL document",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch iXBRL document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeyValidated = () => {
    setHasApiKey(true);
  };

  return (
    <div className="bg-gradient-subtle rounded-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Interactive XBRL Learning</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform complex financial reporting standards into easy-to-understand, 
          interactive lessons. See how real iXBRL documents work!
        </p>
      </div>

      {!hasApiKey && (
        <div className="mb-8">
          <ApiKeyInput onApiKeyValidated={handleApiKeyValidated} />
        </div>
      )}

      <div className="flex justify-center mb-6">
        <div className="bg-background rounded-lg p-1 shadow-soft">
          <Button
            variant={activeView === 'code' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('code')}
            className="rounded-md"
          >
            <Code className="w-4 h-4 mr-2" />
            XBRL Code
          </Button>
          <Button
            variant={activeView === 'visual' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveView('visual')}
            className="rounded-md"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            {iXBRLData ? 'Real iXBRL Document' : 'Visual Report'}
          </Button>
        </div>
      </div>

      <Card className="shadow-medium border-0 overflow-hidden">
        <CardContent className="p-0">
          {activeView === 'code' ? (
            <div className="bg-slate-950 text-green-400 p-6 font-mono text-sm">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 mr-2" />
                <span className="text-slate-300">company-financials.xbrl</span>
              </div>
              <pre className="whitespace-pre-wrap text-xs leading-relaxed">
                {sampleXBRL}
              </pre>
            </div>
          ) : (
            <div className="p-6">
              {iXBRLData ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{iXBRLData.documentName}</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(iXBRLData.sourceUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Source
                    </Button>
                  </div>
                  
                  <div className="bg-background rounded-lg border max-h-96 overflow-auto">
                    <iframe
                      srcDoc={iXBRLData.html}
                      className="w-full h-96 border-0"
                      title="iXBRL Document"
                      sandbox="allow-same-origin"
                    />
                  </div>
                  
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Document Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div><strong>Title:</strong> {iXBRLData.metadata?.title}</div>
                      <div><strong>Language:</strong> {iXBRLData.metadata?.language || 'en'}</div>
                      <div className="col-span-full"><strong>Description:</strong> {iXBRLData.metadata?.description}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <img 
                    src={xbrlPreviewImage} 
                    alt="XBRL Data Visualization Dashboard" 
                    className="w-full h-64 object-cover rounded-lg shadow-soft mb-6"
                  />
                  
                  {hasApiKey ? (
                    <div>
                      <h4 className="font-semibold mb-4">Load Real iXBRL Documents</h4>
                      <div className="grid gap-3">
                        {sampleDocuments.map((doc, index) => (
                          <Card key={index} className="border border-border/50 hover:shadow-soft transition-all">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h5 className="font-medium">{doc.name}</h5>
                                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => fetchIXBRLDocument(doc.url, doc.name)}
                                  disabled={isLoading}
                                >
                                  {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    'Load'
                                  )}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-primary/10 p-4 rounded-lg">
                        <h4 className="font-semibold text-primary">Revenue</h4>
                        <p className="text-2xl font-bold">$1,250,000</p>
                      </div>
                      <div className="bg-gradient-primary/10 p-4 rounded-lg">
                        <h4 className="font-semibold text-primary">Period</h4>
                        <p className="text-sm">2023-01-01 to 2023-12-31</p>
                      </div>
                      <div className="bg-gradient-primary/10 p-4 rounded-lg">
                        <h4 className="font-semibold text-primary">Entity</h4>
                        <p className="text-sm">ID: 123456789</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center mt-6">
        <p className="text-muted-foreground mb-4">
          {iXBRLData 
            ? "You're viewing a real iXBRL document! The full tool includes interactive tutorials and guided learning."
            : "This is just a preview! The full tool includes interactive tutorials, real-time validation, and step-by-step guidance."
          }
        </p>
        <Button variant="hero" size="lg">
          Learn More
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};