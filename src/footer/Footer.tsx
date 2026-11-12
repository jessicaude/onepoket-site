import { PoketLogo } from '../brand/PoketLogo'
import './footer.css'

// Section 5, the footer, on every page. Ported from
// reference/onepoket-website.html: the OnePoket, About and Legal columns, the
// wordmark and the copyright line. The in-page links go to the home page's
// sections ("/#how"), so they work from the legal pages too; the legal links
// are real routes. The reference's newsletter form is left out until there is
// a mailing service to send it to; the three columns take its space.

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <nav className="foot-links" aria-label="Footer">
            <div className="foot-col">
              <h2 className="foot-col-title">OnePoket</h2>
              <a href="/#how">How it works</a>
              <a href="/#faq">Questions</a>
              <a href="https://centryos.xyz/">For businesses</a>
            </div>
            <div className="foot-col">
              <h2 className="foot-col-title">About</h2>
              <a href="https://centryos.xyz/">CentryOS</a>
              <a href="mailto:support@onepoket.com">support@onepoket.com</a>
            </div>
            <div className="foot-col">
              <h2 className="foot-col-title">Legal</h2>
              <a href="/terms">Terms of use</a>
              <a href="/privacy">Privacy policy</a>
            </div>
          </nav>
        </div>

        <div className="foot-wordmark" aria-hidden>
          <PoketLogo height={161} />
        </div>

        <div className="foot-bottom">
          <span>&copy; 2026 Poketlabs. Part of the CentryOS ecosystem.</span>
          <span>
            <a href="/terms">Terms</a> &middot; <a href="/privacy">Privacy</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
