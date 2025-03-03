import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body className="min-h-lvh">
                <main>{children}</main>
            </body>
        </html>
    );
}
