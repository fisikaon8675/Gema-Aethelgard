class WifiScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WifiScene' });
    }

    create() {
        this.add.rectangle(640, 360, 1280, 720, 0x112233, 0.95);

        // Judul & Cerita
        this.add.text(640, 80, 'Tantangan: Sinyal Menembus Tembok', { fontSize: '32px', fill: '#00aaff', fontStyle: 'bold' }).setOrigin(0.5);
        this.add.text(640, 140, 'Kamu sedang bermain game di kamar, tapi sinyal Wi-Fi terhalang tembok tebal.\nKecepatan gelombang radio (v) konstan pada 300.000.000 m/s.\nPilih frekuensi (f) router yang memiliki panjang gelombang (λ) lebih besar\nagar sinyal lebih mudah menembus tembok!', 
            { fontSize: '18px', fill: '#dddddd', align: 'center', lineSpacing: 8 }).setOrigin(0.5);

        // Visualisasi Ruangan
        this.add.text(300, 260, '📡 Router\n(Ruang Tamu)', { fontSize: '24px', align: 'center' }).setOrigin(0.5);
        this.add.rectangle(640, 320, 60, 200, 0x888888); 
        this.add.text(640, 320, 'TEMBOK', { fontSize: '16px', fill: '#000' }).setOrigin(0.5).setAngle(-90);
        this.add.text(980, 260, '📱 Pemain\n(Kamar)', { fontSize: '24px', align: 'center' }).setOrigin(0.5);

        // Feedback Text
        this.feedback = this.add.text(640, 520, 'Pilih Pengaturan Router:', { fontSize: '22px', fill: '#ffff00' }).setOrigin(0.5);

        // Tombol 5 GHz
        const btn5GHz = this.add.rectangle(480, 430, 200, 50, 0xff4444).setInteractive({ useHandCursor: true });
        this.add.text(480, 430, 'Frekuensi 5 GHz', { fontSize: '20px', fontStyle: 'bold' }).setOrigin(0.5);
        
        btn5GHz.on('pointerdown', () => {
            this.feedback.setText('Gagal! λ = v / f\nλ = 3×10^8 / 5×10^9 = 0.06 meter (6 cm).\nGelombang terlalu pendek, sinyal memantul di tembok!');
            this.feedback.setFill('#ff4444');
        });

        // Tombol 2.4 GHz
        const btn2GHz = this.add.rectangle(800, 430, 200, 50, 0x44ff44).setInteractive({ useHandCursor: true });
        this.add.text(800, 430, 'Frekuensi 2.4 GHz', { fontSize: '20px', fill: '#000', fontStyle: 'bold' }).setOrigin(0.5);
        
        btn2GHz.on('pointerdown', () => {
            this.feedback.setText('Berhasil! λ = v / f\nλ = 3×10^8 / 2.4×10^9 = 0.125 meter (12.5 cm).\nPanjang gelombang lebih besar mampun menembus tembok tebal!');
            this.feedback.setFill('#44ff44');
            this.registry.set('misi_wifi', true);
            
            // Animasi sinyal tembus
            const signal = this.add.circle(350, 260, 10, 0x44ff44);
            this.tweens.add({ targets: signal, x: 930, duration: 1000, ease: 'Power2' });
        });

        // Tombol Keluar
        const exitBtn = this.add.text(640, 650, '[ Kembali ke Peta ]', { fontSize: '20px', fill: '#ffffff' })
            .setOrigin(0.5).setInteractive({ useHandCursor: true });

        exitBtn.on('pointerdown', () => {
            this.scene.stop(); 
            this.scene.resume('MapScene'); 
        });
    }
}