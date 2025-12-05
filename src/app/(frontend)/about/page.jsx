import Link from 'next/link'

export const metadata = {
  title: 'About — Hausba',
  description: 'About Hausba — our mission, team and process',
}

export default function AboutPage() {
  return (
    <main
      style={{
        maxWidth: 800,
        margin: '48px auto',
        padding: '0 16px',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      }}
    >
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>About Hausba</h1>
      <p style={{ color: '#555', marginBottom: 24 }}>
        Hausba is a small team building simple, fast, and delightful experiences for modern housing
        projects.
      </p>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Our mission</h2>
        <p style={{ color: '#444' }}>
          Deliver clean, accessible tools that help people find and manage homes with confidence.
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Team</h2>
        <ul style={{ paddingLeft: 20, color: '#333' }}>
          <li>Product — Jane Doe</li>
          <li>Engineering — John Smith</li>
          <li>Design — Alex Lee</li>
        </ul>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Contact</h2>
        <p style={{ color: '#333' }}>
          Email: <a href="mailto:hello@hausba.example">hello@hausba.example</a>
        </p>
      </section>

      <p>
        <Link href="/">← Back to home</Link>
      </p>
    </main>
  )
}
