import Link from 'next/link';

export default function Footer() {

  return (
    <footer id="footer" className="bg-black text-white py-12">
      <div className="container-custom mx-auto text-center">
        <div className="grid md:grid-cols-3 gap-8 items-center justify-center">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">VLSystem</h3>
            <p className="text-gray-400">Empowering Lives Through Better Lending</p>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="footer-link">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-2">
              <p>📞 +63912023122</p>
              <p>📩 vistulalending@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}