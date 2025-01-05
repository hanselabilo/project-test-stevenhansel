import "@styles/globals.css";

export const metadata = {
  title: "Suitmedia FE Internship Test",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
