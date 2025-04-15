
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPlan = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  buttonLink, 
  highlighted = false 
}: { 
  title: string; 
  price: string; 
  description: string; 
  features: string[]; 
  buttonText: string; 
  buttonLink: string; 
  highlighted?: boolean;
}) => {
  return (
    <div className={`rounded-xl border p-6 shadow-sm ${highlighted ? 'border-primary bg-primary/5 shadow-md' : ''}`}>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div>
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Custom' && <span className="text-muted-foreground"> /mo</span>}
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      
      <Button asChild className={`mt-6 w-full ${highlighted ? '' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
        <Link to={buttonLink}>{buttonText}</Link>
      </Button>
    </div>
  );
};

const Pricing = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground">
            Choose the perfect plan for your event management needs. No hidden fees or surprises.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingPlan
            title="Basic"
            price="KES 2,000"
            description="Perfect for small events and personal gatherings."
            features={[
              "Up to 100 attendees",
              "Basic analytics",
              "Email support",
              "Ticket scanning",
              "Single admin account"
            ]}
            buttonText="Get Started"
            buttonLink="/signup"
          />
          
          <PricingPlan
            title="Pro"
            price="KES 5,000"
            description="Ideal for medium-sized events and professional organizers."
            features={[
              "Up to 500 attendees",
              "Advanced analytics",
              "Priority support",
              "Custom branding",
              "5 admin accounts",
              "Promotional tools"
            ]}
            buttonText="Get Started"
            buttonLink="/signup"
            highlighted={true}
          />
          
          <PricingPlan
            title="Enterprise"
            price="Custom"
            description="For large-scale events and organizations with specific requirements."
            features={[
              "Unlimited attendees",
              "Premium analytics",
              "24/7 dedicated support",
              "Full white labeling",
              "Unlimited admin accounts",
              "API access",
              "Custom integrations"
            ]}
            buttonText="Contact Sales"
            buttonLink="/contact"
          />
        </div>
        
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 mt-8 text-left">
            <div>
              <h3 className="font-semibold mb-2">Can I change my plan later?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected on your next billing cycle.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does the pricing work for one-time events?</h3>
              <p className="text-muted-foreground">We offer one-time event packages as well. Contact our sales team for custom quotes based on your specific event needs.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial available?</h3>
              <p className="text-muted-foreground">Yes, we offer a 14-day free trial on all our plans. No credit card required to get started.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, mobile money payments, and bank transfers for enterprise customers.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;
