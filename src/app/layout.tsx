import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body className="min-h-lvh w-fit min-w-screen">
                <main>{children}</main>
            </body>
        </html>
    );
}
