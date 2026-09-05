class PipeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PipeScene' });
    }

    create() {
        this.add.rectangle(640, 360, 1280, 720, 0x4a3b2c, 0.95);

        this.add.text(640, 80, 'Tantangan: Melodi Reruntuhan', { fontSize: '32px', fill: '#ffcc00', fontStyle: 'bold' }).setOrigin(0.5);
        this.add.text(640, 140, 'Sebuah pintu batu raksasa merespon pada frekuensi nada dasar 85 Hz.\nKecepatan suara (v) = 340 m/s. Panjang pipa (L) = 1 meter.\nAtur katup bawah pipa agar menghasilkan nada yang tepat!', 
            { fontSize: '18px', fill: '#dddddd', align: 'center', lineSpacing: 8 }).setOrigin(0.5);

        // Status Pipa
        this.isClosed = false;
        
        // Visual Pipa
        this.pipeGraphic = this.add.rectangle(640, 350, 60, 200, 0x88aaff).setStrokeStyle(4, 0xaaaaaa);
        this.valveGraphic = this.add.rectangle(640, 460, 80, 20, 0xff0000).setVisible(false); // Katup penutup

        this.statusText = this.add.text(640, 520, 'Pipa: TERBUKA\nFrekuensi: 170 Hz', { fontSize: '24px', fill: '#ffffff', align: 'center' }).setOrigin(0.5);
        this.doorText = this.add.text(640, 600, '[ PINTU TERKUNCI ]', { fontSize: '28px', fill: '#ff4444', fontStyle: 'bold' }).setOrigin(0.5);

        // Tombol Toggle Katup
        const toggleBtn = this.add.rectangle(400, 350, 180, 50, 0x0088ff).setInteractive({ useHandCursor: true });
        this.add.text(400, 350, 'Tarik Tuas Katup', { fontSize: '18px', fill: '#fff', fontStyle: 'bold' }).setOrigin(0.5);

        toggleBtn.on('pointerdown', () => {
            this.isClosed = !this.isClosed;
            this.updatePipeState();
        });

        // Tombol Tiup Pipa
        const blowBtn = this.add.rectangle(880, 350, 180, 50, 0x22cc22).setInteractive({ useHandCursor: true });
        this.add.text(880, 350, 'Tiup Pipa', { fontSize: '18px', fill: '#fff', fontStyle: 'bold' }).setOrigin(0.5);

        blowBtn.on('pointerdown', () => {
            if (this.isClosed) {
                this.doorText.setText('BERHASIL! PINTU TERBUKA!');
                this.doorText.setFill('#44ff44');
                this.registry.set('misi_pipa', true);
            } else {
                this.doorText.setText('GAGAL! NADA TERLALU TINGGI!');
                this.doorText.setFill('#ff4444');
                this.cameras.main.shake(200, 0.01);
            }
        });

        // Tombol Keluar
        const exitBtn = this.add.text(640, 680, '[ Kembali ke Gurun ]', { fontSize: '20px', fill: '#ffffff' })
            .setOrigin(0.5).setInteractive({ useHandCursor: true });

        exitBtn.on('pointerdown', () => {
            this.scene.stop(); 
            this.scene.resume('MapScene'); 
        });
    }

    updatePipeState() {
        if (this.isClosed) {
            this.valveGraphic.setVisible(true);
            this.statusText.setText('Pipa: TERTUTUP\nFrekuensi: 85 Hz');
        } else {
            this.valveGraphic.setVisible(false);
            this.statusText.setText('Pipa: TERBUKA\nFrekuensi: 170 Hz');
        }
        this.doorText.setText('[ PINTU TERKUNCI ]');
        this.doorText.setFill('#ff4444');
    }
}