<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - Exaque</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .header {
            background-color: #1a233a;
            color: white;
            padding: 30px;
          }
          .header h1 {
            margin: 0 0 15px 0;
            font-size: 24px;
          }
          .header p {
            margin: 5px 0;
            font-size: 14px;
            color: #d1d5db;
          }
          .header a {
            color: #fff;
            text-decoration: underline;
          }
          .content {
            padding: 30px;
            max-width: 1200px;
            margin: 0 auto;
          }
          table {
            width: 100%;
            background: white;
            border-collapse: collapse;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
          }
          th {
            background-color: #f3f4f6;
            text-align: left;
            padding: 15px;
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            border-bottom: 2px solid #e5e7eb;
          }
          td {
            padding: 15px;
            font-size: 13px;
            border-bottom: 1px solid #e5e7eb;
            color: #4b5563;
          }
          tr:hover td {
            background-color: #f9fafb;
          }
          a {
            color: #2563eb;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>RSS Sitemap</h1>
          <p>Generated for <strong>Exaque</strong>, this is an RSS Sitemap meant to be consumed by search engines like Google or Bing.</p>
          <p>You can find more information about RSS Sitemaps at <a href="https://sitemaps.org">sitemaps.org</a>.</p>
        </div>
        <div class="content">
          <p><strong>Home > Sitemap</strong></p>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Title</th>
                <th>Publication Date</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="rss/channel/item">
                <tr>
                  <td>
                    <a href="{link}"><xsl:value-of select="link"/></a>
                  </td>
                  <td>
                    <xsl:value-of select="title"/>
                  </td>
                  <td>
                    <xsl:value-of select="pubDate"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
