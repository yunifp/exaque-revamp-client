<?php
/**
 * Dynamic Open Graph & Meta Tags Gateway for Social Media Crawlers
 * (WhatsApp, LinkedIn, Facebook, X/Twitter, Telegram, Slack)
 * 
 * Digunakan sebagai fallback otomatis ketika bot sosial media mengakses
 * artikel/cerita yang file statisnya belum di-generate atau di-upload.
 */

$type = isset($_GET['type']) ? trim($_GET['type']) : 'blog';
$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
$slug = trim($slug, '/');

if (empty($slug)) {
    header("Location: https://exaque.com", true, 301);
    exit;
}

$apiEndpoint = ($type === 'story') 
    ? "https://apirevamp.exaque.com/api/v1/stories/" . urlencode($slug)
    : "https://apirevamp.exaque.com/api/v1/articles/" . urlencode($slug);

$item = null;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiEndpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 4);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200 && $response) {
    $json = json_decode($response, true);
    $item = isset($json['data']) ? $json['data'] : null;
}

$pagePath = ($type === 'story') ? "/kisah-pelanggan/" . $slug : "/blog/" . $slug;
$canonicalUrl = "https://exaque.com" . $pagePath;

if ($item) {
    $title = !empty($item['meta_title']) ? $item['meta_title'] : $item['title'] . " - Exaque";
    $rawDesc = !empty($item['meta_description']) ? $item['meta_description'] : (!empty($item['excerpt']) ? $item['excerpt'] : "Artikel wawasan Customer Journey Management dan sistem antrean dari Exaque.");
    $description = mb_substr(strip_tags($rawDesc), 0, 160);
    
    $rawImage = !empty($item['featured_image_url']) ? $item['featured_image_url'] : '';
    if (!empty($rawImage)) {
        if (!preg_match('/^https?:\/\//i', $rawImage)) {
            $rawImage = "https://apirevamp.exaque.com" . $rawImage;
        }
        // Gunakan versi JPG 1200x630 untuk kompatibilitas penuh WhatsApp & LinkedIn
        $imageUrl = preg_replace('/\.webp$/i', '-og.jpg', $rawImage);
        $imageType = preg_match('/\.jpg$/i', $imageUrl) ? 'image/jpeg' : 'image/webp';
    } else {
        $imageUrl = "https://exaque.com/og-image.png";
        $imageType = "image/png";
    }
} else {
    // Fallback jika API tidak mengembalikan data
    $title = "Exaque — Solusi Sistem Antrean & Customer Journey Management";
    $description = "Solusi Customer Journey Management, Sistem Antrean, dan Analitik Kinerja Cabang terdepan di Indonesia.";
    $imageUrl = "https://exaque.com/og-image.png";
    $imageType = "image/png";
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></title>
  <meta name="description" content="<?= htmlspecialchars($description, ENT_QUOTES, 'UTF-8') ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="canonical" href="<?= htmlspecialchars($canonicalUrl, ENT_QUOTES, 'UTF-8') ?>">

  <!-- Open Graph / Facebook / LinkedIn / WhatsApp -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>">
  <meta property="og:description" content="<?= htmlspecialchars($description, ENT_QUOTES, 'UTF-8') ?>">
  <meta property="og:url" content="<?= htmlspecialchars($canonicalUrl, ENT_QUOTES, 'UTF-8') ?>">
  <meta property="og:site_name" content="PT Exaque Mandiri Makmur">
  <meta property="og:locale" content="id_ID">
  <meta property="og:image" content="<?= htmlspecialchars($imageUrl, ENT_QUOTES, 'UTF-8') ?>">
  <meta property="og:image:secure_url" content="<?= htmlspecialchars($imageUrl, ENT_QUOTES, 'UTF-8') ?>">
  <meta property="og:image:type" content="<?= htmlspecialchars($imageType, ENT_QUOTES, 'UTF-8') ?>">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>">
  <meta name="twitter:description" content="<?= htmlspecialchars($description, ENT_QUOTES, 'UTF-8') ?>">
  <meta name="twitter:image" content="<?= htmlspecialchars($imageUrl, ENT_QUOTES, 'UTF-8') ?>">

  <!-- Schema.org Article -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": <?= json_encode($title) ?>,
    "image": [<?= json_encode($imageUrl) ?>],
    "description": <?= json_encode($description) ?>,
    "url": <?= json_encode($canonicalUrl) ?>,
    "publisher": {
      "@type": "Organization",
      "name": "PT Exaque Mandiri Makmur",
      "logo": {
        "@type": "ImageObject",
        "url": "https://exaque.com/logo.png"
      }
    }
  }
  </script>

  <!-- Redirect pengunjung manusia ke SPA jika terbuka di browser biasa -->
  <script>
    window.location.replace("<?= $canonicalUrl ?>");
  </script>
</head>
<body style="font-family: system-ui, -apple-system, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #333;">
  <h1><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></h1>
  <p><?= htmlspecialchars($description, ENT_QUOTES, 'UTF-8') ?></p>
  <?php if (!empty($imageUrl)): ?>
    <img src="<?= htmlspecialchars($imageUrl, ENT_QUOTES, 'UTF-8') ?>" alt="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>" style="max-width: 100%; height: auto; border-radius: 8px;">
  <?php endif; ?>
  <p style="margin-top: 20px;"><a href="<?= htmlspecialchars($canonicalUrl, ENT_QUOTES, 'UTF-8') ?>">Buka halaman lengkap di Exaque.com &rarr;</a></p>
</body>
</html>
