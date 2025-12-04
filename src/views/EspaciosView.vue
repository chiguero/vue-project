<template>
  <div class="espacios-view">
    <HeaderNav />

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1>Nuestros Espacios</h1>
        <p>Encuentra el lugar perfecto para trabajar, crear y colaborar</p>
      </div>
    </section>

    <!-- Filtros y Espacios -->
    <section class="espacios-section">
      <div class="container">
        <div class="layout">
          <!-- Sidebar de Filtros -->
          <aside class="filters-sidebar">
            <h3>Filtrar espacios</h3>

            <!-- Filtro por Planta -->
            <div class="filter-group">
              <label>Por Planta</label>
              <select v-model="selectedFloor" class="filter-select">
                <option value="">Todas las plantas</option>
                <option value="1">Planta 1 - Entrada</option>
                <option value="2">Planta 2 - Colaborativa</option>
                <option value="3">Planta 3 - Premium</option>
              </select>
            </div>

            <!-- Filtro por Capacidad -->
            <div class="filter-group">
              <label>Por Capacidad</label>
              <select v-model="selectedCapacity" class="filter-select">
                <option value="">Todas las capacidades</option>
                <option value="1">1 persona</option>
                <option value="2-4">2-4 personas</option>
                <option value="5-8">5-8 personas</option>
                <option value="10+">10+ personas</option>
              </select>
            </div>

            <!-- Botón limpiar filtros -->
            <button @click="clearFilters" class="btn-clear">
              Limpiar filtros
            </button>

            <!-- Contador de resultados -->
            <div class="results-count">
              {{ filteredSpaces.length }} espacios encontrados
            </div>
          </aside>

          <!-- Grid de Espacios -->
          <div class="espacios-grid">
            <div 
              v-for="space in filteredSpaces" 
              :key="space.id" 
              class="space-card"
            >
              <div class="space-image">
                <img :src="space.image" :alt="space.name" />
                <span class="space-badge">{{ space.type }}</span>
              </div>

              <div class="space-content">
                <h3>{{ space.name }}</h3>
                <p class="space-description">{{ space.description }}</p>

                <div class="space-details">
                  <div class="detail-item">
                    <span class="icon">📍</span>
                    <span>Planta {{ space.floor }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="icon">👥</span>
                    <span>{{ space.capacity }} {{ space.capacity === 1 ? 'persona' : 'personas' }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="icon">📐</span>
                    <span>{{ space.size }} m²</span>
                  </div>
                </div>

                <div class="space-features">
                  <span 
                    v-for="feature in space.features" 
                    :key="feature" 
                    class="feature-tag"
                  >
                    {{ feature }}
                  </span>
                </div>

                <div class="space-footer">
                  <div class="space-price">
                    <span class="price">{{ space.price }}€</span>
                    <span class="period">/ {{ space.period }}</span>
                  </div>
                  <RouterLink 
                    :to="`/checkout/${space.id}`" 
                    class="btn-reserve"
                  >
                    Reservar
                  </RouterLink>
                </div>
              </div>
            </div>

            <!-- Mensaje si no hay resultados -->
            <div v-if="filteredSpaces.length === 0" class="no-results">
              <p>No se encontraron espacios con los filtros seleccionados</p>
              <button @click="clearFilters" class="btn-clear">
                Ver todos los espacios
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FooterNav />
  </div>
</template>

<script setup lang="js">
import { ref, computed } from 'vue'
import HeaderNav from '@/components/HeaderNav.vue'
import FooterNav from '@/components/FooterNav.vue'
import { spaces as allSpaces } from '@/data/espaciosData.js'

// Filtros
const selectedFloor = ref('')
const selectedCapacity = ref('')

// Datos de espacios
const spaces = ref(allSpaces)

// Computed: espacios filtrados
const filteredSpaces = computed(() => {
  return spaces.value.filter(space => {
    // Filtro por planta
    if (selectedFloor.value && space.floor !== parseInt(selectedFloor.value)) {
      return false
    }

    // Filtro por capacidad
    if (selectedCapacity.value) {
      const capacity = space.capacity
      const selectedCap = parseInt(selectedCapacity.value)
      
      if (selectedCapacity.value === '1' && capacity !== 1) return false
      if (selectedCapacity.value === '2-4' && (capacity < 2 || capacity > 4)) return false
      if (selectedCapacity.value === '5-10' && (capacity >= 5 && capacity <= 10)) return true
      if (selectedCapacity.value === '10+' && capacity >= 10) return true
      
      return false
    }

    return true
  })
})

// Limpiar filtros
const clearFilters = () => {
  selectedFloor.value = ''
  selectedCapacity.value = ''
}
</script>

<style scoped>
.espacios-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-section p {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Espacios Section */
.espacios-section {
  flex: 1;
  padding: 3rem 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
}

/* Sidebar Filtros */
.filters-sidebar {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.filters-sidebar h3 {
  margin-bottom: 1.5rem;
  color: #1a1a2e;
  font-size: 1.3rem;
}

.filter-group {
  margin-bottom: 1.5rem;
}

.filter-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
  font-size: 0.95rem;
}

.filter-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: white;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
}

.btn-clear {
  width: 100%;
  padding: 0.75rem;
  background: #f0f4ff;
  color: #667eea;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.btn-clear:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.results-count {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

/* Grid de Espacios */
.espacios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.space-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.space-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.space-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.space-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.space-card:hover .space-image img {
  transform: scale(1.1);
}

.space-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.space-content {
  padding: 1.5rem;
}

.space-content h3 {
  color: #1a1a2e;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.space-description {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.space-details {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #555;
  font-size: 0.9rem;
}

.icon {
  font-size: 1rem;
}

.space-features {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.feature-tag {
  background: #f0f4ff;
  color: #667eea;
  padding: 0.3rem 0.7rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
}

.space-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.space-price {
  display: flex;
  flex-direction: column;
}

.price {
  font-size: 1.8rem;
  font-weight: 700;
  color: #667eea;
}

.period {
  color: #999;
  font-size: 0.9rem;
}

.btn-reserve {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-reserve:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

/* No Results */
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.no-results p {
  color: #666;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .filters-sidebar {
    position: static;
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }

  .espacios-grid {
    grid-template-columns: 1fr;
  }

  .space-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .btn-reserve {
    text-align: center;
  }
}
</style>