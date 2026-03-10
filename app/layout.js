export const metadata = {
  title: 'Vault — Demo Login App',
  description: 'A simple authenticated app demo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
