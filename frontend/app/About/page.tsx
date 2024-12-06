// types.ts
interface Investor {
  name: string;
  position: string;
  experience: string;
  imageUrl: string;
}

interface Review {
  text: string;
  author: string;
  since: string;
  rating: number;
}

interface InvestmentType {
  name: string;
  description: string;
  return: string;
}

// page.tsx
import { FC } from 'react';
import { Star } from 'lucide-react';

const investors: Investor[] = [
  {
    name: "Sarah Chen",
    position: "Managing Partner",
    experience: "Former Goldman Sachs",
    imageUrl: "/sarah-chen.jpg"
  },
  {
    name: "Michael Roberts",
    position: "Chief Investment Officer",
    experience: "20+ Years Experience",
    imageUrl: "/michael-roberts.jpg"
  },
  {
    name: "David Kumar",
    position: "Portfolio Manager",
    experience: "Tech Investment Specialist",
    imageUrl: "/david-kumar.jpg"
  }
];

const reviews: Review[] = [
  {
    text: "Stellar Investments has consistently delivered outstanding returns on my portfolio. Their team's expertise and dedication to client success is unmatched.",
    author: "James Wilson",
    since: "2015",
    rating: 5
  },
  {
    text: "The personal attention and professional guidance I've received has helped me achieve my long-term financial goals. Highly recommended!",
    author: "Maria Garcia",
    since: "2018",
    rating: 5
  },
  {
    text: "Their innovative investment strategies and transparent communication make them stand out in the industry. Couldn't be happier with the results.",
    author: "Robert Chang",
    since: "2019",
    rating: 5
  }
];

const investmentTypes: InvestmentType[] = [
  {
    name: "Growth Funds",
    description: "Focus on high-growth technology and emerging markets",
    return: "22% average annual return"
  },
  {
    name: "Value Funds",
    description: "Long-term value investments in established companies",
    return: "15% average annual return"
  },
  {
    name: "Income Funds",
    description: "Dividend-focused investments",
    return: "12% average annual yield"
  }
];

const AboutPage: FC = () => {
  const renderStars = (rating: number) => {
    return [...Array(rating)].map((_, index) => (
      <Star key={index} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl font-bold mb-4">About Investment Company</h1>
          <p className="text-xl">Your Trusted Partner in Building Wealth Since 2024</p>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">18.5%</div>
            <p className="text-black">Average Annual Return</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">$2.8B</div>
            <p className="text-black">Assets Under Management</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
            <p className="text-black">Years of Experience</p>
          </div>
        </div>
      </div>

      {/* Investment Types */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Investment Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investmentTypes.map((type, index) => (
              <div key={index} className="bg-slate-500 p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-blue-800">{type.name}</h3>
                <p className="text-slate-50 mb-4">{type.description}</p>
                <p className="text-blue-600 font-semibold">{type.return}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Investors */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Our Top Investors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {investors.map((investor, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
              <img
                src="/api/placeholder/80/80"
                alt={investor.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-2">{investor.name}</h3>
              <p className="text-blue-600 mb-2">{investor.position}</p>
              <p className="text-slate-50">{investor.experience}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Client Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {renderStars(review.rating)}
                </div>
                <p className="text-slate-50 mb-4">{review.text}</p>
                <div className="font-semibold">{review.author}</div>
                <div className="text-sm text-slate-50">Client since {review.since}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;