import { Container } from "react-bootstrap";
import Head from 'next/head';
import BlogNavbar from "./Navbar";
import { useTheme } from "providers/ThemeProvider";

export default function PageLayout({ children, className }) {
    console.log("classes",className);
    const{theme, toggleTheme} = useTheme();
    return (
        <div className={theme.type}>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;700;900&display=swap" rel="stylesheet" />
            </Head>
            <Container>
                <BlogNavbar 
                    theme={theme}
                    toggleTheme={toggleTheme}
                />

                <div className={`page-wrapper ${className}`}>
                    {children}
                </div>

                <footer className="page-footer">
                    <div>
                        <a href="#">courses</a>{' | '}
                        <a href="#">github</a>{' | '}
                        <a href="#">facebook</a>
                    </div>
                </footer>
            </Container>
            <style jsx global>
                {
                    `
                    html, body{
                        background:${theme.background};
                    }
                    `
                }
            </style>
        </div>
    )
}