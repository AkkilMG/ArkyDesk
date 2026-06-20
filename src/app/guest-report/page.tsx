import GuestCreate from '@/components/ticket/guestCreate'

export const metadata = {
  title: 'Guest Report'
}

export default function GuestReportPage() {
  return (
    <main className="p-6">
      <div className="max-w-4xl mx-auto">
        <GuestCreate />
      </div>
    </main>
  )
}
