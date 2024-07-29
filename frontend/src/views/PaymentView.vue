<template>
  <div class="payment">
    <h2>{{ $t('premiumAccess') }}</h2>
    <div class="payment-form">
      <div class="form-group">
        <label for="card-number">
          <i class="fas fa-credit-card"></i> {{ $t('cardNumber') }}
        </label>
        <input type="text" id="card-number" v-model="cardNumber" placeholder="1234 5678 9012 3456">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="expiry-date">
            <i class="fas fa-calendar-alt"></i> {{ $t('expiryDate') }}
          </label>
          <input type="text" id="expiry-date" v-model="expiryDate" placeholder="MM/YY">
        </div>
        <div class="form-group">
          <label for="cvv">
            <i class="fas fa-lock"></i> {{ $t('cvv') }}
          </label>
          <input type="text" id="cvv" v-model="cvv" placeholder="123">
        </div>
      </div>
      <button @click="processPayment" class="pay-button">
        <i class="fas fa-lock"></i> {{ $t('payNow') }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'PaymentView',
  setup() {
    const store = useStore()
    const router = useRouter()
    const cardNumber = ref('')
    const expiryDate = ref('')
    const cvv = ref('')

    const processPayment = async () => {
      try {
        // Here you would typically integrate with a payment gateway
        // For this example, we'll just simulate a successful payment
        await store.dispatch('updatePremiumAccess')
        alert('Payment successful! You now have premium access.')
        router.push('/profile')
      } catch (error) {
        alert('Payment failed. Please try again.')
      }
    }

    return {
      cardNumber,
      expiryDate,
      cvv,
      processPayment
    }
  }
}
</script>

<style scoped>
.payment {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.payment-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.form-row .form-group {
  width: 48%;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.pay-button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
