class DopplerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DopplerScene' });
    }

    create() {
        this.add.rectangle(640, 360, 1280, 720, 0x223322, 0.95); // Latar hijau kabut gelap

        this.add.text(640, 40, 'Tantangan: Melarikan Diri dari Kabut', { fontSize: '32px', fill: '#88ff88', fontStyle: 'bold' }).setOrigin(0.5);
        this.add.text(640, 150, 'Hewan buas tak terlihat berlari mendekat!\nKecepatan suara di udara (v) = 340 m/s.\nKamu tahu frekuensi asli aumannya (fs) adalah 300 Hz.\nNamun yang kamu dengar (fp) adalah 340 Hz.\n\nBerapa kecepatan hewan itu (vs) dalam m/s? Masukkan sandi untuk membuka gerbang!', 
            { fontSize: '18px', fill: '#cccccc', align: 'center', lineSpacing: 8 }).setOrigin(0.5);

        this.guessSpeed = 0;
        this.speedText = this.add.text(640, 350, `Kecepatan Hewan (vs): ${this.guessSpeed} m/s`, { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);
        this.statusText = this.add.text(640, 550, '[ GERBANG TERKUNCI ]', { fontSize: '28px', fill: '#ff4444', fontStyle: 'bold' }).setOrigin(0.5);

        // Kontrol Angka
        const createBtn = (x, y, label, amount) => {
            const btn = this.add.rectangle(x, y, 60, 50, 0x555555).setInteractive({ useHandCursor: true });
            this.add.text(x, y, label, { fontSize: '24px', fontStyle: 'bold' }).setOrigin(0.5);
            btn.on('pointerdown', () => {
                this.guessSpeed = Phaser.Math.Clamp(this.guessSpeed + amount, 0, 100);
                this.speedText.setText(`Kecepatan Hewan (vs): ${this.guessSpeed} m/s`);
                this.statusText.setText('[ GERBANG TERKUNCI ]').setFill('#ff4444');
            });
        };

        createBtn(450, 430, '-10', -10);
        createBtn(530, 430, '-1', -1);
        createBtn(750, 430, '+1', 1);
        createBtn(830, 430, '+10', 10);

        // Tombol Coba Kode
        const submitBtn = this.add.rectangle(640, 490, 200, 50, 0x0088ff).setInteractive({ useHandCursor: true });
        this.add.text(640, 490, 'Buka Gerbang', { fontSize: '20px', fill: '#fff', fontStyle: 'bold' }).setOrigin(0.5);

        submitBtn.on('pointerdown', () => {
            if (this.guessSpeed === 40) { // 340 = 300 * (340 / (340 - 40))
                this.statusText.setText('SANDI BENAR! GERBANG TERBUKA!');
                this.statusText.setFill('#44ff44');
                this.registry.set('misi_hutan', true);
            } else {
                this.statusText.setText('SANDI SALAH! HEWAN SEMAKIN DEKAT!');
                this.cameras.main.shake(150, 0.01);
            }
        });

        const exitBtn = this.add.text(640, 650, '[ Kembali ke Hutan ]', { fontSize: '20px', fill: '#aaaaaa' })
            .setOrigin(0.5).setInteractive({ useHandCursor: true });

        exitBtn.on('pointerdown', () => {
            this.scene.stop(); 
            this.scene.resume('MapScene'); 
        });
    }
}