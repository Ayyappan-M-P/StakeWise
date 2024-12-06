import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h4 className="text-xl font-bold mb-4">Investment Company</h4>
          <p className="text-sm text-gray-300">
            Helping investors build wealth through strategic, data-driven investment solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/About" className="hover:text-blue-200">About Us</Link></li>
            <li><Link href="/Service" className="hover:text-blue-200">Investment Services</Link></li>
            <li><Link href="/performance" className="hover:text-blue-200">Performance</Link></li>
            <li><Link href="/contact" className="hover:text-blue-200">Contact</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-xl font-bold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="hover:text-blue-200">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-blue-200">Terms of Service</Link></li>
            <li><Link href="/disclosures" className="hover:text-blue-200">Investor Disclosures</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-bold mb-4">Contact</h4>
          <ul className="space-y-2">
            <li>Investment company</li>
            <li>aaa chennai</li>
            <li>Phone:+91 9360775100</li>
            <li>Email: ayyappanmp.cse2022@citchennai.net</li>
          </ul>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-blue-700 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-300 mb-4 md:mb-0">
          © {new Date().getFullYear()} Investment company. All Rights Reserved.
        </div>
        
        <div className="flex space-x-4">
          <Link href="https://facebook.com" target="_blank" className="hover:text-blue-200">
            <Facebook className="w-6 h-6" />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="hover:text-blue-200">
            <Twitter className="w-6 h-6" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="hover:text-blue-200">
            <Linkedin className="w-6 h-6" />
          </Link>
          <Link href="https://instagram.com" target="_blank" className="hover:text-blue-200">
            <Instagram className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;