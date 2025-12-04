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
                  <label for="fecha-inicio">Fecha *</label>
                  <input 
                    type="date" 
                    id="fecha-inicio" 
                    v-model="formData.fechaInicio"
                    required
                    :min="minDate"
                  />
                </div>
              </div>

              <!-- Selector de Horas -->
              <div class="hours-selector">
                <label class="hours-label">
                  Selecciona las horas que necesitas * 
                  <span v-if="formData.fechaInicio" class="schedule-info">({{ scheduleMessage }})</span>
                </label>
                <div v-if="!formData.fechaInicio" class="hours-hint">
                  <p>📅 Por favor, selecciona primero una fecha para ver las horas disponibles</p>
                </div>
                <div v-else class="hours-grid">
                  <div 
                    v-for="hour in availableHours" 
                    :key="hour.value"
                    :class="['hour-card', { 
                      active: isHourSelected(hour.value),
                      disabled: isHourDisabled(hour.value)
                    }]"
                    @click="toggleHour(hour.value)"
                  >
                    <div class="hour-icon">{{ hour.icon }}</div>
                    <div class="hour-value">{{ hour.label }}</div>
                  </div>
                </div>
                <div v-if="selectedHours.length > 0" class="hours-summary">
                  <p class="hours-count">
                    <strong>{{ selectedHours.length }}</strong> {{ selectedHours.length === 1 ? 'hora seleccionada' : 'horas seleccionadas' }}
                  </p>
                  <p class="time-range">{{ timeRange }}</p>
                </div>
                <div v-else-if="formData.fechaInicio" class="hours-hint">
                  <p>💡 Haz clic en las horas que necesitas. Puedes seleccionar horas consecutivas o individuales.</p>
                </div>
              </div>

              <div class="info-box">
                <div class="info-icon">ℹ️</div>
                <div>
                  <strong>Política de cancelación:</strong>
                  <p>Puedes cancelar hasta 24h antes del inicio sin coste.</p>
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
                  <label for="card-number">Número de tarjeta *</label>
                  <input 
                    type="text" 
                    id="card-number"
                    :value="formData.cardNumber"
                    @input="formatCardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                    required
                  />
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="expiry">Fecha de caducidad *</label>
                    <input 
                      type="text" 
                      id="expiry"
                      :value="formData.cardExpiry"
                      @input="formatCardExpiry"
                      placeholder="MM/AA"
                      maxlength="5"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="cvv">CVV *</label>
                    <input 
                      type="text" 
                      id="cvv"
                      :value="formData.cardCVV"
                      @input="formatCVV"
                      placeholder="123"
                      maxlength="4"
                      required
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
                  <div v-if="formData.fechaInicio" class="info-item">
                    <span class="icon">📅</span>
                    <span>{{ formatDate(formData.fechaInicio) }}</span>
                  </div>
                  <div v-if="selectedHours.length > 0" class="info-item">
                    <span class="icon">🕐</span>
                    <span>{{ timeRange }}</span>
                  </div>
                </div>
              </div>

              <div class="price-breakdown">
                <div class="price-row">
                  <span>Precio por hora</span>
                  <span>{{ selectedSpace?.price }}€/h</span>
                </div>
                <div class="price-row" v-if="selectedHours.length > 0">
                  <span>Horas ({{ selectedHours.length }})</span>
                  <span>{{ basePrice }}€</span>
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
                  📞 +34 918 123 456<br>
                  ✉️ info@nexuscoworking.es</p>
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
              <p>Reserva confirmada para el día <strong>{{ formatDate(formData.fechaInicio) }}</strong> de <strong>{{ timeRange }}</strong>.</p>
            </div>

            <div class="next-steps">
              <h3>Próximos pasos:</h3>
              <ol>
                <li>Revisa el email de confirmación</li>
                <li v-if="formData.metodoPago === 'transferencia'">Realiza la transferencia bancaria en las próximas 48h</li>
                <li>Llega 5 minutos antes de tu hora reservada</li>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import HeaderNav from '@/components/HeaderNav.vue'
import FooterNav from '@/components/FooterNav.vue'

const route = useRoute()

// Todas las horas posibles (8:00 - 21:00)
const allHours = [
  { value: 8, label: '08:00', icon: '🕗' },
  { value: 9, label: '09:00', icon: '🕘' },
  { value: 10, label: '10:00', icon: '🕙' },
  { value: 11, label: '11:00', icon: '🕚' },
  { value: 12, label: '12:00', icon: '🕛' },
  { value: 13, label: '13:00', icon: '🕐' },
  { value: 14, label: '14:00', icon: '🕑' },
  { value: 15, label: '15:00', icon: '🕒' },
  { value: 16, label: '16:00', icon: '🕓' },
  { value: 17, label: '17:00', icon: '🕔' },
  { value: 18, label: '18:00', icon: '🕕' },
  { value: 19, label: '19:00', icon: '🕖' },
  { value: 20, label: '20:00', icon: '🕗' },
  { value: 21, label: '21:00', icon: '🕘' },
]

// Estado
const selectedSpace = ref(null)
const selectedHours = ref([])
const reservationComplete = ref(false)
const confirmationNumber = ref('')

const formData = ref({
  nombre: '',
  email: '',
  telefono: '',
  empresa: '',
  fechaInicio: '',
  mensaje: '',
  metodoPago: 'tarjeta',
  acceptTerms: false,
  cardNumber: '',
  cardExpiry: '',
  cardCVV: ''
})

// Datos de espacios
const spaces = [
  {
    id: 1,
    name: 'Escritorio Individual Classic',
    type: 'Hot Desk',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    floor: 1,
    capacity: 1,
    size: 2,
    price: 5,
    features: ['WiFi 1Gbps', 'Café ilimitado', 'Taquilla']
  },
  {
    id: 2,
    name: 'Escritorio Individual Premium',
    type: 'Dedicated Desk',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
    floor: 3,
    capacity: 1,
    size: 4,
    price: 8,
    features: ['WiFi 1Gbps', 'Monitor 24"', 'Taquilla privada']
  },
  {
    id: 3,
    name: 'Mesa Colaborativa Nexus',
    type: 'Coworking',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80',
    floor: 2,
    capacity: 4,
    size: 12,
    price: 20,
    features: ['WiFi 1Gbps', 'Pizarra', 'Ambiente dinámico']
  },
  {
    id: 4,
    name: 'Sala Reuniones Cervantes',
    type: 'Sala Reuniones',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80',
    floor: 2,
    capacity: 6,
    size: 20,
    price: 35,
    features: ['TV 55"', 'Videoconferencia', 'Pizarra digital']
  },
  {
    id: 5,
    name: 'Oficina Privada Quijote',
    type: 'Oficina Privada',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80',
    floor: 3,
    capacity: 4,
    size: 25,
    price: 45,
    features: ['Amueblada', 'Ventanas', 'Cerradura digital']
  },
  {
    id: 6,
    name: 'Sala Reuniones Biblioteca',
    type: 'Sala Reuniones',
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&q=80',
    floor: 1,
    capacity: 8,
    size: 30,
    price: 45,
    features: ['Proyector', 'Sistema audio', 'Catering disponible']
  },
  {
    id: 7,
    name: 'Espacio Coworking Open',
    type: 'Coworking',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
    floor: 2,
    capacity: 12,
    size: 80,
    price: 30,
    features: ['WiFi', 'Café', 'Ambiente dinámico']
  },
  {
    id: 8,
    name: 'Cabina Individual Focus',
    type: 'Phone Booth',
    image: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=600&q=80',
    floor: 1,
    capacity: 1,
    size: 2,
    price: 8,
    features: ['Insonorizada', 'Escritorio', 'Toma corriente']
  },
  {
    id: 9,
    name: 'Sala Brainstorming Ideas',
    type: 'Sala Reuniones',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
    floor: 2,
    capacity: 6,
    size: 22,
    price: 38,
    features: ['Pizarras murales', 'Post-its', 'Ambiente creativo']
  },
  {
    id: 10,
    name: 'Oficina Premium Executive',
    type: 'Oficina Privada',
    image: 'https://images.unsplash.com/photo-1497366672149-e5e4b4d34eb3?w=600&q=80',
    floor: 3,
    capacity: 8,
    size: 40,
    price: 65,
    features: ['Vistas', 'Mobiliario premium', 'Sala reuniones incluida']
  },
  {
    id: 11,
    name: 'Mesa Hot Desk Flexible',
    type: 'Hot Desk',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    floor: 1,
    capacity: 1,
    size: 2,
    price: 6,
    features: ['Acceso 24/7', 'WiFi', 'Café']
  },
  {
    id: 12,
    name: 'Sala Videoconferencia Pro',
    type: 'Sala Reuniones',
    image: 'https://images.unsplash.com/photo-1573167243872-43c6433b9d40?w=600&q=80',
    floor: 3,
    capacity: 4,
    size: 18,
    price: 50,
    features: ['Cámara 4K', 'Micrófonos', 'Iluminación profesional']
  },
  {
    id: 13,
    name: 'Rincón Lectura Terraza',
    type: 'Zona Relajación',
    image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&q=80',
    floor: 3,
    capacity: 2,
    size: 10,
    price: 6,
    features: ['Terraza', 'Wifi', 'Zona tranquila']
  },
  {
    id: 14,
    name: 'Sala Workshop Grande',
    type: 'Sala Eventos',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',
    floor: 1,
    capacity: 20,
    size: 60,
    price: 80,
    features: ['Proyector', 'Sistema audio', 'Sillas modulares']
  },
  {
    id: 15,
    name: 'Zona Café Networking',
    type: 'Zona Común',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&q=80',
    floor: 1,
    capacity: 10,
    size: 35,
    price: 15,
    features: ['Café premium', 'Sofás', 'Ambiente relajado']
  }
]

// Computed
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Horas disponibles según el día de la semana
const availableHours = computed(() => {
  if (!formData.value.fechaInicio) return allHours

  const date = new Date(formData.value.fechaInicio)
  const dayOfWeek = date.getDay() // 0=Domingo, 1=Lunes, ..., 6=Sábado

  if (dayOfWeek === 0) {
    // Domingo: 10:00 - 15:00 (última hora reservable: 14:00)
    return allHours.filter(h => h.value >= 10 && h.value <= 14)
  } else if (dayOfWeek === 6) {
    // Sábado: 9:00 - 20:00 (última hora reservable: 19:00)
    return allHours.filter(h => h.value >= 9 && h.value <= 19)
  } else {
    // Lunes - Viernes: 8:00 - 21:00 (última hora reservable: 20:00)
    return allHours.filter(h => h.value >= 8 && h.value <= 20)
  }
})

// Mensaje de horario según el día
const scheduleMessage = computed(() => {
  if (!formData.value.fechaInicio) return 'Selecciona una fecha para ver las horas disponibles'

  const date = new Date(formData.value.fechaInicio)
  const dayOfWeek = date.getDay()

  if (dayOfWeek === 0) {
    return 'Domingo: 10:00 - 15:00'
  } else if (dayOfWeek === 6) {
    return 'Sábado: 9:00 - 20:00'
  } else {
    return 'Lunes - Viernes: 8:00 - 21:00'
  }
})

const basePrice = computed(() => {
  if (!selectedSpace.value || selectedHours.value.length === 0) return 0
  return selectedSpace.value.price * selectedHours.value.length
})

const discountPercentage = computed(() => {
  const hours = selectedHours.value.length
  if (hours >= 8) return 15
  if (hours >= 6) return 10
  if (hours >= 4) return 5
  return 0
})

const discount = computed(() => {
  return Math.round((basePrice.value * discountPercentage.value) / 100)
})

const subtotal = computed(() => {
  return basePrice.value - discount.value
})

const vat = computed(() => {
  return Math.round(subtotal.value * 0.21)
})

const totalPrice = computed(() => {
  return subtotal.value + vat.value
})

const timeRange = computed(() => {
  if (selectedHours.value.length === 0) return ''
  
  const sorted = [...selectedHours.value].sort((a, b) => a - b)
  const start = sorted[0]
  const end = sorted[sorted.length - 1]
  
  return `${String(start).padStart(2, '0')}:00 - ${String(end + 1).padStart(2, '0')}:00`
})

const isFormValid = computed(() => {
  const basicValid = formData.value.nombre &&
         formData.value.email &&
         formData.value.telefono &&
         formData.value.fechaInicio &&
         selectedHours.value.length > 0 &&
         formData.value.acceptTerms

  // Si el método de pago es tarjeta, validar campos de tarjeta
  if (formData.value.metodoPago === 'tarjeta') {
    return basicValid && 
           formData.value.cardNumber && 
           formData.value.cardExpiry && 
           formData.value.cardCVV
  }

  return basicValid
})

// Funciones
const toggleHour = (hour) => {
  const index = selectedHours.value.indexOf(hour)
  if (index > -1) {
    selectedHours.value.splice(index, 1)
  } else {
    selectedHours.value.push(hour)
  }
}

const isHourSelected = (hour) => {
  return selectedHours.value.includes(hour)
}

const isHourDisabled = (hour) => {
  // Por ahora no hay horas deshabilitadas, pero se puede implementar
  return false
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const completeReservation = () => {
  // Validación de campos básicos
  if (!formData.value.nombre.trim()) {
    alert('❌ Por favor, introduce tu nombre completo')
    return
  }

  if (!formData.value.email.trim()) {
    alert('❌ Por favor, introduce tu email')
    return
  }

  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    alert('❌ Por favor, introduce un email válido')
    return
  }

  if (!formData.value.telefono.trim()) {
    alert('❌ Por favor, introduce tu teléfono')
    return
  }

  if (!formData.value.fechaInicio) {
    alert('❌ Por favor, selecciona una fecha para tu reserva')
    return
  }

  if (selectedHours.value.length === 0) {
    alert('❌ Por favor, selecciona al menos una hora')
    return
  }

  // Validación de método de pago
  if (formData.value.metodoPago === 'tarjeta') {
    if (!formData.value.cardNumber.trim()) {
      alert('❌ Por favor, introduce el número de tu tarjeta')
      return
    }

    if (formData.value.cardNumber.replace(/\s/g, '').length < 13) {
      alert('❌ El número de tarjeta debe tener al menos 13 dígitos')
      return
    }

    if (!formData.value.cardExpiry.trim()) {
      alert('❌ Por favor, introduce la fecha de caducidad de tu tarjeta')
      return
    }

    // Validar formato MM/AA
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
    if (!expiryRegex.test(formData.value.cardExpiry)) {
      alert('❌ La fecha de caducidad debe tener el formato MM/AA (ejemplo: 12/25)')
      return
    }

    if (!formData.value.cardCVV.trim()) {
      alert('❌ Por favor, introduce el CVV de tu tarjeta')
      return
    }

    if (formData.value.cardCVV.length < 3) {
      alert('❌ El CVV debe tener al menos 3 dígitos')
      return
    }
  }

  if (!formData.value.acceptTerms) {
    alert('❌ Debes aceptar los términos y condiciones para continuar')
    return
  }

  // Si todo está bien, generar número de confirmación y mostrar éxito
  confirmationNumber.value = Math.random().toString(36).substring(2, 8).toUpperCase()
  
  // Mostrar confirmación
  reservationComplete.value = true
  
  // Scroll al inicio
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Formatear automáticamente la fecha de caducidad
const formatCardExpiry = (event) => {
  let value = event.target.value.replace(/\D/g, '') // Solo números
  
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4)
  }
  
  formData.value.cardExpiry = value
}

// Formatear número de tarjeta con espacios
const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\s/g, '').replace(/\D/g, '') // Solo números
  
  // Añadir espacios cada 4 dígitos
  const parts = []
  for (let i = 0; i < value.length; i += 4) {
    parts.push(value.substring(i, i + 4))
  }
  
  formData.value.cardNumber = parts.join(' ')
}

// Solo permitir números en CVV
const formatCVV = (event) => {
  formData.value.cardCVV = event.target.value.replace(/\D/g, '')
}

// Limpiar horas seleccionadas si cambia la fecha y algunas horas ya no están disponibles
const cleanInvalidHours = () => {
  if (!formData.value.fechaInicio) return
  
  const validHourValues = availableHours.value.map(h => h.value)
  selectedHours.value = selectedHours.value.filter(hour => validHourValues.includes(hour))
}

// Montar
onMounted(() => {
  const spaceId = parseInt(route.params.id)
  selectedSpace.value = spaces.find(s => s.id === spaceId)
})

// Watch para limpiar horas cuando cambia la fecha
watch(() => formData.value.fechaInicio, () => {
  cleanInvalidHours()
})
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  font-size: 1.1rem;
  opacity: 0.95;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.checkout-content {
  padding: 3rem 0;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 2rem;
}

/* Formulario */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.section-card h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #1a1a2e;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
  font-size: 0.95rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.875rem;
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
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group textarea {
  resize: vertical;
}

/* Selector de Horas */
.hours-selector {
  margin-top: 1.5rem;
}

.hours-label {
  display: block;
  margin-bottom: 1rem;
  color: #555;
  font-weight: 500;
  font-size: 0.95rem;
}

.schedule-info {
  color: #667eea;
  font-weight: 600;
  font-size: 0.9rem;
}

.hours-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.hour-card {
  background: white;
  border: 3px solid #e0e0e0;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.hour-card:hover:not(.disabled) {
  transform: translateY(-3px);
  border-color: #667eea;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
}

.hour-card.active {
  border-color: #667eea;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.hour-card.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.hour-icon {
  font-size: 1.8rem;
  margin-bottom: 0.3rem;
}

.hour-value {
  font-weight: 600;
  font-size: 1rem;
}

.hours-summary {
  background: #f0f4ff;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
}

.hours-count {
  font-size: 1.1rem;
  color: #1a1a2e;
  margin-bottom: 0.3rem;
}

.hours-count strong {
  color: #667eea;
  font-size: 1.3rem;
}

.time-range {
  color: #667eea;
  font-weight: 600;
  font-size: 1.2rem;
}

.hours-hint {
  background: #fff9e6;
  padding: 1rem;
  border-radius: 10px;
  border-left: 4px solid #ffd700;
}

.hours-hint p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
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

/* Métodos de Pago */
.payment-methods {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.payment-method {
  cursor: pointer;
}

.payment-method input[type="radio"] {
  display: none;
}

.method-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.payment-method.active .method-content {
  border-color: #667eea;
  background: #f0f4ff;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
}

.method-icon {
  font-size: 1.5rem;
}

.method-name {
  font-weight: 500;
  color: #1a1a2e;
}

.card-form,
.transfer-info {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

.transfer-info p {
  color: #555;
  line-height: 1.6;
}

.terms-check {
  margin: 1.5rem 0;
}

.terms-check label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.terms-check input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.terms-check a {
  color: #667eea;
  text-decoration: none;
}

.terms-check a:hover {
  text-decoration: underline;
}

.submit-button {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.button-icon {
  font-size: 1.2rem;
}

/* Resumen Sticky */
.summary-section {
  position: sticky;
  top: 100px;
  height: fit-content;
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

  .hours-grid {
    grid-template-columns: repeat(4, 1fr);
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

  .payment-methods {
    grid-template-columns: 1fr;
  }

  .hours-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .hours-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>