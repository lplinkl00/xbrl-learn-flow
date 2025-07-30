import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Code, BarChart3, ArrowRight, FileText, Info, Calendar, Building, DollarSign } from 'lucide-react';
import xbrlPreviewImage from '@/assets/xbrl-preview.jpg';

interface XBRLFact {
  id: string;
  label: string;
  value: string;
  tag: string;
  context: string;
  period: string;
  entity: string;
  units: string;
  definition: string;
  calculation?: string;
  relatedFacts?: string[];
  color: string;
}

export const XBRLPreview = () => {
  const [activeView, setActiveView] = useState<'code' | 'visual'>('code');
  const [selectedFact, setSelectedFact] = useState<XBRLFact | null>(null);
  
  const xbrlFacts: XBRLFact[] = [
    {
      id: 'cash',
      label: 'Cash and cash equivalents',
      value: '$12,450',
      tag: 'us-gaap:CashAndCashEquivalentsAtCarryingValue',
      context: 'As of December 31, 2023',
      period: '2023-12-31',
      entity: 'TECHCORP INC. (CIK: 0001234567)',
      units: 'USD (thousands)',
      definition: 'Amount of currency on hand as well as demand deposits with banks or financial institutions. Also includes short-term, highly liquid investments that are readily convertible to known amounts of cash.',
      calculation: 'Sum of: Cash on Hand + Demand Deposits + Short-term Investments',
      relatedFacts: ['us-gaap:CashOnHand', 'us-gaap:DepositsWithBanks', 'us-gaap:ShortTermInvestments'],
      color: 'blue'
    },
    {
      id: 'receivables',
      label: 'Accounts receivable, net',
      value: '$5,320',
      tag: 'us-gaap:AccountsReceivableNetCurrent',
      context: 'As of December 31, 2023',
      period: '2023-12-31',
      entity: 'TECHCORP INC. (CIK: 0001234567)',
      units: 'USD (thousands)',
      definition: 'Amount of receivables from customers, net of allowance for doubtful accounts. Represents amounts owed to the entity by customers for goods sold or services provided in the normal course of business.',
      calculation: 'Gross Accounts Receivable - Allowance for Doubtful Accounts',
      relatedFacts: ['us-gaap:AccountsReceivableGrossCurrent', 'us-gaap:AllowanceForDoubtfulAccountsReceivableCurrent'],
      color: 'green'
    },
    {
      id: 'current-assets',
      label: 'Total current assets',
      value: '$17,770',
      tag: 'us-gaap:AssetsCurrent',
      context: 'As of December 31, 2023',
      period: '2023-12-31',
      entity: 'TECHCORP INC. (CIK: 0001234567)',
      units: 'USD (thousands)',
      definition: 'Sum of the carrying amounts of all assets that are expected to be realized in cash, sold, or consumed within one year or the operating cycle, if longer.',
      calculation: 'Cash + Accounts Receivable + Inventory + Prepaid Expenses + Other Current Assets',
      relatedFacts: ['us-gaap:CashAndCashEquivalentsAtCarryingValue', 'us-gaap:AccountsReceivableNetCurrent', 'us-gaap:InventoryNet'],
      color: 'purple'
    },
    {
      id: 'total-assets',
      label: 'Total assets',
      value: '$45,620',
      tag: 'us-gaap:Assets',
      context: 'As of December 31, 2023',
      period: '2023-12-31',
      entity: 'TECHCORP INC. (CIK: 0001234567)',
      units: 'USD (thousands)',
      definition: 'Sum of the carrying amounts of all assets recognized. Assets are probable future economic benefits obtained or controlled by an entity as a result of past transactions or events.',
      calculation: 'Current Assets + Non-Current Assets',
      relatedFacts: ['us-gaap:AssetsCurrent', 'us-gaap:AssetsNoncurrent'],
      color: 'red'
    }
  ];

  const XBRLFactComponent = ({ fact, value, comparativeValue }: { fact: XBRLFact, value: string, comparativeValue?: string }) => (
    <span 
      className={`border-b-2 border-dashed border-${fact.color}-500 cursor-pointer hover:bg-${fact.color}-50 px-1 transition-colors duration-200`}
      onClick={() => setSelectedFact(fact)}
      title={`Click for details: ${fact.tag}`}
    >
      {value}
    </span>
  );

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
                          <XBRLFactComponent fact={xbrlFacts[0]} value="$12,450" />
                        </div>
                        <div className="text-center">$8,200</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 pl-4">
                        <div>Accounts receivable, net</div>
                        <div className="text-center">
                          <XBRLFactComponent fact={xbrlFacts[1]} value="$5,320" />
                        </div>
                        <div className="text-center">$4,100</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 pl-4">
                        <div>Total current assets</div>
                        <div className="text-center font-semibold">
                          <XBRLFactComponent fact={xbrlFacts[2]} value="$17,770" />
                        </div>
                        <div className="text-center font-semibold">$12,300</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 font-bold border-t pt-2">
                        <div>Total assets</div>
                        <div className="text-center">
                          <XBRLFactComponent fact={xbrlFacts[3]} value="$45,620" />
                        </div>
                        <div className="text-center">$38,950</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>This is a sample iXBRL document. The dashed underlines indicate XBRL-tagged financial data. <strong>Click on the numbers</strong> to see detailed XBRL information!</p>
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

      {/* XBRL Fact Detail Modal */}
      <Dialog open={!!selectedFact} onOpenChange={() => setSelectedFact(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedFact && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  {selectedFact.label}
                </DialogTitle>
                <DialogDescription>
                  Detailed XBRL information for this financial fact
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Value Section */}
                <div className="bg-gradient-subtle rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold">Value</h4>
                  </div>
                  <div className="text-2xl font-bold text-primary">{selectedFact.value}</div>
                  <div className="text-sm text-muted-foreground">{selectedFact.units}</div>
                </div>

                {/* XBRL Tag */}
                <div>
                  <h4 className="font-semibold mb-2">XBRL Tag</h4>
                  <code className="bg-muted px-3 py-2 rounded text-sm block">{selectedFact.tag}</code>
                </div>

                {/* Context Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <h4 className="font-semibold">Period</h4>
                    </div>
                    <p className="text-sm">{selectedFact.context}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="w-4 h-4 text-primary" />
                      <h4 className="font-semibold">Entity</h4>
                    </div>
                    <p className="text-sm">{selectedFact.entity}</p>
                  </div>
                </div>

                {/* Definition */}
                <div>
                  <h4 className="font-semibold mb-2">Definition</h4>
                  <p className="text-sm leading-relaxed">{selectedFact.definition}</p>
                </div>

                {/* Calculation */}
                {selectedFact.calculation && (
                  <div>
                    <h4 className="font-semibold mb-2">Calculation</h4>
                    <div className="bg-muted rounded-lg p-3">
                      <code className="text-sm">{selectedFact.calculation}</code>
                    </div>
                  </div>
                )}

                {/* Related Facts */}
                {selectedFact.relatedFacts && selectedFact.relatedFacts.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Related XBRL Facts</h4>
                    <div className="space-y-1">
                      {selectedFact.relatedFacts.map((fact, index) => (
                        <div key={index} className="text-sm bg-muted px-2 py-1 rounded">
                          {fact}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Educational Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Why This Matters</h4>
                  <p className="text-sm text-blue-800">
                    XBRL tags like this enable automated analysis, comparison across companies, 
                    and regulatory compliance. Understanding these tags is crucial for modern 
                    financial reporting and analysis.
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};