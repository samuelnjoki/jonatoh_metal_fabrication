JONATOH FABRICATORS — STATIC WEBSITE
======================================

WHAT IS INCLUDED
- index.html, about.html, services.html, projects.html, contact.html
- css/style.css and JavaScript configuration/behavior files
- WhatsApp quote requests and EmailJS-based email requests (no custom backend)
- Gallery category filters and lazy-loaded local image files; supports 200+ entries
- Facebook and TikTok profile links
- sitemap.xml and robots.txt

IMPORTANT: CONFIGURE THESE BEFORE PUBLISHING
--------------------------------------------
1) WhatsApp number
   File: js/config.js
   Current number: 254799069642 (international format for 0799069642 in Kenya).
   Confirm this is the WhatsApp-enabled business number before going live.

2) Business email
   File: js/config.js
   Change businessEmail from info@example.com to your real business email.
   Also update email in the JSON-LD block in index.html.

3) Facebook and TikTok
   File: js/config.js
   Replace:
     https://www.facebook.com/REPLACE_WITH_YOUR_PAGE
     https://www.tiktok.com/@REPLACE_WITH_YOUR_ACCOUNT
   with your actual public profile/page URLs. Until configured, clicking the links shows a reminder.

4) Automatic email quotation delivery with EmailJS (frontend only; no backend)
   The website uses EmailJS, a third-party frontend email service. It is NOT configured by default.
   You must set up your EmailJS account and enter its IDs in js/config.js.

   Setup:
   a. Create an account at https://www.emailjs.com/
   b. Add/connect an email service and note its Service ID.
   c. Create an email template and note its Template ID.
   d. Set the template's recipient/to email to your business email (or use the `to_email`
      template variable if supported by your chosen setup).
   e. In the template body, include the request fields, for example:
      Subject: {{subject}}
      Customer: {{from_name}}
      Phone: {{from_phone}}
      Customer email: {{customer_email}}
      Location: {{project_location}}
      Service: {{service}}
      Quantity: {{quantity}}
      Dimensions: {{dimensions}}
      Budget: {{budget}}
      Reference link: {{reference_link}}
      Project details: {{project_details}}

      You can also use {{message}} for the full formatted request.
   f. In EmailJS account settings, find your Public Key.
   g. Put the values in js/config.js:
      publicKey: "YOUR_PUBLIC_KEY"
      serviceId: "YOUR_SERVICE_ID"
      templateId: "YOUR_TEMPLATE_ID"
   h. Test using a real submission before announcing the website.

   EmailJS exposes a public key in the browser by design. Do not put private keys, passwords,
   or secret credentials in frontend files. Configure EmailJS allowed origins/domain restrictions
   and any available rate limits / anti-abuse controls. EmailJS may have plan limits or charges.
   If EmailJS is unavailable or not configured, the email button falls back to the visitor's
   mail application (mailto), which requires the visitor to send the message manually.

5) Gallery: 200+ local images
   Put your image files in images/gallery/. Example:
      images/gallery/gate-001.jpg
      images/gallery/railing-001.jpg
   Then edit js/gallery-data.js. Add one entry per photo:
      { title: "Modern steel gate", category: "Gates",
        image: "images/gallery/gate-001.jpg", alt: "Modern steel gate installed at a home" },
   Use commas between entries. Categories automatically become filter buttons.
   There is no hard-coded 200-image limit. Images use loading="lazy" and async decoding.
   Optimize photos before uploading (WebP or compressed JPG is recommended) so the site loads
   quickly. The included sample filenames are examples only; add real files at those paths or
   replace the records with your own images. Only publish images you own or have permission to use.

6) Business information / SEO
   Replace example.com canonical URL in HTML and sitemap.xml with your real domain.
   Update the business name, service area, phone, email, metadata, and structured data as needed.
   Review about.html and service descriptions so they accurately describe your business.
   Update robots.txt sitemap address to match your real domain.

HOSTING
-------
This is a static HTML/CSS/JavaScript website. Upload the folder contents to any static web host
or ordinary web hosting public directory (often called public_html). No Vercel and no custom
backend are required. A web host/domain is not included.

The contact form's automatic email option relies on the external EmailJS service. WhatsApp opens
the customer's WhatsApp app/web with a prefilled message; the customer must press Send.
Browsers may restrict popup windows; the WhatsApp button opens the link from a direct click.

IMAGE / THIRD-PARTY NOTES
-------------------------
The home page includes remote Unsplash background photos as temporary visual placeholders.
Replace them with your own licensed project photos if desired. Google Fonts and EmailJS load from
third-party CDNs when online. The local gallery is stored in your uploaded website folder.

CHECKLIST BEFORE LAUNCH
-----------------------
[ ] Confirm WhatsApp business number is correct and can receive messages.
[ ] Set business email and configure/test EmailJS.
[ ] Replace Facebook and TikTok placeholder URLs.
[ ] Add your real gallery images and remove sample records whose files do not exist.
[ ] Replace example.com in canonical URLs, structured data, sitemap.xml and robots.txt.
[ ] Test on a phone and desktop, and submit one test quote via each channel.

BRANDING UPDATE
---------------
Business name: Jonatoh Fabricators
Slogan: Sisi ndo madaktari wa chuma.
Palette: black, metallic silver and gold/yellow, with blue welding-light accents.
The supplied logo is stored at images/jonatoh-logo.jpeg. Four generated example gallery images
are stored in images/gallery/. They are illustrative; replace them with real photos of your own
work before advertising them as completed projects.
