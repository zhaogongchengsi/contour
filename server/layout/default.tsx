

export default function DefaultLayout({ children, meta }: LayoutProps) {
  const { title, description } = meta;
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="stylesheet" href="/public/reset.css" />
      </head>
      <main>{children}</main>
    </html>
  );
}
