document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const name = document.getElementById('name').value;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Securing...';
            
            try {
                const response = await fetch('https://baget.ai/api/public/databases/4abaad6c-e928-4604-896d-e9d4fa31bf24/rows', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        data: {
                            email: email,
                            name: name,
                            source: 'Landing Page MVP'
                        }
                    }),
                });

                if (response.ok) {
                    formMessage.textContent = 'Welcome to the inner circle. We will reach out when the fire is ready.';
                    formMessage.className = 'form-message success';
                    signupForm.reset();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                formMessage.textContent = 'Something went wrong. Please try again or email us directly.';
                formMessage.className = 'form-message error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Secure My Spot';
            }
        });
    }
});