export const metadata = {
  title: 'Mon Projet',
  description: 'Setup Docker + Drizzle + Better Auth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}