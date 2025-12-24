const Confetti = (() => {
    function fire(element) {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        for (let i = 0; i < 50; i++) {
            createParticle(x, y);
        }
    }

    function createParticle(x, y) {
        const particle = document.createElement('div');
        document.body.appendChild(particle);

        const size = Math.random() * 8 + 4;
        const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.position = 'fixed';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const destinationX = (Math.random() - 0.5) * 300;
        const destinationY = (Math.random() - 0.5) * 300;
        const rotation = Math.random() * 520;
        const duration = Math.random() * 1000 + 500;

        const animation = particle.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${destinationX}px, ${destinationY}px) rotate(${rotation}deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            delay: Math.random() * 200
        });

        animation.onfinish = () => {
            particle.remove();
        };
    }

    return { fire };
})();
