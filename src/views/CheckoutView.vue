<template>
  <div class="checkout-page">
    <HeaderNav />
    
    <section class="page-header">
      <div class="container">
        <h1>Confirmar Reserva</h1>
        <p>Estás a un paso de tu nuevo espacio de trabajo</p>
      </div>
    </section>

    <section class="checkout-content">
      <div class="container">
        <div v-if="!reservationComplete" class="checkout-layout">
          <!-- Columna izquierda - Formulario -->
          <div class="form-section">
            <div class="section-card">
              <h2>Información Personal</h2>
              <form @submit.prevent="completeReservation">
                <div class="form-row">
                  <div class="form-group">
                    <label for="nombre">Nombre completo *</label>
                    <input 
                      type="text" 
                      id="nombre" 
                      v-model="formData.nombre"
                      required
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      v-model="formData.email"
                      required
                      placeholder="juan@ejemplo.com"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="telefono">Teléfono *</label>
                    <input 
                      type="tel" 
                      id="telefono" 
                      v-model="formData.telefono"
                      required
                      placeholder="+34 600 000 000"
                    />
                  </div>
                  <div class="form-group">
                    <label for="empresa">Empresa (opcional)</label>
                    <input 
                      type="text" 
                      id="empresa" 
                      v-model="formData.empresa"
                      placeholder="Mi empresa S.L."
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="mensaje">¿Algún requerimiento especial?</label>
                  <textarea 
                    id="mensaje" 
                    v-model="formData.mensaje"
                    rows="4"
                    placeholder="Cuéntanos si necesitas algo especial para tu espacio..."
                  ></textarea>
                </div>
              </form>
            </div>

            <div class="section-card">
              <h2>Detalles de la Reserva</h2>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="fecha-inicio">Fecha de inicio *</label>
                  <input 
                    type="date" 
                    id="fecha-inicio" 
                    v-model="formData.fechaInicio"
                    required
                    :min="minDate"
                  />
                </div>
                <div class="form-group">
                  <label for="duracion">Duración *</label>
                  <select id="duracion" v-model="formData.duracion" required>
                    <option value="1-mes">1 mes</option>
                    <option value="3-meses">3 meses</option>
                    <option value="6-meses">6 meses (-5%)</option>
                    <option value="12-meses">12 meses (-10%)</option>
                  </select>
                </div>
              </div>

              <div class="info-box">
                <div class="info-icon">ℹ️</div>
                <div>
                  <strong>Política de cancelación:</strong>
                  <p>Puedes cancelar hasta 24h antes del inicio sin coste. Renovación automática mensual, cancelable con 7 días de antelación.</p>
                </div>
              </div>
            </div>

            <div class="section-card">
              <h2>Método de Pago</h2>
              
              <div class="payment-methods">
                <label class="payment-method" :class="{ active: formData.metodoPago === 'tarjeta' }">
                  <input type="radio" value="tarjeta" v-model="formData.metodoPago" />
                  <div class="method-content">
                    <span class="method-icon">💳</span>
                    <span class="method-name">Tarjeta de crédito/débito</span>
                  </div>
                </label>
                
                <label class="payment-method" :class="{ active: formData.metodoPago === 'transferencia' }">
                  <input type="radio" value="transferencia" v-model="formData.metodoPago" />
                  <div class="method-content">
                    <span class="method-icon">🏦</span>
                    <span class="method-name">Transferencia bancaria</span>
                  </div>
                </label>
              </div>

              <div v-if="formData.metodoPago === 'tarjeta'" class="card-form">
                <div class="form-group">
                  <label for="card-number">Número de tarjeta</label>
                  <input 
                    type="text" 
                    id="card-number" 
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                  />
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="expiry">Fecha de caducidad</label>
                    <input 
                      type="text" 
                      id="expiry" 
                      placeholder="MM/AA"
                      maxlength="5"
                    />
                  </div>
                  <div class="form-group">
                    <label for="cvv">CVV</label>
                    <input 
                      type="text" 
                      id="cvv" 
                      placeholder="123"
                      maxlength="3"
                    />
                  </div>
                </div>
              </div>

              <div v-if="formData.metodoPago === 'transferencia'" class="transfer-info">
                <p>Recibirás un email con los detalles de la cuenta bancaria para realizar la transferencia.</p>
              </div>

              <div class="terms-check">
                <label>
                  <input type="checkbox" v-model="formData.acceptTerms" required />
                  <span>Acepto los <a href="#" @click.prevent>términos y condiciones</a> y la <a href="#" @click.prevent>política de privacidad</a></span>
                </label>
              </div>

              <button 
                @click="completeReservation" 
                class="submit-button"
                :disabled="!isFormValid"
              >
                <span class="button-icon">✓</span>
                Confirmar Reserva
              </button>
            </div>
          </div>

          <!-- Columna derecha - Resumen -->
          <aside class="summary-section">
            <div class="summary-card">
              <h3>Resumen de Reserva</h3>
              
              <div v-if="selectedSpace" class="space-summary">
                <img :src="selectedSpace.image" :alt="selectedSpace.name" class="space-image" />
                <h4>{{ selectedSpace.name }}</h4>
                <p class="space-type">{{ selectedSpace.type }}</p>
                
                <div class="space-info">
                  <div class="info-item">
                    <span class="icon">🏢</span>
                    <span>Planta {{ selectedSpace.floor }}</span>
                  </div>
                  <div class="info-item">
                    <span class="icon">👥</span>
                    <span>{{ selectedSpace.capacity }} {{ selectedSpace.capacity === 1 ? 'persona' : 'personas' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="icon">📏</span>
                    <span>{{ selectedSpace.size }}m²</span>
                  </div>
                </div>
              </div>

              <div class="price-breakdown">
                <div class="price-row">
                  <span>Precio base</span>
                  <span>{{ selectedSpace?.price }}€/{{ selectedSpace?.period }}</span>
                </div>
                <div class="price-row" v-if="discount > 0">
                  <span>Descuento ({{ discountPercentage }}%)</span>
                  <span class="discount">-{{ discount }}€</span>
                </div>
                <div class="price-row">
                  <span>IVA (21%)</span>
                  <span>{{ vat }}€</span>
                </div>
                <div class="price-row total">
                  <span>Total</span>
                  <span>{{ totalPrice }}€</span>
                </div>
              </div>

              <div class="summary-features">
                <div class="feature-item" v-for="feature in selectedSpace?.features" :key="feature">
                  <span class="check-icon">✓</span>
                  <span>{{ feature }}</span>
                </div>
              </div>

              <div class="help-box">
                <div class="help-icon">💬</div>
                <div>
                  <strong>¿Necesitas ayuda?</strong>
                  <p>Contacta con nosotros:<br>
                  📞 +34 918 92 XX XX<br>
                  ✉️ info@nexusaranjuez.es</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <!-- Confirmación exitosa -->
        <div v-else class="confirmation-success">
          <div class="success-card">
            <div class="success-icon">✓</div>
            <h2>¡Reserva Confirmada!</h2>
            <p class="confirmation-number">Número de confirmación: <strong>#NEX-{{ confirmationNumber }}</strong></p>
            
            <div class="success-message">
              <p>Hemos enviado un email de confirmación a <strong>{{ formData.email }}</strong> con todos los detalles de tu reserva.</p>
              <p>Recibirás las instrucciones de acceso 24 horas antes del inicio de tu reserva.</p>
            </div>

            <div class="next-steps">
              <h3>Próximos pasos:</h3>
              <ol>
                <li>Revisa el email de confirmación</li>
                <li v-if="formData.metodoPago === 'transferencia'">Realiza la transferencia bancaria en las próximas 48h</li>
                <li>Descarga tu código de acceso el día anterior</li>
                <li>¡Disfruta de tu espacio en Nexus!</li>
              </ol>
            </div>

            <div class="action-buttons">
              <router-link to="/" class="button secondary">
                Volver al inicio
              </router-link>
              <router-link to="/espacios" class="button primary">
                Ver más espacios
              </router-link>
            </div>

            <div class="calendar-reminder">
              <p>📅 <a href="#" @click.prevent>Añadir a mi calendario</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FooterNav />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import HeaderNav from '../components/HeaderNav.vue'
import FooterNav from '../components/FooterNav.vue'

const route = useRoute()
const reservationComplete = ref(false)
const confirmationNumber = ref('')

const formData = ref({
  nombre: '',
  email: '',
  telefono: '',
  empresa: '',
  mensaje: '',
  fechaInicio: '',
  duracion: '1-mes',
  metodoPago: 'tarjeta',
  acceptTerms: false
})

// Fecha mínima (hoy)
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Datos de espacios (mismo array que en EspaciosView)
const spaces = ref([
  {
    id: 1,
    name: 'Escritorio Individual Classic',
    type: 'Escritorio',
    floor: 1,
    capacity: 1,
    size: 2,
    price: 150,
    period: 'mes',
    image: 'https://images.unsplash.com/photo-1497366672149-e5e4b4d34eb3?w=600&q=80',
    features: ['WiFi', 'Enchufe', 'Luz natural', 'Armario']
  },
  {
    id: 2,
    name: 'Escritorio Individual Premium',
    type: 'Escritorio',
    floor: 3,
    capacity: 1,
    size: 3,
    price: 220,
    period: 'mes',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80',
    features: ['WiFi', 'Monitor 27"', 'Silla ergonómica', 'Luz natural']
  },
  {
    id: 3,
    name: 'Mesa Colaborativa Nexus',
    type: 'Mesa compartida',
    floor: 2,
    capacity: 4,
    size: 12,
    price: 90,
    period: 'mes',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
    features: ['WiFi', 'Café incluido', 'Zona común', 'Biblioteca']
  },
  {
    id: 4,
    name: 'Sala de Reuniones Cervantes',
    type: 'Sala privada',
    floor: 2,
    capacity: 6,
    size: 20,
    price: 35,
    period: 'hora',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80',
    features: ['Pantalla 55"', 'Videoconferencia', 'Pizarra', 'Café incluido']
  },
  {
    id: 5,
    name: 'Oficina Privada Quijote',
    type: 'Oficina',
    floor: 3,
    capacity: 4,
    size: 25,
    price: 850,
    period: 'mes',
    image: 'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=600&q=80',
    features: ['Privado', 'WiFi dedicado', 'Armarios', 'Cerradura']
  },
  {
    id: 6,
    name: 'Sala de Reuniones Biblioteca',
    type: 'Sala privada',
    floor: 1,
    capacity: 8,
    size: 30,
    price: 45,
    period: 'hora',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
    features: ['Pantalla 65"', 'Sistema audio', '8 sillas', 'Catering']
  },
  {
    id: 7,
    name: 'Espacio Coworking Open',
    type: 'Espacio abierto',
    floor: 2,
    capacity: 12,
    size: 80,
    price: 12,
    period: 'día',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    features: ['WiFi', 'Café gratis', 'Sofás', 'Terraza']
  },
  {
    id: 8,
    name: 'Cabina Individual Focus',
    type: 'Cabina',
    floor: 1,
    capacity: 1,
    size: 3,
    price: 8,
    period: 'hora',
    image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=600&q=80',
    features: ['Insonorizada', 'WiFi', 'Escritorio', 'Iluminación']
  },
  {
    id: 9,
    name: 'Sala Brainstorming Ideas',
    type: 'Sala creativa',
    floor: 2,
    capacity: 6,
    size: 22,
    price: 38,
    period: 'hora',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80',
    features: ['Pizarras', 'Post-its', 'Rotuladores', 'Mesas modulares']
  },
  {
    id: 10,
    name: 'Oficina Premium Executive',
    type: 'Oficina',
    floor: 3,
    capacity: 8,
    size: 45,
    price: 1400,
    period: 'mes',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    features: ['Terraza', 'WiFi dedicado', 'Mobiliario premium', 'Zona reuniones']
  },
  {
    id: 11,
    name: 'Mesa Hot Desk Flexible',
    type: 'Hot desk',
    floor: 1,
    capacity: 1,
    size: 2,
    price: 180,
    period: 'mes',
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&q=80',
    features: ['Flexible', 'WiFi', 'Acceso 24/7', 'Taquilla']
  },
  {
    id: 12,
    name: 'Sala Videoconferencia Pro',
    type: 'Sala técnica',
    floor: 3,
    capacity: 4,
    size: 18,
    price: 50,
    period: 'hora',
    image: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=600&q=80',
    features: ['Cámara 4K', 'Iluminación LED', 'Fondo verde', 'Micrófono']
  },
  {
    id: 13,
    name: 'Rincón Lectura Terraza',
    type: 'Espacio lectura',
    floor: 3,
    capacity: 2,
    size: 8,
    price: 6,
    period: 'hora',
    image: 'https://images.unsplash.com/photo-1521587765099-8835e7201186?w=600&q=80',
    features: ['Terraza', 'Sillones', 'Vistas', 'Plantas']
  },
  {
    id: 14,
    name: 'Sala Workshop Grande',
    type: 'Sala eventos',
    floor: 1,
    capacity: 20,
    size: 60,
    price: 80,
    period: 'hora',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    features: ['Proyector', 'Sillas apilables', 'Sistema audio', 'Catering']
  },
  {
    id: 15,
    name: 'Zona Café Networking',
    type: 'Espacio social',
    floor: 1,
    capacity: 10,
    size: 35,
    price: 8,
    period: 'día',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
    features: ['Café incluido', 'Sofás', 'Mesas altas', 'WiFi']
  }
])

const selectedSpace = computed(() => {
  const spaceId = parseInt(route.params.id)
  return spaces.value.find(s => s.id === spaceId)
})

const discountPercentage = computed(() => {
  if (formData.value.duracion === '6-meses') return 5
  if (formData.value.duracion === '12-meses') return 10
  return 0
})

const discount = computed(() => {
  if (!selectedSpace.value) return 0
  const basePrice = selectedSpace.value.price
  return Math.round((basePrice * discountPercentage.value) / 100)
})

const subtotal = computed(() => {
  if (!selectedSpace.value) return 0
  return selectedSpace.value.price - discount.value
})

const vat = computed(() => {
  return Math.round(subtotal.value * 0.21)
})

const totalPrice = computed(() => {
  return subtotal.value + vat.value
})

const isFormValid = computed(() => {
  return (
    formData.value.nombre.trim() !== '' &&
    formData.value.email.trim() !== '' &&
    formData.value.telefono.trim() !== '' &&
    formData.value.fechaInicio !== '' &&
    formData.value.acceptTerms
  )
})

const completeReservation = () => {
  if (!isFormValid.value) {
    alert('Por favor, completa todos los campos obligatorios')
    return
  }
  
  // Generar número de confirmación
  confirmationNumber.value = Math.floor(100000 + Math.random() * 900000).toString()
  
  // Mostrar confirmación
  reservationComplete.value = true
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  // Verificar que el espacio existe
  if (!selectedSpace.value) {
    // Redirigir a espacios si no se encuentra el espacio
    // router.push('/espacios')
  }
})
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.page-header {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 4rem 0 3rem;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.page-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.checkout-content {
  padding: 3rem 0;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  align-items: start;
}

/* Formulario */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section-card {
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.section-card h2 {
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: #1a1a2e;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.9rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.info-box {
  display: flex;
  gap: 1rem;
  background: #f0f4ff;
  padding: 1.25rem;
  border-radius: 10px;
  margin-top: 1.5rem;
}

.info-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.info-box strong {
  color: #667eea;
  display: block;
  margin-bottom: 0.5rem;
}

.info-box p {
  color: #555;
  line-height: 1.6;
  font-size: 0.9rem;
  margin: 0;
}

/* Métodos de pago */
.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.payment-method {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-method:hover {
  border-color: #667eea;
}

.payment-method.active {
  border-color: #667eea;
  background: #f0f4ff;
}

.payment-method input[type="radio"] {
  margin-right: 1rem;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.method-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.method-icon {
  font-size: 1.5rem;
}

.method-name {
  font-weight: 600;
  color: #333;
}

.card-form,
.transfer-info {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

.transfer-info p {
  color: #666;
  line-height: 1.6;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
}

.terms-check {
  margin-top: 1.5rem;
}

.terms-check label {
  display: flex;
  align-items: start;
  gap: 0.75rem;
  cursor: pointer;
}

.terms-check input[type="checkbox"] {
  margin-top: 0.25rem;
  width: 18px;
  height: 18px;
  cursor: pointer;
  flex-shrink: 0;
}

.terms-check span {
  color: #555;
  line-height: 1.6;
  font-size: 0.95rem;
}

.terms-check a {
  color: #667eea;
  text-decoration: underline;
}

.submit-button {
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-icon {
  font-size: 1.3rem;
}

/* Resumen */
.summary-section {
  position: sticky;
  top: 100px;
}

.summary-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.summary-card h3 {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: #1a1a2e;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.space-summary {
  margin-bottom: 1.5rem;
}

.space-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.space-summary h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #1a1a2e;
}

.space-type {
  color: #667eea;
  font-weight: 600;
  margin-bottom: 1rem;
}

.space-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;
  font-size: 0.95rem;
}

.icon {
  font-size: 1.1rem;
}

.price-breakdown {
  padding: 1.5rem 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 1.5rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: #555;
}

.price-row.total {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #f0f0f0;
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a2e;
}

.discount {
  color: #27ae60;
  font-weight: 600;
}

.summary-features {
  margin-bottom: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
}

.check-icon {
  color: #27ae60;
  font-weight: 700;
}

.help-box {
  display: flex;
  gap: 1rem;
  background: #f0f4ff;
  padding: 1.25rem;
  border-radius: 10px;
}

.help-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.help-box strong {
  color: #667eea;
  display: block;
  margin-bottom: 0.5rem;
}

.help-box p {
  color: #555;
  line-height: 1.6;
  font-size: 0.85rem;
  margin: 0;
}

/* Confirmación */
.confirmation-success {
  max-width: 700px;
  margin: 0 auto;
}

.success-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.success-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  margin: 0 auto 2rem;
  box-shadow: 0 10px 30px rgba(39, 174, 96, 0.3);
}

.success-card h2 {
  font-size: 2.2rem;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.confirmation-number {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.confirmation-number strong {
  color: #667eea;
  font-size: 1.2rem;
}

.success-message {
  background: #f0f4ff;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  text-align: left;
}

.success-message p {
  color: #555;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.success-message p:last-child {
  margin-bottom: 0;
}

.next-steps {
  text-align: left;
  margin-bottom: 2rem;
}

.next-steps h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #1a1a2e;
}

.next-steps ol {
  padding-left: 1.5rem;
}

.next-steps li {
  margin-bottom: 0.75rem;
  color: #555;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.button {
  flex: 1;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
}

.button.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
}

.button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.button.secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.button.secondary:hover {
  background: #f0f4ff;
}

.calendar-reminder {
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

.calendar-reminder a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.calendar-reminder a:hover {
  text-decoration: underline;
}

@media (max-width: 1024px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
  
  .summary-section {
    position: static;
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .section-card {
    padding: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>