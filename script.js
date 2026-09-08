// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. Menu Mobile (Hamburger) ===
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // === 2. Sticky Header ===
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // === 3. Scroll Suave para links âncora ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Compensar a altura do header fixo (aprox 70px)
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // === 4. Animações ao aparecer na tela (Intersection Observer) ===
    const faders = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // === 5. Validação Simples de Formulário ===
    const form = document.getElementById('agendamentoForm');
    
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validar Nome
            const nome = document.getElementById('nome');
            if(nome.value.trim() === '') {
                nome.parentElement.classList.add('error');
                isValid = false;
            } else {
                nome.parentElement.classList.remove('error');
            }
            
            // Validar Telefone
            const telefone = document.getElementById('telefone');
            if(telefone.value.trim() === '') {
                telefone.parentElement.classList.add('error');
                isValid = false;
            } else {
                telefone.parentElement.classList.remove('error');
            }
            
            if(isValid) {
                // Simular envio
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Enviando...';
                btn.disabled = true;
                
                setTimeout(() => {
                    document.getElementById('form-success').style.display = 'block';
                    btn.textContent = originalText;
                    btn.disabled = false;
                    form.reset();
                    
                    // Esconder mensagem após 5 segundos
                    setTimeout(() => {
                        document.getElementById('form-success').style.display = 'none';
                    }, 5000);
                    
                }, 1500);
            }
        });
        
        // Limpar erro ao digitar
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.parentElement.classList.remove('error');
            });
        });
    }
});