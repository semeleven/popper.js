/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import CarbonAds from './CarbonAds';
import { Container, media, Footer } from './Framework';
import { MdxRoutes } from '@pauliescanlon/gatsby-mdx-routes';
import Navigation, { NAVIGATION_WIDTH } from './Navigation';
import SEO from './Seo';
import processRoutes from '../utils/processRoutes';

import './layout.css';
import './prism-base2tone-pool-dark.css';
import { ChevronRight, ChevronLeft } from 'react-feather';

const Main = styled.main`
  margin-left: 0;
  padding-top: 45px;

  ${media.lg} {
    padding-top: 0;
    margin-left: ${NAVIGATION_WIDTH}px;
  }
`;

const FooterStyled = styled(Footer)`
  background: none;
  border-top: 1px solid #44395d;

  ${media.lg} {
    margin-left: ${NAVIGATION_WIDTH}px;
  }
`;

const NavButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #44395d;
  margin-top: 50px;
`;

const NavButtonContainer = styled(Container)`
  display: flex;
  width: 100%;
  padding: 0;

  ${media.md} {
    padding: 0 40px;
  }
`;

const NavButtonCell = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
`;

const NavDivider = styled.div`
  display: none;
  min-width: 1px;
  background: #44395d;
  height: 100%;

  ${media.md} {
    display: block;
  }
`;

const NavButton = styled(Link)`
  position: relative;
  font-size: 18px;
  padding: 50px 40px;
  color: #4edee5;
  border-bottom: 2px solid transparent;
  transition: none;
  word-break: break-word;
  width: 100%;

  ${media.md} {
    font-size: 22px;
    width: 100%;
  }

  ${media.lg} {
    font-size: 24px;
  }

  &:hover {
    background-color: #281e36;
    border-bottom-color: #4edee5;
  }

  &:active {
    border-bottom-style: dashed;
  }

  text-align: ${props => (props.first ? 'left' : 'right')};
`;

const arrowCss = css`
  vertical-align: 3px;

  ${media.md} {
    vertical-align: 0;
  }
`;

const NavButtonDirection = styled.span`
  position: absolute;
  top: 50px;

  ${media.md} {
    top: 54px;
  }

  ${media.lg} {
    top: 56px;
  }

  &[data-prev] {
    left: 10px;
  }

  &[data-next] {
    right: 10px;
  }
`;

const components = {
  'x-ad': CarbonAds,
};

const Layout = ({ children, path, pageResources }) => {
  function getPrevNextRoutes(routes) {
    const validRoutes = processRoutes(routes);
    const slashlessPath = path.replace(/\/$/, '');

    const currentPathIndex = validRoutes.findIndex(
      route => route.slug === slashlessPath
    );

    return {
      prev: validRoutes[currentPathIndex - 1],
      next: validRoutes[currentPathIndex + 1],
    };
  }

  // HACK: remove this if the plugin can somehow work by default...
  useLayoutEffect(() => {
    try {
      document.querySelector(window.location.hash).scrollIntoView();
    } catch (e) {}
  }, []);

  return (
    <MDXProvider components={components}>
      <Global
        styles={css`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: #f4e0f1;
          }

          h1 {
            font-size: 40px;
            margin-top: 0;
            padding-top: 20px;
            line-height: 1.1;
          }

          h2 {
            font-size: 32px;
          }

          h3 {
            font-size: 24px;
            margin-bottom: 10px;
            margin-top: 40px;
          }

          h4 {
            font-size: 20px;
            margin-bottom: 10px;
          }

          h5 {
            font-size: 18px;
          }

          h2::before {
            content: ' ';
            display: block;
            border-bottom: 1px solid #44395d;
            padding-top: 20px;
            margin-bottom: 40px;
          }

          blockquote {
            margin: 0;
            padding: 0.5em 30px;
            border-radius: 0px 10px 10px 0px;
            background-color: rgba(135, 82, 27, 0.25);
            color: #ddc5a1;
            border-left: 2px dashed #ddc5a1;
          }

          h3 > code[class*='language-'] {
            color: #ffe69d;
          }

          ul {
            padding-left: 20px;
          }

          a {
            color: #ffe69d;
            text-decoration: none;
            padding-bottom: 1px;
            border-bottom: 2px solid rgba(255, 228, 148, 0.25);
            transition: border-bottom-color 0.15s ease-in-out;

            &:hover {
              border-bottom: 2px solid rgba(255, 228, 148, 1);
            }

            &:active {
              border-bottom-style: dashed;
            }
          }

          ${media.md} {
            pre[class*='language-'] {
              padding: 15px 20px;
            }
          }

          h1 .gatsby-link-icon {
            display: none;
          }

          h2,
          h3,
          h4,
          h5,
          h6 {
            &:hover {
              .gatsby-link-icon {
                opacity: 1;
              }
            }
          }

          .gatsby-link-icon {
            fill: #ffb6b3;
            border: none;
            margin-left: -30px;
            padding-right: 10px;
            opacity: 0;
            transition: opacity 0.15s ease-in-out;
            float: right;

            ${media.md} {
              float: left;
            }

            &:focus {
              opacity: 1;
            }

            &:hover {
              border: none;
            }

            svg {
              width: 20px;
              height: 20px;
            }
          }
        `}
      />
      <div>
        {pageResources && (
          <SEO title={pageResources.json.pageContext.frontmatter.title} />
        )}
        <Navigation root="/" target="location" />
        <Main>
          <Container>{children}</Container>
          <MdxRoutes>
            {routes => {
              const { prev, next } = getPrevNextRoutes(routes);
              return (
                <NavButtonWrapper>
                  <NavButtonContainer>
                    <NavButtonCell>
                      {prev && (
                        <NavButton to={`${prev.slug}/`} first>
                          <NavButtonDirection data-prev>
                            <ChevronLeft size={28} css={arrowCss} />
                          </NavButtonDirection>
                          {prev.title}
                        </NavButton>
                      )}
                    </NavButtonCell>
                    <NavDivider />
                    <NavButtonCell>
                      {next && (
                        <NavButton to={`${next.slug}/`} last>
                          {next.title}
                          <NavButtonDirection data-next>
                            <ChevronRight size={28} css={arrowCss} />
                          </NavButtonDirection>
                        </NavButton>
                      )}
                    </NavButtonCell>
                  </NavButtonContainer>
                </NavButtonWrapper>
              );
            }}
          </MdxRoutes>
        </Main>
        <FooterStyled>© {new Date().getFullYear()} MIT License</FooterStyled>
      </div>
    </MDXProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
