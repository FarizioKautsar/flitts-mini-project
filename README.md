### Flitts Mini Project
# StreamFlix

Link to Test
https://drive.google.com/file/d/1iSoI-kSgBGvYJCG_7yK9nhGTYmgf-bG-/view?usp=sharing

## Background
Karena minat masyarakat Indonesia yang sangat besar untuk menonton film dan masih
tingginya tingkat pengguna platform streaming ilegal di Indonesia, X Corp. berencana
membuka sebuah platform untuk masyarakat Indonesia dapat menonton/streaming film-film
pilihan secara legal dengan harga yang sangat terjangkau. 

## Task
Platform streaming ini akan
diberikan nama StreamFlix-[nama]. Anda sebagai salah satu Software Engineer terbaik
diberikan tugas untuk mengembangkan sebuah aplikasi web yang akan menjadi cikal-bakal
dari platform ini.

**1. Halaman Homepage**
- Halaman utama ini dapat diakses pada path / pada aplikasi anda.
- Anda dibebaskan untuk menerapkan sistem pagination atau infinite
scroll untuk memuat list film berikutnya.
- Ketika list film selanjutnya dimuat, maka URL pada web browser anda
akan ter-update secara sendirinya dengan format /?page=<page>
- Ketika film di-klik maka user akan dipindahkan ke halaman detail film.
- Pada list film, minimal harus terdapat info mengenai: Poster, judul,
harga film tersebut, dan indikator apakah pengguna telah memiliki film
tersebut.

**2. Halaman Movie Detail**
- Judul, poster, rating, casts, durasi film, harga film, indikator apakah
pengguna memiliki film tersebut, dll
- Film serupa
- Rekomendasi film.
- Informasi apapun yang berkaitan dengan film, sesuai dengan
kreatifitas anda.
- Tombol beli bagi pengguna untuk membeli film yang sedang disorot.
- Halaman ini dapat diakses dengan path /<movie_id>-<slug> pada
aplikasi anda. (Slug dapat anda peroleh dari judul film dengan
mengganti semua karakter whitespace menjadi karakter dash (-))

**3** Pengguna mula-mula akan diberikan saldo sebesar Rp.100.000 ketika memasuki
halaman

## Additional Features
- Cart feature
- Checkout from Cart
- Saved application data to localStorage
- Reset Button (Jual Semua Film) in the "Koleksi Saya" page
