// setup-project.mjs
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directories if they don't exist
const createDir = async (dirPath) => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(`Error creating directory ${dirPath}:`, err);
    }
  }
};

// Write file if it doesn't exist
const writeFile = async (filePath, content) => {
  try {
    // Check if file exists
    try {
      await fs.access(filePath);
      console.log(`File already exists: ${filePath}`);
    } catch {
      // File doesn't exist, create it
      await fs.writeFile(filePath, content);
      console.log(`Created file: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error writing file ${filePath}:`, err);
  }
};

// Create project structure
await createDir(path.join(__dirname, 'src', 'styles'));
await createDir(path.join(__dirname, 'src', 'components'));

// File contents
const files = [
  {
    path: path.join(__dirname, 'src', 'styles', 'theme.js'),
    content: `// src/styles/theme.js
const theme = {
  colors: {
    // Primary Colors
    navyBlue: '#1B365D',
    alpineWhite: '#FFFFFF',
    
    // Supporting Colors
    mountainBlue: '#2B517A',
    iceBlue: '#E8EEF4',
    
    // Background Colors
    pearlWhite: '#F7FAFC',
    deepNavy: '#152A4A',
    
    // Additional UI Colors
    error: '#DC2626'
  },
  
  typography: {
    fontFamily: {
      heading: "'Inter', sans-serif",
      body: "'Open Sans', sans-serif"
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    fontSize: {
      h1: '3rem',      // 48px
      h2: '2.25rem',   // 36px
      h3: '1.5rem',    // 24px
      h4: '1.25rem',   // 20px
      h5: '1rem',      // 16px
      bodyLarge: '1.125rem',   // 18px
      bodyRegular: '1rem',     // 16px
      bodySmall: '0.875rem',   // 14px
      bodyXSmall: '0.75rem'    // 12px
    },
    lineHeight: {
      heading: 1.2,
      body: 1.5
    }
  },
  
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem'      // 48px
  },
  
  borderRadius: {
    button: '6px',
    card: '8px'
  },
  
  shadows: {
    subtle: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)'
  }
};

export default theme;`
  },
  {
    path: path.join(__dirname, 'src', 'styles', 'GlobalStyles.js'),
    content: `// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle\`
  /* Import fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=Open+Sans:wght@400;600;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: \${({ theme }) => theme.typography.fontFamily.body};
    font-size: 16px;
    line-height: \${({ theme }) => theme.typography.lineHeight.body};
    color: \${({ theme }) => theme.colors.deepNavy};
    background-color: \${({ theme }) => theme.colors.pearlWhite};
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: \${({ theme }) => theme.typography.fontFamily.heading};
    line-height: \${({ theme }) => theme.typography.lineHeight.heading};
    margin-bottom: \${({ theme }) => theme.spacing.sm};
  }
  
  h1 {
    font-size: \${({ theme }) => theme.typography.fontSize.h1};
    font-weight: \${({ theme }) => theme.typography.fontWeight.bold};
  }
  
  h2 {
    font-size: \${({ theme }) => theme.typography.fontSize.h2};
    font-weight: \${({ theme }) => theme.typography.fontWeight.bold};
  }
  
  h3 {
    font-size: \${({ theme }) => theme.typography.fontSize.h3};
    font-weight: \${({ theme }) => theme.typography.fontWeight.semibold};
  }
  
  h4 {
    font-size: \${({ theme }) => theme.typography.fontSize.h4};
    font-weight: \${({ theme }) => theme.typography.fontWeight.semibold};
  }
  
  h5 {
    font-size: \${({ theme }) => theme.typography.fontSize.h5};
    font-weight: \${({ theme }) => theme.typography.fontWeight.medium};
  }
  
  p {
    margin-bottom: \${({ theme }) => theme.spacing.sm};
    max-width: 75ch; /* For optimal reading */
  }
  
  a {
    color: \${({ theme }) => theme.colors.navyBlue};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
\`;

export default GlobalStyles;`
  },
  {
    path: path.join(__dirname, 'src', 'components', 'Button.js'),
    content: `// src/components/Button.js
import styled, { css } from 'styled-components';

const baseButtonStyles = css\`
  font-family: \${({ theme }) => theme.typography.fontFamily.body};
  font-weight: \${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: \${({ theme }) => theme.typography.fontSize.bodyRegular};
  padding: 12px 24px;
  border-radius: \${({ theme }) => theme.borderRadius.button};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:active {
    transform: translateY(1px);
  }
\`;

export const PrimaryButton = styled.button\`
  \${baseButtonStyles}
  background-color: \${({ theme }) => theme.colors.navyBlue};
  color: \${({ theme }) => theme.colors.alpineWhite};
  
  &:hover:not(:disabled) {
    background-color: \${({ theme }) => theme.colors.deepNavy};
  }
\`;

export const SecondaryButton = styled.button\`
  \${baseButtonStyles}
  background-color: \${({ theme }) => theme.colors.mountainBlue};
  color: \${({ theme }) => theme.colors.alpineWhite};
  
  &:hover:not(:disabled) {
    background-color: \${({ theme }) => theme.colors.navyBlue};
  }
\`;

export const TextButton = styled.button\`
  \${baseButtonStyles}
  background-color: transparent;
  color: \${({ theme }) => theme.colors.deepNavy};
  padding: 8px 16px;
  
  &:hover:not(:disabled) {
    background-color: \${({ theme }) => theme.colors.iceBlue};
  }
\`;

export default PrimaryButton;`
  },
  {
    path: path.join(__dirname, 'src', 'components', 'Card.js'),
    content: `// src/components/Card.js
import styled from 'styled-components';

const Card = styled.div\`
  background-color: \${({ theme, variant }) => 
    variant === 'ice' ? theme.colors.iceBlue : theme.colors.alpineWhite};
  border: 1px solid rgba(43, 81, 122, 0.1); /* Mountain Blue with 10% opacity */
  border-radius: \${({ theme }) => theme.borderRadius.card};
  box-shadow: \${({ theme }) => theme.shadows.subtle};
  padding: \${({ theme }) => theme.spacing.md};
  margin-bottom: \${({ theme }) => theme.spacing.md};
\`;

export const CardTitle = styled.h3\`
  color: \${({ theme }) => theme.colors.navyBlue};
  margin-bottom: \${({ theme }) => theme.spacing.xs};
\`;

export const CardContent = styled.div\`
  color: \${({ theme }) => theme.colors.deepNavy};
\`;

export default Card;`
  },
  {
    path: path.join(__dirname, 'src', 'components', 'Input.js'),
    content: `// src/components/Input.js
import styled, { css } from 'styled-components';

const inputStyles = css\`
  font-family: \${({ theme }) => theme.typography.fontFamily.body};
  font-size: \${({ theme }) => theme.typography.fontSize.bodyRegular};
  background-color: \${({ theme }) => theme.colors.alpineWhite};
  border: 1px solid \${({ theme, error }) => 
    error ? theme.colors.error : theme.colors.mountainBlue};
  border-radius: \${({ theme }) => theme.borderRadius.button};
  padding: 12px 16px;
  width: 100%;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: \${({ theme, error }) => 
      error ? theme.colors.error : theme.colors.navyBlue};
  }
  
  &::placeholder {
    color: rgba(27, 54, 93, 0.5); /* Navy Blue with 50% opacity */
  }
\`;

export const Input = styled.input\`
  \${inputStyles}
\`;

export const TextArea = styled.textarea\`
  \${inputStyles}
  min-height: 120px;
  resize: vertical;
\`;

export const FormGroup = styled.div\`
  margin-bottom: \${({ theme }) => theme.spacing.md};
\`;

export const Label = styled.label\`
  display: block;
  font-weight: \${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: \${({ theme }) => theme.spacing.xs};
  color: \${({ theme }) => theme.colors.deepNavy};
\`;

export const ErrorMessage = styled.p\`
  color: \${({ theme }) => theme.colors.error};
  font-size: \${({ theme }) => theme.typography.fontSize.bodySmall};
  margin-top: \${({ theme }) => theme.spacing.xs};
\`;

export default Input;`
  },
  {
    path: path.join(__dirname, 'src', 'components', 'Navbar.js'),
    content: `// src/components/Navbar.js
import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav\`
  background-color: \${({ theme }) => theme.colors.navyBlue};
  color: \${({ theme }) => theme.colors.alpineWhite};
  padding: \${({ theme }) => theme.spacing.sm} \${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
\`;

const Logo = styled.div\`
  font-family: \${({ theme }) => theme.typography.fontFamily.heading};
  font-weight: \${({ theme }) => theme.typography.fontWeight.bold};
  font-size: \${({ theme }) => theme.typography.fontSize.h4};
\`;

const NavLinks = styled.div\`
  display: flex;
  gap: \${({ theme }) => theme.spacing.md};
\`;

const NavLink = styled.a\`
  color: \${({ theme }) => theme.colors.alpineWhite};
  font-weight: \${({ theme }) => theme.typography.fontWeight.medium};
  text-decoration: none;
  padding: \${({ theme }) => theme.spacing.xs};
  
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
\`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>SherpaTech.ai</Logo>
      <NavLinks>
        <NavLink href="#features">Features</NavLink>
        <NavLink href="#solutions">Solutions</NavLink>
        <NavLink href="#pricing">Pricing</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;`
  },
  {
    path: path.join(__dirname, 'src', 'components', 'Hero.js'),
    content: `// src/components/Hero.js
import React from 'react';
import styled from 'styled-components';
import { PrimaryButton, SecondaryButton } from './Button';

const HeroContainer = styled.div\`
  background: linear-gradient(to bottom, \${({ theme }) => theme.colors.navyBlue}, \${({ theme }) => theme.colors.mountainBlue});
  color: \${({ theme }) => theme.colors.alpineWhite};
  padding: \${({ theme }) => theme.spacing.xl} \${({ theme }) => theme.spacing.lg};
  text-align: center;
  position: relative;
  overflow: hidden;
  
  /* Optional: add mountain silhouette at the bottom */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23FFFFFF' opacity='.25'%3E%3C/path%3E%3C/svg%3E");
    background-size: cover;
    background-position: center;
    z-index: 1;
  }
\`;

const HeroContent = styled.div\`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
\`;

const HeroTitle = styled.h1\`
  margin-bottom: \${({ theme }) => theme.spacing.md};
\`;

const HeroSubtitle = styled.p\`
  font-size: \${({ theme }) => theme.typography.fontSize.bodyLarge};
  margin-bottom: \${({ theme }) => theme.spacing.lg};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
\`;

const ButtonGroup = styled.div\`
  display: flex;
  gap: \${({ theme }) => theme.spacing.sm};
  justify-content: center;
\`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>Your Business Guide in the Digital Landscape</HeroTitle>
        <HeroSubtitle>
          SherpaTech.ai helps small-to-medium businesses navigate the complexities of digital transformation with expert guidance and reliable solutions.
        </HeroSubtitle>
        <ButtonGroup>
          <PrimaryButton>Get Started</PrimaryButton>
          <SecondaryButton>Learn More</SecondaryButton>
        </ButtonGroup>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;`
  },
  {
    path: path.join(__dirname, 'src', 'components', 'Footer.js'),
    content: `// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer\`
  background-color: \${({ theme }) => theme.colors.deepNavy};
  color: \${({ theme }) => theme.colors.alpineWhite};
  padding: \${({ theme }) => theme.spacing.xl} \${({ theme }) => theme.spacing.lg};
  margin-top: auto;
\`;

const FooterContent = styled.div\`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: \${({ theme }) => theme.spacing.lg};
\`;

const FooterSection = styled.div\`
  margin-bottom: \${({ theme }) => theme.spacing.md};
\`;

const FooterTitle = styled.h4\`
  margin-bottom: \${({ theme }) => theme.spacing.sm};
  color: \${({ theme }) => theme.colors.alpineWhite};
\`;

const FooterLink = styled.a\`
  color: \${({ theme }) => theme.colors.iceBlue};
  display: block;
  margin-bottom: \${({ theme }) => theme.spacing.xs};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
\`;

const FooterBottom = styled.div\`
  margin-top: \${({ theme }) => theme.spacing.lg};
  text-align: center;
  padding-top: \${({ theme }) => theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: \${({ theme }) => theme.typography.fontSize.bodySmall};
\`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>SherpaTech.ai</FooterTitle>
          <p>Your trusted guide in the digital landscape, helping businesses reach new heights.</p>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Solutions</FooterTitle>
          <FooterLink href="#digital-strategy">Digital Strategy</FooterLink>
          <FooterLink href="#cloud-solutions">Cloud Solutions</FooterLink>
          <FooterLink href="#analytics">Data Analytics</FooterLink>
          <FooterLink href="#ai-ml">AI & Machine Learning</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink href="#blog">Blog</FooterLink>
          <FooterLink href="#guides">Guides</FooterLink>
          <FooterLink href="#webinars">Webinars</FooterLink>
          <FooterLink href="#case-studies">Case Studies</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Connect</FooterTitle>
          <FooterLink href="#contact">Contact Us</FooterLink>
          <FooterLink href="#support">Support</FooterLink>
          <FooterLink href="#careers">Careers</FooterLink>
          <FooterLink href="#newsletter">Newsletter</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; {new Date().getFullYear()} SherpaTech.ai. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;`
  },
  {
    path: path.join(__dirname, 'src', 'App.jsx'),
    content: `// src/App.jsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Card, { CardTitle, CardContent } from './components/Card';
import { PrimaryButton } from './components/Button';
import Footer from './components/Footer';
import styled from 'styled-components';

const MainContent = styled.main\`
  max-width: 1200px;
  margin: 0 auto;
  padding: \${({ theme }) => theme.spacing.xl} \${({ theme }) => theme.spacing.lg};
\`;

const SectionTitle = styled.h2\`
  text-align: center;
  margin-bottom: \${({ theme }) => theme.spacing.lg};
\`;

const CardGrid = styled.div\`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: \${({ theme }) => theme.spacing.md};
  margin-bottom: \${({ theme }) => theme.spacing.xl};
\`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="app-container" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh' 
      }}>
        <Navbar />
        <Hero />
        
        <MainContent>
          <section id="features">
            <SectionTitle>Our Services</SectionTitle>
            <CardGrid>
              <Card>
                <CardTitle>Digital Strategy</CardTitle>
                <CardContent>
                  <p>Navigate the digital landscape with confidence. Our experienced guides will help chart your path to success.</p>
                  <PrimaryButton>Learn More</PrimaryButton>
                </CardContent>
              </Card>
              
              <Card variant="ice">
                <CardTitle>Cloud Solutions</CardTitle>
                <CardContent>
                  <p>Reach new heights with scalable cloud infrastructure that grows with your business needs.</p>
                  <PrimaryButton>Learn More</PrimaryButton>
                </CardContent>
              </Card>
              
              <Card>
                <CardTitle>Data Analytics</CardTitle>
                <CardContent>
                  <p>Gain clear insights into your business performance with our comprehensive analytics solutions.</p>
                  <PrimaryButton>Learn More</PrimaryButton>
                </CardContent>
              </Card>
            </CardGrid>
          </section>
          
          <section id="about">
            <SectionTitle>Your Guide in Digital Transformation</SectionTitle>
            <div style={{ 
              display: 'flex', 
              gap: '2rem', 
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: '1 1 400px' }}>
                <h3>Why Choose SherpaTech.ai?</h3>
                <p>Just as mountain sherpas guide climbers to new heights with their expertise and knowledge of the terrain, SherpaTech.ai guides businesses through the complex digital landscape.</p>
                <p>Our experienced team combines deep technical knowledge with business acumen to ensure your digital transformation journey is successful and sustainable.</p>
              </div>
              <div style={{ 
                flex: '1 1 400px',
                backgroundColor: theme.colors.iceBlue,
                borderRadius: theme.borderRadius.card,
                padding: theme.spacing.md
              }}>
                <h4>Our Approach</h4>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                  <li>Expert Guidance: Navigate with confidence</li>
                  <li>Tailored Solutions: Customized to your business needs</li>
                  <li>Proven Pathways: Established routes to success</li>
                  <li>Continuous Support: We're with you every step of the way</li>
                </ul>
              </div>
            </div>
          </section>
        </MainContent>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;`
  },
  {
    path: path.join(__dirname, 'src', 'main.jsx'),
    content: `// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`
  },
  {
    path: path.join(__dirname, 'index.html'),
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SherpaTech.ai | Your Business Guide in the Digital Landscape</title>
    <!-- Google Fonts for Inter and Open Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`
  }
];

// Create each file
for (const file of files) {
  await writeFile(file.path, file.content);
}

console.log('All files have been created successfully!');
console.log('\nNext steps:');
console.log('1. Install styled-components: npm install styled-components');
console.log('2. Start the development server: npm run dev');