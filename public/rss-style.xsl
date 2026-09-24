<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> - RSS Sitemap</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap');
          :root {
            --bg-color: #f3f4f6;
            --card-bg: #ffffff;
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --text-main: #1f2937;
            --text-muted: #6b7280;
            --border: #e5e7eb;
          }
          body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-main);
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 1000px;
            margin: 40px auto;
            padding: 0 20px;
          }
          .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            border-radius: 16px;
            padding: 40px;
            color: white;
            box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.3);
            margin-bottom: 30px;
          }
          .header h1 {
            margin: 0 0 10px 0;
            font-size: 2.5rem;
            font-weight: 700;
            letter-spacing: -0.02em;
          }
          .header p {
            margin: 0;
            font-size: 1.1rem;
            opacity: 0.9;
          }
          .header-meta {
            margin-top: 20px;
            font-size: 0.9rem;
            opacity: 0.8;
            display: flex;
            align-items: center;
            gap: 15px;
          }
          .card {
            background: var(--card-bg);
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
            overflow: hidden;
            border: 1px solid var(--border);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }
          th {
            background-color: #f9fafb;
            padding: 16px 24px;
            font-weight: 600;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
            border-bottom: 2px solid var(--border);
          }
          td {
            padding: 16px 24px;
            border-bottom: 1px solid var(--border);
            vertical-align: middle;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr {
            transition: background-color 0.2s ease;
          }
          tr:hover {
            background-color: #f3f4f6;
          }
          a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }
          a:hover {
            color: var(--primary-hover);
            text-decoration: underline;
          }
          .title {
            font-weight: 600;
            color: var(--text-main);
            margin-bottom: 4px;
            display: block;
            font-size: 1.05rem;
          }
          .date-badge {
            background-color: #e0e7ff;
            color: #3730a3;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
            white-space: nowrap;
          }
          .count {
            background: rgba(255,255,255,0.2);
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1><xsl:value-of select="/rss/channel/title"/> RSS Sitemap</h1>
            <p><xsl:value-of select="/rss/channel/description"/></p>
            <div class="header-meta">
              <span>Total URLs: <span class="count"><xsl:value-of select="count(/rss/channel/item)"/></span></span>
              <span>Last updated: <xsl:value-of select="/rss/channel/lastBuildDate"/></span>
            </div>
          </div>
          
          <div class="card">
            <table>
              <thead>
                <tr>
                  <th width="65%">Judul Halaman &amp; URL</th>
                  <th width="35%">Terakhir Diperbarui</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="/rss/channel/item">
                  <tr>
                    <td>
                      <span class="title"><xsl:value-of select="title"/></span>
                      <a href="{link}" target="_blank" rel="noopener noreferrer">
                        <xsl:value-of select="link"/>
                        <svg xmlns="http://www.w3.org/1999/xhtml" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      </a>
                    </td>
                    <td>
                      <span class="date-badge"><xsl:value-of select="pubDate"/></span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
