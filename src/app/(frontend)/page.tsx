import { headers as getHeaders } from 'next/headers'
import Image from 'next/image'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

import config from '../../payload.config'
import './styles.css'

// import the client wrapper directly (no dynamic, safe)
import BubbleInvertClient from './components/BubbleInvertClient'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="content">
        <Image src="/hausba-logo-wh.png" alt="logo" width={200} height={80} />
        {!user && (
          <>
            <h1
              style={{
                paddingTop: '1rem',
                paddingBottom: '0.3rem',
              }}
            >
              Welcome to Hausba! We are re-creating our website right now.
            </h1>
            <h3
              style={{
                marginTop: '1rem',
                fontSize: '1rem',
                paddingTop: '1rem',
                fontWeight: '200',
                lineHeight: '1.5rem',
              }}
            >
              Download Our{' '}
              <a
                href="https://workdrive.zohoexternal.com/external/6a52eac8250aacb8946b585ef0ec6382875e21a4c8b6e8d62b3e889830c04fd1"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline', color: '#fff' }}
              >
                Company Profile{' '}
              </a>{' '}
              or call us at{' '}
              <a href="tel:08134679501" style={{ color: '#fff' }}>
                08134679501
              </a>
            </h3>
          </>
        )}
      </div>

      {/* Client-only bubble invert */}
      <BubbleInvertClient radius={150} />
    </div>
  )
}
