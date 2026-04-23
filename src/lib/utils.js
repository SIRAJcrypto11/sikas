import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility for merging tailwind classes safely
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format number to Rupiah (IDR)
 */
export function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Generate a transaction number
 * Format: TR-YYYYMMDD-XXXX (random suffix)
 */
export function generateTransactionNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "")
  const random = Math.floor(1000 + Math.random() * 9000)
  return `TR-${date}-${random}`
}
