import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, BarChart3, ArrowRight, FileText } from 'lucide-react';
import xbrlPreviewImage from '@/assets/xbrl-preview.jpg';

export const XBRLPreview = () => {
  const [activeView, setActiveView] = useState<'code' | 'visual'>('code');

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

  return (
    <div className="bg-gradient-subtle rounded-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Interactive XBRL Learning</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform complex financial reporting standards into easy-to-understand, 
          interactive lessons. See how XBRL data comes to life!
        </p>
      </div>

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
            Visual Report
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
              <img 
                src={xbrlPreviewImage} 
                alt="XBRL Data Visualization Dashboard" 
                className="w-full h-64 object-cover rounded-lg shadow-soft"
              />
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
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center mt-6">
        <p className="text-muted-foreground mb-4">
          This is just a preview! The full tool includes interactive tutorials, 
          real-time validation, and step-by-step guidance.
        </p>
        <Button variant="hero" size="lg">
          Learn More
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};