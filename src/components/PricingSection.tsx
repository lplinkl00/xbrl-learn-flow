import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, DollarSign, Users, BookOpen, Award } from 'lucide-react';

export const PricingSection = () => {
  const features = [
    'Interactive XBRL tutorials',
    'Real-time code validation',
    'Step-by-step guidance',
    'Practice exercises',
    'Progress tracking',
    'Certificate of completion'
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Affordable Learning</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master XBRL without breaking the bank. One-time payment, lifetime access.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="shadow-strong border-0 bg-gradient-subtle overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-bold">$5</span>
                  <span className="text-muted-foreground ml-2">one-time</span>
                </div>
                <p className="text-muted-foreground">Lifetime access</p>
              </div>

              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant="cta" size="lg" className="w-full mb-4">
                Get Early Access
              </Button>

              <div className="grid grid-cols-3 gap-4 text-center text-xs text-muted-foreground">
                <div className="flex flex-col items-center">
                  <Users className="w-4 h-4 mb-1" />
                  <span>Student-friendly</span>
                </div>
                <div className="flex flex-col items-center">
                  <BookOpen className="w-4 h-4 mb-1" />
                  <span>Self-paced</span>
                </div>
                <div className="flex flex-col items-center">
                  <Award className="w-4 h-4 mb-1" />
                  <span>Certification</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            30-day money-back guarantee • No recurring fees • Access forever
          </p>
        </div>
      </div>
    </section>
  );
};