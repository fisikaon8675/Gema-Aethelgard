class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Latar belakang transparan
        this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.85);

        // Judul dan Instruksi
        this.add.text(640, 80, 'Tantangan: Harmoni Lonceng', { fontSize: '36px', fill: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
        this.add.text(640, 130, 'Gunakan panah ATAS/BAWAH untuk Volume (Amplitudo)', { fontSize: '20px', fill: '#aaaaaa' }).setOrigin(0.5);
        this.add.text(640, 160, 'Gunakan panah KIRI/KANAN untuk Pitch (Frekuensi)', { fontSize: '20px', fill: '#aaaaaa' }).setOrigin(0.5);

        // Status Teks
        this.statusText = this.add.text(640, 600, 'Sesuaikan Gelombang!', { fontSize: '28px', fill: '#ffcc00' }).setOrigin(0.5);

        // Variabel Target (Gelombang ideal)
        this.targetAmp = 100;
        this.targetFreq = 0.05;

        // Variabel Pemain (Mulai dari nilai yang salah)
        this.playerAmp = 40;
        this.playerFreq = 0.02;

        // Objek Grafik untuk menggambar garis gelombang
        this.graphicsTarget = this.add.graphics();
        this.graphicsPlayer = this.add.graphics();

        // Menggambar gelombang target (hijau transparan)
        this.drawWave(this.graphicsTarget, this.targetAmp, this.targetFreq, 0x00ff00, 0.3);

        // Input Keyboard
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mencegah penekanan tombol terlalu cepat (debounce manual)
        this.lastInputTime = 0;

        // Tombol Keluar
        const exitBtn = this.add.text(640, 660, '[ Tutup & Kembali ]', { fontSize: '24px', fill: '#ff5555' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        exitBtn.on('pointerdown', () => {
            this.scene.stop(); 
            this.scene.resume('MapScene'); 
        });
    }

    update(time) {
        // Kontrol dengan jeda waktu agar perubahan tidak terlalu cepat
        if (time > this.lastInputTime + 100) {
            let changed = false;

            if (this.cursors.up.isDown && this.playerAmp < 150) {
                this.playerAmp += 10;
                changed = true;
            } else if (this.cursors.down.isDown && this.playerAmp > 10) {
                this.playerAmp -= 10;
                changed = true;
            }

            if (this.cursors.right.isDown && this.playerFreq < 0.1) {
                this.playerFreq += 0.01;
                changed = true;
            } else if (this.cursors.left.isDown && this.playerFreq > 0.01) {
                this.playerFreq -= 0.01;
                changed = true;
            }

            if (changed) {
                this.lastInputTime = time;
                this.checkWinCondition();
            }
        }

        // Terus perbarui gambar gelombang pemain (biru terang)
        this.graphicsPlayer.clear();
        this.drawWave(this.graphicsPlayer, this.playerAmp, this.playerFreq, 0x00aaff, 1);
    }

    drawWave(graphics, amplitude, frequency, color, alpha) {
        graphics.lineStyle(4, color, alpha);
        graphics.beginPath();

        const startX = 240;
        const endX = 1040;
        const centerY = 360;

        for (let x = startX; x <= endX; x++) {
            // Rumus gelombang sinus: y = A * sin(f * x)
            const y = centerY + amplitude * Math.sin(frequency * (x - startX));
            
            if (x === startX) {
                graphics.moveTo(x, y);
            } else {
                graphics.lineTo(x, y);
            }
        }
        graphics.strokePath();
    }

    checkWinCondition() {
        // Pembulatan untuk menghindari masalah presisi desimal pada JavaScript
        const pFreq = Math.round(this.playerFreq * 100) / 100;
        const tFreq = Math.round(this.targetFreq * 100) / 100;

        if (this.playerAmp === this.targetAmp && pFreq === tFreq) {
            this.statusText.setText('Berhasil! Harmoni Dipulihkan!');
            this.statusText.setFill('#00ff00');
            this.registry.set('misi_kastil', true);
        } else {
            this.statusText.setText('Belum Cocok, Terus Sesuaikan...');
            this.statusText.setFill('#ffcc00');
        }
        
    }
}