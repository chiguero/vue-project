<template>
  <header class="header-nav">
    <div class="container">
      <nav class="navbar">
        <RouterLink to="/" class="logo">
          <span class="logo-text">Nexus</span>
        </RouterLink>
        
        <ul class="nav-links">
          <li><RouterLink to="/">Inicio</RouterLink></li>
          <li><RouterLink to="/espacios">Espacios</RouterLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.header-nav {
  position: sticky;
  top: 0;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  padding: 1rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #1a1a2e;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s ease;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.nav-links a:hover {
  color: #667eea;
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-links a.router-link-active {
  color: #667eea;
}

.nav-links a.router-link-active::after {
  width: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    width: 100%;
  }
}
</style>