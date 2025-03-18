import React from 'react'

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            At SherpaTech.ai, we respect your privacy and are committed to protecting your personal data.
            This privacy policy will inform you about how we look after your personal data when you visit our
            website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">The Data We Collect</h2>
          <p className="mb-4">
            We may collect, use, store and transfer different kinds of personal data about you which we have
            grouped together as follows:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>Identity Data: includes first name, last name, username or similar identifier</li>
            <li>Contact Data: includes email address and telephone numbers</li>
            <li>Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location, operating system and platform</li>
            <li>Usage Data: includes information about how you use our website and services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
          <p className="mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your 
            personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>To provide you with the services you have requested</li>
            <li>To improve our website and services</li>
            <li>To communicate with you about our services</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
            <br />
            <a href="mailto:privacy@sherpatech.ai" className="text-blue-600 hover:underline">
              privacy@sherpatech.ai
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}

export default Privacy
