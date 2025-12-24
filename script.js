document.addEventListener('DOMContentLoaded', () => {
    
    // Select all cards
    const cards = document.querySelectorAll('.card');
    const globalBar = document.getElementById('global-bar');
    const globalPercentText = document.getElementById('global-percent');

    // Toast Notification System
    const messages = [
        "I knew you will do it! 💖",
        "I am proud of you my LOve! ❤️",
        "I am proud of Wifey! 💍",
        "Keep doing great! ✨",
        "You are amazing! 🌟",
        "One step closer to victory! 🏆"
    ];

    function showToast() {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) existingToast.remove();

        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        
        // Random message
        const message = messages[Math.floor(Math.random() * messages.length)];
        toast.innerHTML = `<span>${message}</span>`;
        
        document.body.appendChild(toast);

        // Animate In with slight delay to ensure DOM paint
        requestAnimationFrame(() => {
            setTimeout(() => toast.classList.add('show'), 10);
        });

        // Animate Out
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    function updateProgress() {
        let totalGlobalCheckboxes = 0;
        let totalGlobalChecked = 0;

        cards.forEach(card => {
            const checkboxes = card.querySelectorAll('input[type="checkbox"]');
            const miniBar = card.querySelector('.mini-bar-fill');
            const percentText = card.querySelector('.card-percent');

            const total = checkboxes.length;
            const checked = Array.from(checkboxes).filter(cb => cb.checked).length;

            // Update Card Progress
            const percentage = total === 0 ? 0 : Math.round((checked / total) * 100);
            const prevPercentage = parseInt(percentText.textContent) || 0;
            
            miniBar.style.width = `${percentage}%`;
            percentText.textContent = `${percentage}%`;
            
            // Trigger Confetti and Toast if hitting 100% just now
            if (percentage === 100 && prevPercentage < 100) {
                 if (window.Confetti) window.Confetti.fire(card);
                 showToast();
            }

            // Accumulate Global Stats
            totalGlobalCheckboxes += total;
            totalGlobalChecked += checked;
        });

        // Update Global Progress
        const globalPercentage = totalGlobalCheckboxes === 0 ? 0 : Math.round((totalGlobalChecked / totalGlobalCheckboxes) * 100);
        globalBar.style.width = `${globalPercentage}%`;
        globalPercentText.textContent = `${globalPercentage}%`;
    }

    // Attach Event Listeners
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });

    const scroller = document.getElementById('scroller');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const swipeHint = document.getElementById('swipe-hint');

    // Dismiss Swipe Hint on Interaction
    if (scroller && swipeHint) {
        const dismissHint = () => {
            swipeHint.classList.add('hidden');
            // Remove listeners once dismissed to save performance
            scroller.removeEventListener('scroll', dismissHint);
            scroller.removeEventListener('touchstart', dismissHint);
        };

        scroller.addEventListener('scroll', dismissHint, { passive: true });
        scroller.addEventListener('touchstart', dismissHint, { passive: true });
    }

    if (prevBtn && nextBtn && scroller) {
        prevBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: -window.innerWidth * 0.8, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' });
        });
    }

    // Initial calculation
    updateProgress();
});
