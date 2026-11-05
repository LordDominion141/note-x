import './globals.css'

export default function RootLayout({children}) {
    return (
        <html lang='en'>
            <body className="min-h-screen overflow-x-clip p-0 m-0 flex flex-col">{children}</body>
        </html>
    );
}