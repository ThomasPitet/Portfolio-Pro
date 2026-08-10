/**
 * ==========================================================================
 * CardComponent — POO JavaScript Component
 * Dynamic Card Generator & Interactive Renderer
 * ==========================================================================
 */
class CardComponent {
    /**
     * @param {Object} options Configuration for card creation
     * @param {string} options.title Card title
     * @param {string} options.description Card summary text
     * @param {string} [options.icon] Icon text or class
     * @param {Array<string>} [options.tags] List of tech tags
     * @param {string} [options.category] Category label ('projet' | 'entreprise' | 'encours' | 'phare')
     * @param {Array<Object>} [options.links] CTA links [{label, url, type}]
     * @param {string} [options.badge] Optional badge text
     */
    constructor(options = {}) {
        this.title = options.title || 'Projet';
        this.description = options.description || '';
        this.icon = options.icon || 'Projet';
        this.tags = options.tags || [];
        this.category = options.category || 'projet';
        this.links = options.links || [];
        this.badge = options.badge || null;
        this.element = null;
    }

    /**
     * Render HTML Element for this card instance
     * @returns {HTMLElement}
     */
    render() {
        const card = document.createElement('div');
        const cardClass = this.category === 'entreprise' 
            ? 'entreprise-card' 
            : this.category === 'encours' 
            ? 'encours-card' 
            : 'proj-card';
            
        card.className = `${cardClass} reveal`;

        // Card Icon
        const iconDiv = document.createElement('div');
        iconDiv.className = `${cardClass}-icon`;
        iconDiv.textContent = this.icon;
        card.appendChild(iconDiv);

        // Title
        const h3 = document.createElement('h3');
        h3.textContent = this.title;
        card.appendChild(h3);

        // Description
        const p = document.createElement('p');
        p.textContent = this.description;
        card.appendChild(p);

        // Tags
        if (this.tags.length > 0) {
            const tagsDiv = document.createElement('div');
            tagsDiv.className = `${cardClass}-tags`;
            this.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = `${cardClass}-tag`;
                tagSpan.textContent = tag;
                tagsDiv.appendChild(tagSpan);
            });
            card.appendChild(tagsDiv);
        }

        // Badge or Links
        if (this.badge) {
            const badgeSpan = document.createElement('span');
            badgeSpan.className = 'encours-badge';
            badgeSpan.textContent = this.badge;
            card.appendChild(badgeSpan);
        } else if (this.links.length > 0) {
            const actionsDiv = document.createElement('div');
            actionsDiv.style.display = 'flex';
            actionsDiv.style.gap = '0.6rem';
            actionsDiv.style.flexWrap = 'wrap';
            actionsDiv.style.marginTop = 'auto';

            this.links.forEach(link => {
                const a = document.createElement('a');
                a.href = link.url;
                a.textContent = link.label;
                a.className = `btn btn-sm ${link.type === 'primary' ? 'btn-primary' : link.type === 'ghost' ? 'btn-ghost' : 'btn-outline'}`;
                if (link.external) {
                    a.target = '_blank';
                    a.rel = 'noopener';
                }
                actionsDiv.appendChild(a);
            });
            card.appendChild(actionsDiv);
        }

        this.element = card;
        this.attachInteractiveEffects();
        return card;
    }

    /**
     * Attach interactive subtle 3D tilt micro-animation on hover
     */
    attachInteractiveEffects() {
        if (!this.element) return;

        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = '';
        });
    }

    /**
     * Static Factory method to generate cards from HTML elements with data attributes
     * Usage: <div data-card data-title="Mon Projet" data-description="..." data-tags="PHP,MySQL" data-icon="Code"></div>
     */
    static autoInitFromDOM() {
        const placeholders = document.querySelectorAll('[data-card]');
        placeholders.forEach(placeholder => {
            const options = {
                title: placeholder.getAttribute('data-title'),
                description: placeholder.getAttribute('data-description'),
                icon: placeholder.getAttribute('data-icon') || 'Code',
                category: placeholder.getAttribute('data-category') || 'projet',
                tags: (placeholder.getAttribute('data-tags') || '').split(',').map(t => t.trim()).filter(Boolean),
                badge: placeholder.getAttribute('data-badge') || null,
                links: []
            };

            const linkUrl = placeholder.getAttribute('data-link-url');
            const linkText = placeholder.getAttribute('data-link-text') || 'Voir';
            const githubUrl = placeholder.getAttribute('data-github-url');

            if (linkUrl) {
                options.links.push({ label: linkText, url: linkUrl, type: 'outline' });
            }
            if (githubUrl) {
                options.links.push({ label: 'GitHub', url: githubUrl, type: 'ghost', external: true });
            }

            const cardComponent = new CardComponent(options);
            const cardElement = cardComponent.render();
            placeholder.replaceWith(cardElement);
        });

        // Attach interactive tilt effect to existing statically written cards as well
        document.querySelectorAll('.proj-card, .entreprise-card, .card, .encours-card').forEach(cardEl => {
            cardEl.addEventListener('mousemove', (e) => {
                const rect = cardEl.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -3;
                const rotateY = ((x - centerX) / centerX) * 3;

                cardEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            cardEl.addEventListener('mouseleave', () => {
                cardEl.style.transform = '';
            });
        });
    }
}

// Auto-initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    CardComponent.autoInitFromDOM();
});
