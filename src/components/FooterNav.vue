<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Logo y descripción -->
        <div class="footer-section">
          <h3 class="footer-logo">Nexus</h3>
          <p class="footer-description">
            Tu espacio de trabajo y creatividad en el corazón de Aranjuez
          </p>
        </div>

        <!-- Contacto -->
        <div class="footer-section">
          <h4>Contacto</h4>
          <ul class="footer-links">
            <li>📍 Calle de la Biblioteca 12</li>
            <li>📮 28300 Aranjuez, Madrid</li>
            <li>📧 info@nexuscoworking.es</li>
            <li>📞 +34 918 123 456</li>
          </ul>
        </div>

        <!-- Horarios -->
        <div class="footer-section">
          <h4>Horarios</h4>
          <ul class="footer-links">
            <li>Lunes - Viernes: 8:00 - 21:00</li>
            <li>Sábado: 9:00 - 20:00</li>
            <li>Domingo: 10:00 - 15:00</li>
          </ul>
        </div>

        <!-- Redes sociales -->
        <div class="footer-section">
          <h4>Síguenos</h4>
          <div class="social-links">
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Instagram</a>
            <a href="#" class="social-link">LinkedIn</a>
            <a href="#" class="social-link">Twitter</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 Nexus Coworking. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer {
  background: #1a1a2e;
  color: #ffffff;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 1rem;
}

.footer-logo {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  color: #cccccc;
  line-height: 1.6;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
  color: #cccccc;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-link {
  color: #cccccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #667eea;
}

.footer-bottom {
  border-top: 1px solid #333;
  padding-top: 1.5rem;
  text-align: center;
  color: #999;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-section {
    text-align: center;
  }

  .social-links {
    align-items: center;
  }
}
</style>