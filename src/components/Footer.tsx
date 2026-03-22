import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">MobileMatch</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Your intelligent mobile phone discovery platform. Find, compare, and choose your perfect phone with AI-powered guidance.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Discover</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/phones" className="hover:text-white transition-colors">Browse All Phones</Link></li>
              <li><Link href="/quiz" className="hover:text-white transition-colors">Best For Me Quiz</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Side-by-Side Compare</Link></li>
              <li><Link href="/chat" className="hover:text-white transition-colors">AI Assistant</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Top Brands</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/phones?brand=Apple" className="hover:text-white transition-colors">Apple</Link></li>
              <li><Link href="/phones?brand=Samsung" className="hover:text-white transition-colors">Samsung</Link></li>
              <li><Link href="/phones?brand=Google" className="hover:text-white transition-colors">Google</Link></li>
              <li><Link href="/phones?brand=OnePlus" className="hover:text-white transition-colors">OnePlus</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="cursor-default">Buying Guide</span></li>
              <li><span className="cursor-default">Phone Glossary</span></li>
              <li><span className="cursor-default">News & Updates</span></li>
              <li><span className="cursor-default">About Us</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} MobileMatch. All rights reserved.</p>
          <p className="text-gray-500">Built with intelligence, for smarter choices.</p>
        </div>
      </div>
    </footer>
  );
}
