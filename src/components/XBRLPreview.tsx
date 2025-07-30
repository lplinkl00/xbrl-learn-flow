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
              <div className="mb-4">
                <h4 className="font-semibold text-primary mb-2">Sample iXBRL Report - TechCorp Inc.</h4>
                <p className="text-sm text-muted-foreground">Interactive XBRL document showing how financial data is tagged</p>
              </div>
              <div className="bg-white text-black rounded-lg border shadow-soft p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="text-xl font-bold mb-2">TECHCORP INC.</h3>
                    <h4 className="text-lg font-semibold">CONSOLIDATED BALANCE SHEETS</h4>
                    <p className="text-sm text-gray-600">(In thousands, except share and per share data)</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4 font-semibold border-b pb-2">
                      <div></div>
                      <div className="text-center">December 31, 2023</div>
                      <div className="text-center">December 31, 2022</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-semibold">ASSETS</div>
                      <div className="grid grid-cols-3 gap-4 pl-4">
                        <div>Cash and cash equivalents</div>
                        <div className="text-center">
                          <span 
                            className="border-b-2 border-dashed border-blue-500 cursor-pointer hover:bg-blue-50 px-1"
                            title="XBRL Tag: us-gaap:CashAndCashEquivalentsAtCarryingValue"
                          >
                            $12,450
                          </span>
                        </div>
                        <div className="text-center">$8,200</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 pl-4">
                        <div>Accounts receivable, net</div>
                        <div className="text-center">
                          <span 
                            className="border-b-2 border-dashed border-green-500 cursor-pointer hover:bg-green-50 px-1"
                            title="XBRL Tag: us-gaap:AccountsReceivableNetCurrent"
                          >
                            $5,320
                          </span>
                        </div>
                        <div className="text-center">$4,100</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 pl-4">
                        <div>Total current assets</div>
                        <div className="text-center">
                          <span 
                            className="border-b-2 border-dashed border-purple-500 cursor-pointer hover:bg-purple-50 px-1 font-semibold"
                            title="XBRL Tag: us-gaap:AssetsCurrent"
                          >
                            $17,770
                          </span>
                        </div>
                        <div className="text-center font-semibold">$12,300</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 font-bold border-t pt-2">
                        <div>Total assets</div>
                        <div className="text-center">
                          <span 
                            className="border-b-2 border-dashed border-red-500 cursor-pointer hover:bg-red-50 px-1"
                            title="XBRL Tag: us-gaap:Assets"
                          >
                            $45,620
                          </span>
                        </div>
                        <div className="text-center">$38,950</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>This is a sample iXBRL document. The dashed underlines indicate XBRL-tagged financial data. Hover over the numbers to see the XBRL tags!</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Cash: us-gaap:CashAndCashEquivalentsAtCarryingValue</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Receivables: us-gaap:AccountsReceivableNetCurrent</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Current Assets: us-gaap:AssetsCurrent</span>
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