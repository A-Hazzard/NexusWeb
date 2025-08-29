export type ContactFormData = {
  name: string
  email: string
  message: string
}

export type EmailJSFormData = {
  from_name: string
  reply_to: string
  message: string
}

export type FormStatus = {
  type: 'success' | 'error' | null
  message: string
}

export type ContactFormProps = {
  onSubmit: (data: ContactFormData) => Promise<void>
  isSubmitting: boolean
  formStatus: FormStatus
}

export type EmailJSResponse = {
  status: number
  text: string
}

export type ValidationError = {
  field: keyof ContactFormData
  message: string
}

export type ContactSectionProps = {
  title: string
  subtitle: string
  contactInfo: {
    email: string
    phone: string
    address?: string
  }
  socialLinks: {
    platform: string
    url: string
    icon: string
  }[]
} 