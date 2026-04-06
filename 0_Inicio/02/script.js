/**
 * FRONT-END SECURITY & VALIDATION LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        // 1. String Escaping for XSS Protection
        const sanitizeInput = (str) => {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                "/": '&#x2F;'
            };
            const reg = /[&<>"'/]/ig;
            return str.replace(reg, (match) => map[match]);
        };

        // 2. Custom Validity Messages
        const emailInput = document.getElementById('userEmail');
        emailInput.addEventListener('input', () => {
            if (emailInput.validity.patternMismatch) {
                emailInput.setCustomValidity("Por favor, incluye una extensión de dominio válida como .com o .org");
            } else {
                emailInput.setCustomValidity("");
            }
        });

        // 3. Form Submission Handling
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Honeypot check (Anti-Bot)
            const honeyPot = document.getElementById('_technical_trap').value;
            if (honeyPot !== "") {
                console.warn("Bot detected via Honeypot.");
                return; // Stop bot submission silently
            }

            // HTML5 Validation check
            if (!contactForm.checkValidity()) {
                e.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }

            // 4. Submission Throttling (Prevention of Form Spamming)
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';

            // 5. Sanitize data before processing
            const formData = {
                name: sanitizeInput(document.getElementById('userName').value),
                email: sanitizeInput(document.getElementById('userEmail').value),
                message: sanitizeInput(document.getElementById('userMessage').value)
            };

            // Simulate server request (Success response)
            setTimeout(() => {
                formStatus.classList.remove('d-none', 'alert-danger');
                formStatus.classList.add('alert', 'alert-success');
                formStatus.innerHTML = '<strong>¡Éxito!</strong> Tu mensaje ha sido enviado de forma segura.';
                
                // Reset form
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                
                // Keep button disabled to prevent double submission
                submitBtn.innerHTML = 'Enviado';
                console.log("Sanitized Data Sent:", formData);
            }, 1500);
        });
    }
});
