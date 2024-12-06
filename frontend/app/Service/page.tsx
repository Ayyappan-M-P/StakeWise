"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const InvestmentOptions = [
  {
    title: "Stocks",
    description: "Invest in equity shares of companies for higher returns.",
    imgSrc: "/service1.jpeg",
  },
  {
    title: "Mutual Funds",
    description: "Diversify your portfolio with professional fund management.",
    imgSrc: "/service2.webp",
  },
  {
    title: "Fixed Deposit",
    description: "Secure investments with guaranteed returns.",
    imgSrc: "/service3.jpg",
  },
  {
    title: "Retirement Plans",
    description: "Ensure a stable income post-retirement.",
    imgSrc: "/service4.jpg",
  },
];

export default function Home() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/Investment"); // Navigate to the payment page
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Investment Services</h1>
        <p className="mt-2 text-lg">Grow your wealth with the right investment plans</p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 space-y-6">
        {InvestmentOptions.map((option, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center text-center p-6"
          >
            <Image
              src={option.imgSrc}
              alt={option.title}
              width={400}
              height={250}
              className="w-full h-64 object-cover rounded-t-md"
            />
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-gray-800">{option.title}</h2>
              <p className="mt-2 text-gray-600">{option.description}</p>
              <button
                onClick={handleNavigate}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
