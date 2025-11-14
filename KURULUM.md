# Node.js Kurulum Rehberi

## Node.js ve npm Kurulumu

Projeyi çalıştırmak için önce Node.js'i yüklemeniz gerekiyor. Node.js, npm'i de otomatik olarak içerir.

### Adım 1: Node.js İndirme

1. **Resmi Node.js sitesine gidin:** https://nodejs.org/
2. **LTS (Long Term Support) versiyonunu indirin** - Önerilen versiyon
3. İndirilen `.msi` dosyasını çalıştırın

### Adım 2: Kurulum

1. Kurulum sihirbazını takip edin
2. Varsayılan ayarları kabul edin (Next > Next > Install)
3. Kurulum tamamlandıktan sonra PowerShell'i **yeniden başlatın**

### Adım 3: Kurulumu Doğrulama

PowerShell'de şu komutları çalıştırın:

```powershell
node --version
npm --version
```

Her iki komut da versiyon numarası göstermelidir.

### Adım 4: Projeyi Çalıştırma

Node.js kurulduktan sonra:

```powershell
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcınızda `http://localhost:5173` adresine gidin.

## Alternatif: Chocolatey ile Kurulum

Eğer Chocolatey yüklüyse:

```powershell
choco install nodejs-lts
```

## Sorun Giderme

- **"node is not recognized" hatası:** PowerShell'i yeniden başlatın veya bilgisayarı yeniden başlatın
- **PATH sorunları:** Node.js kurulumunda "Add to PATH" seçeneğinin işaretli olduğundan emin olun

