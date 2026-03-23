// src/components/PageLayout.jsx
// Ye wrapper har page ke upar 64px padding deta hai
// taaki content navbar ke neeche se start na ho

export default function PageLayout({ children }) {
  return (
    <div className="pt-[64px] min-h-screen">
      {children}
    </div>
  );
}