export function setupFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';

  footer.innerHTML = `
    <div class="footer-container">
      <!-- Left Column: Google Map -->
      <div class="footer-left">
        <iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.995914750057!2d100.4976364!3d13.8450225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29b42d3b513fb%3A0x24d8a796bd1a0f90!2sToo%20Pla%20Aquarium%20Shop!5e0!3m2!1sen!2sth!4v1717395600000!5m2!1sen!2sth" 
  width="100%" 
  height="400" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy" 
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
      </div>

      <!-- Right Column: Contact Form and Social Links -->
      <div class="footer-right">
        <div class="footer-form">
          <h3>Contact Us</h3>
          <form id="contact-form">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        <div class="footer-social">
          <h3>Connect with Us</h3>
          <div class="social-icons">
            <a href="https://line.me" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="LINE" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-copy">
      <p>&copy; ${new Date().getFullYear()} Topla Aquarium. All rights reserved.</p>
    </div>
  `;

  // Handle form submission
  const form = footer.querySelector('#contact-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        alert('Message sent successfully!');
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Failed to send message. Please try again later.');
    }
  });

  return footer;
}