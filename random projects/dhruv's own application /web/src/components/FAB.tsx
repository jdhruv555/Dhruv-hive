type FABProps = {
  label?: string
  onClick?: () => void
}

export default function FAB({ label = 'Add', onClick }: FABProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 z-50 rounded-full bg-primary-600 text-white shadow-glow hover:bg-primary-500 active:scale-95 hover:scale-105 transition-transform px-5 py-3"
      aria-label={label}
    >
      {label}
    </button>
  )
}


