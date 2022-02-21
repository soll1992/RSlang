import * as React from 'react';
import { Component, ReactNode } from 'react';
import './footer.scss';

class Footer extends Component {
  render(): ReactNode {
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer__column">
            <a href="https://rs.school/js/" target="_blank">
              <div className="footer__rss"></div>
            </a>
          </div>
          <p className="footer__copyright">2022 г.</p>
          <div className="footer__column">
            <a href="https://github.com/dariija" target="_blank">
              <div className="footer__github-wrap">
                dariija<div className="footer__github"></div>
              </div>
            </a>
            <a href="https://github.com/soll1992" target="_blank">
              <div className="footer__github-wrap">
                soll1992<div className="footer__github"></div>
              </div>
            </a>
            <a href="https://github.com/ConstantineTU" target="_blank">
              <div className="footer__github-wrap">
                ConstantineTU<div className="footer__github"></div>
              </div>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
