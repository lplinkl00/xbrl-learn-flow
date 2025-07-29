import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { WaitlistForm } from '@/components/WaitlistForm';
import { XBRLPreview } from '@/components/XBRLPreview';
import { PricingSection } from '@/components/PricingSection';
import { BookOpen, TrendingUp, Users, CheckCircle, ArrowRight, Code2, BarChart3 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-2xl mb-6 shadow-medium">
              <Code2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              XBRL Master
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The interactive learning platform that makes XBRL simple for accounting students. 
              Master financial reporting standards through hands-on practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="lg">
                Join Waitlist
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Learn About XBRL
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="shadow-medium border-0 bg-background/80 backdrop-blur-sm hover:shadow-strong transition-all duration-300">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Interactive Learning</h3>
                <p className="text-muted-foreground">
                  Learn by doing with hands-on tutorials that guide you through real XBRL examples step by step.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0 bg-background/80 backdrop-blur-sm hover:shadow-strong transition-all duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Real-Time Feedback</h3>
                <p className="text-muted-foreground">
                  Get instant validation and feedback as you practice, helping you learn from mistakes immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0 bg-background/80 backdrop-blur-sm hover:shadow-strong transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Student-Focused</h3>
                <p className="text-muted-foreground">
                  Designed specifically for accounting students with affordable pricing and academic-friendly content.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Waitlist Form */}
          <div className="mb-16">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* What is XBRL Section */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">What is XBRL?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4">eXtensible Business Reporting Language</h3>
              <p className="text-muted-foreground mb-4">
                XBRL is a global standard for exchanging business information. It's used by companies 
                worldwide to create machine-readable financial reports that can be automatically 
                processed and analyzed.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                  <span>Required by SEC for public companies</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                  <span>Essential for modern accounting</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                  <span>Growing career requirement</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-primary/10 rounded-xl p-6">
              <BarChart3 className="w-16 h-16 text-primary mb-4" />
              <h4 className="font-semibold mb-2">Why Learn XBRL?</h4>
              <p className="text-sm text-muted-foreground">
                As financial reporting becomes increasingly digital, XBRL knowledge is becoming 
                essential for accounting professionals. Get ahead of the curve with practical, 
                hands-on training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <XBRLPreview />
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Code2 className="w-8 h-8 text-primary mr-2" />
            <span className="text-xl font-bold">XBRL Master</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Making XBRL education accessible for the next generation of accounting professionals.
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 XBRL Master. Join our waitlist to be notified when we launch.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
