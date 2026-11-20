# GBS Interiors admin guide

## Sign in

1. Open `/admin/login` on the deployed website.
2. Enter the admin password configured by the site operator.
3. Use **Sign out** when finished. The session expires after eight hours.

The admin pages are private and omitted from search results and the sitemap.

## Edit showcase projects

1. Open **Projects** in the admin area.
2. Select an existing project, or choose **Add project**.
3. Edit its title, URL slug, type, location, and description.
4. Paste HTTPS photo URLs, one per line. The first URL is the cover; reorder the URL lines to change the gallery order. Host the photos on a stable image host or CDN.
5. Choose **Save changes** to publish. Use **Delete project** to remove a project, then save.

Keep a project slug unique and use lowercase letters, numbers, and hyphens.

## View enquiries

Choose **Enquiries** in the admin panel. Search by customer name or phone number, then select a row to view all submitted fields. Enquiry records are stored in the managed PostgreSQL database. For database access or backups, contact the site operator.

## Important

Do not share the admin password in public messages. Ask the site operator to rotate it if it is exposed. Blog content and company settings are managed in the repository/environment, not from the admin panel.
