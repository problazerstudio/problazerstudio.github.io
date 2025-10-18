document.addEventListener('DOMContentLoaded', function() {
    
    initFilterButtons();
    initEventRegistration();
    initNewsletterForm();
    initSmoothScrolling();
    initAnimations();

    function initFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                if (document.querySelector('.project-grid')) {
                    filterProjects(filter);
                } else if (document.querySelector('.article-list')) {
                    filterArticles(filter);
                }
            });
        });
    }

    function filterProjects(filter) {
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            const categories = project.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, 10);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    }

    function filterArticles(filter) {
        const articles = document.querySelectorAll('.article-item');
        
        articles.forEach(article => {
            const categories = article.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                article.style.display = 'block';
                setTimeout(() => {
                    article.style.opacity = '1';
                    article.style.transform = 'translateX(0)';
                }, 10);
            } else {
                article.style.opacity = '0';
                article.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    article.style.display = 'none';
                }, 300);
            }
        });
    }

    function initEventRegistration() {
        const registerButtons = document.querySelectorAll('.register-btn');
        
        registerButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const eventName = this.getAttribute('data-event');
                
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #8B5CF6, #7C3AED);
                    color: white;
                    padding: 1.5rem 2rem;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                `;
                notification.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="font-size: 2rem;">✅</div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">Registration Successful!</div>
                            <div style="font-size: 0.9rem; opacity: 0.9;">You're registered for ${eventName}</div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
            });
        });
    }

    function initNewsletterForm() {
        const form = document.getElementById('newsletter-form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #06B6D4, #0891B2);
                    color: white;
                    padding: 1.5rem 2rem;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4);
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                `;
                notification.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="font-size: 2rem;">🎉</div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">Welcome to the Community!</div>
                            <div style="font-size: 0.9rem; opacity: 0.9;">Check ${email} for confirmation</div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(notification);
                this.reset();
                
                setTimeout(() => {
                    notification.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 4000);
            });
        }
    }

    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card, .project-card, .article-item, .glass-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            shape.style.animationDelay = `${index * 2}s`;
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        .project-card, .article-item {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});
async function getSalesforceToken() {
    const clientId = '3MVG9rZjd7MXFdLiRvpf9OFyAwy6tmRgyWM32i7V2MBlB4K.Yu4zq6X5V7xk46hulc1EyiWsWTv8UKRNKJPFX';
    const clientSecret = 'A1EAEF479C5441F5901AF71FD221ECE6946A17316A96503681317E0675A434BD';
    const authUrl = 'https://orgfarm-47cedb95ea-dev-ed.develop.my.salesforce.com/services/oauth2/token';

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    const response = await fetch(authUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    });

    if (!response.ok) throw new Error(`Token fetch failed: ${response.status}`);
    return response.json();
}

// Step 2: Call lightningoutsingleaccess using the token
async function getLightningOutSingleAccess() {
    try {
        const tokenData = await getSalesforceToken();

        const instanceUrl = tokenData.instance_url;
        const accessToken = tokenData.access_token;
        const appId = '1UsgK00000000rFSAQ'; // e.g. 06Pxx000000XXXXX

        const params = new URLSearchParams();
        params.append('access_token', decodeURIComponent(accessToken));
        params.append('lightning_out_app_id', appId);

        const response = await fetch(
            `${instanceUrl}/services/oauth2/lightningoutsingleaccess`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params
            }
        );

        console.log('Status:', response.status);
        const data = await response.json();
        console.log('Success:', data);

    } catch (error) {
        console.error('Error:', error);
    }
}

// Step 3: Trigger on page load or when needed
document.addEventListener('DOMContentLoaded', getLightningOutSingleAccess);
