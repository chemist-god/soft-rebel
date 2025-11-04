// SoftRebel Main JavaScript
class SoftRebelApp {
    constructor() {
        this.analysisData = null;
        this.currentStream = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeTestimonialSlider();
        this.setupScrollAnimations();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.md\\:hidden button');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', this.toggleMobileMenu);
        }

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Add to cart buttons
        document.querySelectorAll('.card-hover button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showNotification('Product added to cart!');
            });
        });
    }

    initializeAnimations() {
        // Animate elements on page load
        anime({
            targets: '.fade-in',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: anime.stagger(200),
            easing: 'easeOutQuart'
        });

        // Floating animation for hero image
        anime({
            targets: '.floating-element',
            translateY: [-10, 10],
            duration: 4000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });

        // Text gradient animation
        this.animateTextGradient();
    }

    animateTextGradient() {
        const gradientElements = document.querySelectorAll('.text-gradient');
        gradientElements.forEach(element => {
            anime({
                targets: element,
                backgroundPosition: ['0% 50%', '100% 50%'],
                duration: 3000,
                loop: true,
                direction: 'alternate',
                easing: 'easeInOutSine'
            });
        });
    }

    initializeTestimonialSlider() {
        if (typeof Splide !== 'undefined') {
            new Splide('#testimonial-slider', {
                type: 'loop',
                perPage: 3,
                perMove: 1,
                gap: '2rem',
                autoplay: true,
                interval: 5000,
                breakpoints: {
                    1024: { perPage: 2 },
                    640: { perPage: 1 }
                }
            }).mount();
        }
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    toggleMobileMenu() {
        // Mobile menu implementation
        console.log('Mobile menu toggled');
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg z-50 transform translate-x-full';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        anime({
            targets: notification,
            translateX: [100, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });

        // Animate out after 3 seconds
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 100],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => {
                    document.body.removeChild(notification);
                }
            });
        }, 3000);
    }
}

// AI Analysis Functions
function startAnalysis() {
    const analysisSection = document.getElementById('analysis-section');
    analysisSection.scrollIntoView({ behavior: 'smooth' });
}

function initiateCamera() {
    const cameraPlaceholder = document.getElementById('camera-placeholder');
    const cameraFeed = document.getElementById('camera-feed');
    const startButton = document.getElementById('start-camera');
    
    // Simulate camera activation
    startButton.textContent = 'Initializing...';
    startButton.disabled = true;
    
    setTimeout(() => {
        cameraPlaceholder.style.display = 'none';
        cameraFeed.style.display = 'block';
        cameraFeed.src = 'resources/ai-analysis-interface.jpg';
        
        // Start analysis after camera is "active"
        setTimeout(() => {
            startAnalysisProcess();
        }, 2000);
    }, 1500);
}

function startAnalysisProcess() {
    const cameraDiv = document.getElementById('analysis-camera');
    const progressDiv = document.getElementById('analysis-progress');
    const resultsDiv = document.getElementById('analysis-results');
    const introDiv = document.getElementById('analysis-intro');
    
    // Hide camera, show progress
    cameraDiv.style.display = 'none';
    progressDiv.classList.remove('hidden');
    
    // Simulate analysis progress
    let progress = 0;
    const progressText = document.getElementById('progress-text');
    const progressCircle = document.querySelector('.progress-ring-circle');
    const statusText = document.getElementById('analysis-status');
    
    const analysisSteps = [
        'Analyzing skin tone...',
        'Measuring hydration levels...',
        'Assessing texture quality...',
        'Generating recommendations...'
    ];
    
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        
        progressText.textContent = Math.round(progress) + '%';
        const offset = 251.2 - (251.2 * progress / 100);
        progressCircle.style.strokeDashoffset = offset;
        
        // Update status text
        if (progress > 25 && currentStep === 0) {
            currentStep = 1;
            statusText.textContent = analysisSteps[currentStep];
        } else if (progress > 50 && currentStep === 1) {
            currentStep = 2;
            statusText.textContent = analysisSteps[currentStep];
        } else if (progress > 75 && currentStep === 2) {
            currentStep = 3;
            statusText.textContent = analysisSteps[currentStep];
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                showAnalysisResults();
            }, 500);
        }
    }, 200);
}

function showAnalysisResults() {
    const progressDiv = document.getElementById('analysis-progress');
    const resultsDiv = document.getElementById('analysis-results');
    const introDiv = document.getElementById('analysis-intro');
    
    progressDiv.classList.add('hidden');
    resultsDiv.classList.remove('hidden');
    introDiv.classList.add('hidden');
    
    // Animate progress bars
    setTimeout(() => {
        document.getElementById('tone-bar').style.width = '85%';
        document.getElementById('hydration-bar').style.width = '92%';
        document.getElementById('texture-bar').style.width = '78%';
    }, 300);
    
    // Set analysis data
    window.app.analysisData = {
        skinTone: 'Deep Rich',
        hydrationLevel: 'Optimal',
        textureLevel: 'Smooth',
        recommendations: ['Purifying Cleanser', 'Hydrating Moisturizer', 'Radiance Serum']
    };
}

function generateRoutine() {
    const routineSection = document.getElementById('routine-section');
    routineSection.classList.remove('hidden');
    
    // Generate morning routine
    const morningRoutine = [
        { step: 1, product: 'Purifying Cleanser', description: 'Gentle morning cleanse' },
        { step: 2, product: 'Radiance Serum', description: 'Brightening treatment' },
        { step: 3, product: 'Hydrating Moisturizer', description: 'Daily hydration' }
    ];
    
    // Generate evening routine
    const eveningRoutine = [
        { step: 1, product: 'Purifying Cleanser', description: 'Deep evening cleanse' },
        { step: 2, product: 'Radiance Serum', description: 'Overnight repair' },
        { step: 3, product: 'Hydrating Moisturizer', description: 'Intensive hydration' },
        { step: 4, product: 'Rejuvenating Mask', description: 'Weekly treatment (2x/week)' }
    ];
    
    renderRoutine('morning-routine', morningRoutine);
    renderRoutine('evening-routine', eveningRoutine);
    
    routineSection.scrollIntoView({ behavior: 'smooth' });
    
    // Animate routine cards
    setTimeout(() => {
        anime({
            targets: '#routine-section .fade-in',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            delay: anime.stagger(200),
            easing: 'easeOutQuart'
        });
    }, 300);
}

function renderRoutine(containerId, routine) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    routine.forEach((item, index) => {
        const routineItem = document.createElement('div');
        routineItem.className = 'flex items-center p-4 bg-gray-50 rounded-xl';
        routineItem.innerHTML = `
            <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                ${item.step}
            </div>
            <div class="flex-1">
                <h4 class="font-bold text-gray-800">${item.product}</h4>
                <p class="text-gray-600 text-sm">${item.description}</p>
            </div>
        `;
        container.appendChild(routineItem);
    });
}

function viewProducts() {
    window.location.href = 'products.html';
}

function scrollToProducts() {
    document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SoftRebelApp();
});

// Utility functions for data visualization
function createSkinAnalysisChart(containerId, data) {
    if (typeof echarts !== 'undefined') {
        const chart = echarts.init(document.getElementById(containerId));
        
        const option = {
            backgroundColor: 'transparent',
            radar: {
                indicator: [
                    { name: 'Hydration', max: 100 },
                    { name: 'Texture', max: 100 },
                    { name: 'Tone Evenness', max: 100 },
                    { name: 'Elasticity', max: 100 },
                    { name: 'Brightness', max: 100 }
                ],
                axisLine: {
                    lineStyle: {
                        color: '#D4AF37'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(212, 175, 55, 0.3)'
                    }
                }
            },
            series: [{
                type: 'radar',
                data: [{
                    value: data,
                    areaStyle: {
                        color: 'rgba(212, 175, 55, 0.2)'
                    },
                    lineStyle: {
                        color: '#D4AF37'
                    },
                    itemStyle: {
                        color: '#D4AF37'
                    }
                }]
            }]
        };
        
        chart.setOption(option);
        return chart;
    }
}

// Export functions for global access
window.startAnalysis = startAnalysis;
window.initiateCamera = initiateCamera;
window.generateRoutine = generateRoutine;
window.viewProducts = viewProducts;
window.scrollToProducts = scrollToProducts;