<template>
  <div class="landing-view">
    <HeaderNav />

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <img 
        src="@/assets/zona-entrada.jpg" 
        alt="Nexus Coworking" 
        class="hero-image"
      />
      <div class="hero-content">
        <h1 class="hero-title">Bienvenido a Nexus</h1>
        <p class="hero-subtitle">Tu espacio de trabajo y creatividad en Aranjuez</p>
        <RouterLink to="/espacios" class="btn-hero">
          Reserva tu espacio
        </RouterLink>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section">
      <div class="container">
        <div class="about-grid">
          <div class="about-image">
            <img 
              src="@/assets/zona-oficinas.jpg" 
              alt="Interior Nexus"
            />
          </div>
          <div class="about-content">
            <h2>Librería y Coworking en el Corazón de Aranjuez</h2>
            <p>
              Nexus es más que un espacio de trabajo. Somos una comunidad vibrante donde 
              profesionales, freelancers y emprendedores se reúnen para crear, colaborar 
              y crecer juntos.
            </p>
            <p>
              Con más de 5000 libros en nuestra librería integrada y espacios diseñados 
              para inspirar, ofrecemos el ambiente perfecto para convertir tus ideas en realidad.
            </p>
            <div class="stats">
              <div class="stat-item">
                <span class="stat-number">3</span>
                <span class="stat-label">Plantas</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">15</span>
                <span class="stat-label">Espacios</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">200+</span>
                <span class="stat-label">Miembros</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">¿Por qué elegir Nexus?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📚</div>
            <h3>Librería Integrada</h3>
            <p>Más de 5000 títulos a tu disposición para inspirarte y aprender</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💼</div>
            <h3>Espacios Flexibles</h3>
            <p>Desde hot desks hasta oficinas privadas, encuentra tu espacio ideal</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">☕</div>
            <h3>Café de Especialidad</h3>
            <p>Café ilimitado y snacks para mantenerte productivo todo el día</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🌐</div>
            <h3>Internet 1Gbps</h3>
            <p>Conexión de alta velocidad y redes seguras para tu trabajo</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🤝</div>
            <h3>Comunidad Activa</h3>
            <p>Networking, eventos y workshops para impulsar tu crecimiento</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>Ambiente Inspirador</h3>
            <p>Diseño cuidado que fomenta la creatividad y el bienestar</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery-section">
      <div class="container">
        <h2 class="section-title">Nuestro Espacio</h2>
        <div class="gallery-grid">
          <div class="gallery-item">
            <img 
              src="@/assets/zona-entrada.jpg" 
              alt="Área de coworking"
            />
            <div class="gallery-overlay">
              <span>Área de Coworking</span>
            </div>
          </div>
          <div class="gallery-item">
            <img 
              src="@/assets/sala-reuniones-cervantes.jpg" 
              alt="Sala de reuniones"
            />
            <div class="gallery-overlay">
              <span>Salas de Reuniones</span>
            </div>
          </div>
          <div class="gallery-item">
            <img 
              src="@/assets/zona-relax.jpg" 
              alt="Zona de relajación"
            />
            <div class="gallery-overlay">
              <span>Zona de Relajación</span>
            </div>
          </div>
          <div class="gallery-item">
            <img 
              src="@/assets/zona-libreria.jpg" 
              alt="Librería"
            />
            <div class="gallery-overlay">
              <span>Librería</span>
            </div>
          </div>
          <div class="gallery-item">
            <img 
              src="@/assets/zona-oficinas.jpg" 
              alt="Oficinas privadas"
            />
            <div class="gallery-overlay">
              <span>Oficinas Privadas</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2>¿Listo para unirte a Nexus?</h2>
        <p>Descubre todos nuestros espacios y encuentra el perfecto para ti</p>
        <RouterLink to="/espacios" class="btn-cta">
          Explorar espacios
        </RouterLink>
      </div>
    </section>

    <FooterNav />
  </div>
</template>

<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import FooterNav from '@/components/FooterNav.vue'
</script>

<style scoped>
.landing-view {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;
  padding: 2rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.btn-hero {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: white;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.btn-hero:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

/* About Section */
.about-section {
  padding: 5rem 0;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.about-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.about-content h2 {
  font-size: 2.5rem;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.about-content p {
  color: #555;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: #667eea;
  line-height: 1;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Features Section */
.features-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #1a1a2e;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #1a1a2e;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* Gallery Section */
.gallery-section {
  padding: 5rem 0;
  background: white;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.gallery-item {
  position: relative;
  height: 300px;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
}

.gallery-item:first-child {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 2rem;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

/* CTA Section */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  color: white;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.btn-cta {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: white;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.btn-cta:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .gallery-item:first-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .about-content h2,
  .section-title,
  .cta-section h2 {
    font-size: 2rem;
  }

  .stats {
    gap: 1rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .gallery-item:first-child {
    grid-column: 1;
  }
}
</style>