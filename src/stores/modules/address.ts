import type { AddressItem } from '@/types/address'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore('address', () => {
  const selectedAddress = ref<AddressItem>()

  const changeSelectedAddress = (value: AddressItem) => {
    selectedAddress.value = value
  }

  return { selectedAddress, changeSelectedAddress }
})
