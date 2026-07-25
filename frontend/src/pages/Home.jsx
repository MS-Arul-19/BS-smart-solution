import { Link } from 'react-router-dom';

/** Landing page — three entry points into the platform. */
const OPTIONS = [
  {
    to: '/products',
    title: 'Products',
    text: 'Bulk products for businesses — wires, cameras, materials and more. Browse the catalogue and enquire for wholesale rates.',
    cta: 'Browse Products',
  },
  {
    to: '/services',
    title: 'Services',
    text: 'Trusted local services — electrician, plumbing, CCTV installation, AC service, home maintenance and interior works.',
    cta: 'Browse Services',
  },
  {
    to: '/social-service',
    title: 'Social Service',
    text: 'Community-first support — free or subsidised help for schools, temples, NGOs and people in need. Reach out to us.',
    cta: 'Learn More',
  },
];

export default function Home() {
  return (
    <div>
      <div className="hero">
        <h1>BS Smart Solution</h1>
        <p>
          One platform for bulk products, local services and community support.
          Choose an option, send an enquiry, and we connect with you on WhatsApp.
        </p>
      </div>

      <div className="option-grid">
        {OPTIONS.map((o) => (
          <Link key={o.to} to={o.to} className="option-card">
            <span className="option-title">{o.title}</span>
            <span className="option-text">{o.text}</span>
            <span className="btn option-btn">{o.cta}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
