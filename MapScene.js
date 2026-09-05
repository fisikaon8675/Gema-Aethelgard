class MapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MapScene' });
    }

    preload() {
        this.load.image('bush1', 'assets/bush1.png');
        this.load.image('bush4', 'assets/bush4.png');
        this.load.image('cactus', 'assets/cactus1.png');
        this.load.image('castle', 'assets/castleSmall.png');
        this.load.image('castleWall', 'assets/castleWall.png');
        this.load.image('tower', 'assets/tower.png'); 
        this.load.image('towerSmall', 'assets/towerSmall.png'); 
        this.load.image('fenceIron', 'assets/fenceIron.png'); 
        this.load.image('cloud', 'assets/cloud3.png');
        this.load.image('house2', 'assets/house2.png');
        this.load.image('houseAlt', 'assets/houseAlt1.png');
        this.load.image('houseSmall', 'assets/houseSmall1.png');
        this.load.image('treePine', 'assets/treePine.png');
        this.load.image('treeSmall_green3', 'assets/treeSmall_green3.png');
        this.load.image('treeSmall_greenAlt1', 'assets/treeSmall_greenAlt1.png');
        this.load.image('treeSmall_orange1', 'assets/treeSmall_orange1.png');
        this.load.image('treeSmall_orange2', 'assets/treeSmall_orange2.png');
        this.load.image('pyramid', 'assets/pyramid.png');
        this.load.image('treeDead', 'assets/treeDead.png');
        this.load.image('treePalm', 'assets/treePalm.png');
        this.load.image('gunung', 'assets/gurun_pasir.png');
        this.load.image('player_up', 'assets/player_02.png');
        this.load.image('player_idle', 'assets/player_03.png');
        this.load.image('player_down', 'assets/player_04.png');
        this.load.image('player_left', 'assets/player_13.png');
        this.load.image('player_right', 'assets/player_16.png');
        this.load.image('player_left_step', 'assets/player_12.png');
        this.load.image('player_right_step', 'assets/player_15.png');
        this.load.image('soldier_walk1', 'assets/soldier_walk1.png');
        this.load.image('soldier_walk2', 'assets/soldier_walk2.png');
        this.load.image('adv_cheer', 'assets/adventurer_cheer2.png');
        this.load.image('adv_swim', 'assets/adventurer_swim1.png');
        this.load.image('adv_talk', 'assets/adventurer_talk.png');  
        this.load.image('gurun1', 'assets/NPC_gurun1.png');
        this.load.image('gurun2', 'assets/NPC_gurun2.png');  
        this.load.image('npc_hutan0', 'assets/NPC_hutan.png');
        this.load.image('npc_hutan1', 'assets/NPC_hutan1.png');
        this.load.image('npc_hutan2', 'assets/NPC_hutan2.png');
        this.load.image('redCrystal', 'assets/redCrystal.png');
        this.load.image('blueCrystal', 'assets/blueCrystal.png');
        this.load.image('greenJewel', 'assets/greenJewel.png');
    }

    create() {
        const mapWidth = 2560;
        const mapHeight = 1440;
        const LAYER_AWAN = 5000; 
        
        // Warna pagar disesuaikan agar senada dengan warna fenceIron (hijau besi)
        const FENCE_COLOR = 0x27ae60; 

        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.setBackgroundColor('#7ec850'); 

        // --- TAMBAHAN: Jalan Tanah (Soft Dirt Path) ---
        const pathGraphics = this.add.graphics();
        pathGraphics.lineStyle(55, 0xd6b589, 0.9); // Ketebalan 55px, warna tanah pastel, alpha 0.9
        
        const dirtPath = new Phaser.Curves.Spline([
            950, 1150,  // Titik awal di dalam desa
            1160, 1150, // Keluar melewati gerbang desa (X: 1100)
            1280, 900,  // Melengkung secara natural ke arah tengah peta
            1280, 520   // Berakhir tepat di pintu masuk benteng kastil
        ]);
        
        dirtPath.draw(pathGraphics, 64);
        pathGraphics.setDepth(1); // Depth rendah agar selalu berada di bawah objek lain
        // ----------------------------------------------

       // --- Pohon Oranye di Sepanjang Jalan (Posisi Diperbaiki) ---
        const pathTrees = [
            // Sisi area keluar gerbang desa
            { x: 1100, y: 1070 }, // Atas jalan keluar gerbang
            { x: 1290, y: 1050 }, // Kanan jalan belokan bawah

            // Sisi tikungan tengah
            { x: 1180, y: 920 },  // Kiri tikungan
            { x: 1370, y: 900 },  // Kanan tikungan

            // Sisi jalan lurus ke arah benteng
            { x: 1180, y: 780 },  // Kiri jalan
            { x: 1380, y: 760 },  // Kanan jalan
            { x: 1180, y: 640 },  // Kiri jalan (dekat benteng)
            { x: 1380, y: 620 }   // Kanan jalan (dekat benteng)
        ];

        pathTrees.forEach(pos => {
            this.add.image(pos.x, pos.y, 'treeSmall_orange1').setDepth(pos.y);
        });
        // -----------------------------------------------------------

        // 1. Hutan Pinus Lebat
        for (let i = 0; i < 25; i++) {
            let px = Phaser.Math.Between(100, 950);
            let py = Phaser.Math.Between(150, 750);
            this.add.image(px, py, 'treePine').setDepth(py);
        }
        // --- Animasi & NPC Hutan ---
        this.anims.create({
        key: 'hutan_walk',
        frames: [ { key: 'npc_hutan1' }, { key: 'npc_hutan2' } ],
        frameRate: 5,
        repeat: -1
        });

        const hutanX = 200;
        const hutanY = 200;
        this.npcHutan = this.physics.add.sprite(hutanX, hutanY, 'npc_hutan0').setDepth(hutanY).setScale(0.2);
        this.npcHutan.play('hutan_walk');

        // Tween Patroli Hutan
        this.hutanTween = this.tweens.add({
        targets: this.npcHutan,
        x: hutanX + 200,
        duration: 4000,
        yoyo: true,
        repeat: -1,
        onYoyo: () => { this.npcHutan.setFlipX(true); },
        onRepeat: () => { this.npcHutan.setFlipX(false); }
        });

        // Dialog NPC Hutan
        const hutanDialogStyle = {
        fontSize: '14px', fill: '#ffffff', backgroundColor: 'rgba(34, 139, 34, 0.8)',
        padding: { x: 8, y: 8 }, align: 'center', wordWrap: { width: 300 }
        };
        this.hutanDialog = this.add.text(hutanX, hutanY - 80, 
        'Penebang Pohon:\n"Awas kabut tebal di utara! Dengarkan auman hewan buas. Frekuensinya meninggi saat mendekat (Efek Doppler). Rumusnya: fp = fs * [v / (v - vs)]. Hitung kecepatan mereka untuk membuka gerbang rahasia!"', 
        hutanDialogStyle
        ).setOrigin(0.5).setDepth(2000).setVisible(false);

        // --- Zona Hijau Kabut (Pemicu Minigame Doppler) ---
        this.fogZone = this.add.rectangle(400, 300, 100, 100, 0x88cc88, 0.6).setDepth(300);
        this.physics.add.existing(this.fogZone, true);
        // 2. Area Pusat (Kastil Utama, Tembok Benteng, & Menara)
        const centerX = mapWidth / 2;
        const mainCastle = this.physics.add.staticImage(centerX, 350, 'castle').setScale(2).setDepth(350);
        
        this.walls = this.physics.add.staticGroup();
        this.towers = this.physics.add.staticGroup(); 
        
        this.towers.create(centerX - 170, 360, 'tower').setDepth(360);
        this.towers.create(centerX + 170, 360, 'tower').setDepth(360);
        this.walls.create(centerX - 150, 420, 'castleWall').setDepth(420);
        this.walls.create(centerX - 150, 480, 'castleWall').setDepth(480);
        this.walls.create(centerX + 150, 420, 'castleWall').setDepth(420);
        this.walls.create(centerX + 150, 480, 'castleWall').setDepth(480);
        this.towers.create(centerX - 170, 540, 'towerSmall').setDepth(540);
        this.towers.create(centerX + 170, 540, 'towerSmall').setDepth(540);
        this.walls.create(centerX - 90, 540, 'castleWall').setDepth(540);
        this.walls.create(centerX + 90, 540, 'castleWall').setDepth(540);

        this.add.image(centerX - 240, 380, 'treePine').setDepth(380);
        this.add.image(centerX + 240, 380, 'treePine').setDepth(380);

        // Membuat animasi idle/berjaga untuk NPC Prajurit
        this.anims.create({
        key: 'soldier_idle',
            frames: [
                { key: 'soldier_walk1' },
            { key: 'soldier_walk2' }
            ],
        frameRate: 3, // Kecepatan animasi (3 frame per detik)
        repeat: -1    // Looping terus-menerus
        });

        const npcX = centerX;
        const npcY = 480;

        // Menggunakan sprite (bukan staticImage) agar bisa dianimasikan
        this.npcMaestro = this.physics.add.sprite(npcX, npcY, 'soldier_walk1')
        .setDepth(npcY)
        .setScale(0.8); // Sesuaikan skala jika ukuran aslinya terlalu besar
    
        this.npcMaestro.play('soldier_idle');
        
        // Simpan Tween ke dalam variabel this.npcTween agar bisa dikontrol
        this.npcTween = this.tweens.add({
            targets: this.npcMaestro,
            x: npcX + 120,      
            duration: 2500,     
            yoyo: true,         
            repeat: -1,         
            onYoyo: () => { 
                this.npcMaestro.setFlipX(true);
            },
            onRepeat: () => { 
                this.npcMaestro.setFlipX(false); 
            }
        });

        // Teks instruksi untuk persiapan masuk ke GameScene
        const dialogStyle = {
            fontSize: '16px',
            fill: '#ffffff',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: { x: 10, y: 10 },
            align: 'center',
            wordWrap: { width: 320 }
        };

        this.npcDialog = this.add.text(npcX, npcY - 80, 
            'Prajurit Penjaga:\n"Suara adalah gelombang! Tinggi gelombang (Amplitudo) mengatur Volume, dan rapatnya (Frekuensi) mengatur Pitch. Sesuaikan agar gerbang terbuka!"', 
            dialogStyle
        ).setOrigin(0.5).setDepth(2000).setVisible(false);


        // 3. Area Desa (Rumah & Pagar)
        this.physics.add.staticImage(500, 1000, 'house2').setDepth(1000);
        this.physics.add.staticImage(850, 1050, 'houseAlt').setDepth(1050);
        this.physics.add.staticImage(650, 1250, 'houseSmall').setDepth(1250);
        
        this.add.image(350, 1050, 'treeSmall_green3').setDepth(1050);
        this.add.image(1000, 1150, 'treeSmall_greenAlt1').setDepth(1150);
        this.add.image(500, 1150, 'bush1').setDepth(1150);
        this.add.image(800, 1250, 'treeSmall_green3').setDepth(1250);

        this.fences = this.physics.add.staticGroup();
        
        // Pagar Atas (Menggunakan aset fenceIron)
        for (let x = 400; x <= 1050; x += 65) {
            this.fences.create(x, 920, 'fenceIron').setDepth(920);
        }
        // Pagar Bawah (Menggunakan aset fenceIron)
        for (let x = 400; x <= 1050; x += 65) {
            this.fences.create(x, 1340, 'fenceIron').setDepth(1340);
        }

        // Pagar Kiri (Garis lurus solid)
        let leftWall = this.add.rectangle(340, 1130, 15, 400, FENCE_COLOR).setDepth(1130);
        this.physics.add.existing(leftWall, true);
        this.fences.add(leftWall);

        // Pagar Kanan Atas (Garis lurus)
        let rightWallTop = this.add.rectangle(1100, 1010, 15, 180, FENCE_COLOR).setDepth(1010);
        this.physics.add.existing(rightWallTop, true);
        this.fences.add(rightWallTop);

        // Pagar Kanan Bawah (Garis lurus, menyisakan celah gerbang di tengah)
        let rightWallBottom = this.add.rectangle(1100, 1270, 15, 140, FENCE_COLOR).setDepth(1270);
        this.physics.add.existing(rightWallBottom, true);
        this.fences.add(rightWallBottom);
        // --- NPC Adventurer (Guru Fisika) ---
        const advX = 700;
        const advY = 1150;
        this.advNPC = this.physics.add.sprite(advX, advY, 'adv_talk').setDepth(advY).setScale(0.8);

        // Teks Dialog Persamaan Gelombang
        const advDialogStyle = {
        fontSize: '14px', fill: '#ffffff', backgroundColor: 'rgba(0, 0, 255, 0.7)',
        padding: { x: 8, y: 8 }, align: 'center', wordWrap: { width: 280 }
        };
        this.advDialog = this.add.text(advX, advY - 80, 
            'Ilmuwan Warga:\n"Ingat rumus ini: v = λ × f ! Kecepatan (v) adalah hasil kali panjang gelombang (λ) dan frekuensi (f). Coba praktekkan di Rumah Hijau!"', 
            advDialogStyle
        ).setOrigin(0.5).setDepth(2000).setVisible(false);

        // Tween Gerak Bolak-Balik (Sumbu X)
        this.advTweenX = this.tweens.add({
        targets: this.advNPC,
        x: advX + 100,
        duration: 3000,
        yoyo: true,
        repeat: -1,
        onYoyo: () => { this.advNPC.setFlipX(true); },
        onRepeat: () => { this.advNPC.setFlipX(false); }
        });

        // Tween Loncat (Sumbu Y)
        this.advTweenY = this.tweens.add({
            targets: this.advNPC,
            y: advY - 20,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        onStart: () => { this.advNPC.setTexture('adv_cheer'); },
        onRepeat: () => { this.advNPC.setTexture('adv_cheer'); }
        });

        // --- Zona Biru (Pemicu Minigame) ---
        this.blueZone = this.add.rectangle(550, 1050, 60, 60, 0x0044ff, 0.6).setDepth(400);
        this.physics.add.existing(this.blueZone, true);


        // 4. Area Musim Gugur
        this.add.image(1250, 1100, 'treeSmall_orange1').setDepth(1100);
        this.add.image(1450, 1150, 'treeSmall_orange2').setDepth(1150);
        this.add.image(1350, 1000, 'treeSmall_orange1').setDepth(1000);
        this.add.image(1200, 1250, 'bush4').setDepth(1250);
        this.add.image(1550, 1300, 'treeSmall_orange2').setDepth(1300);

       // 5. Area Gurun
        
        // --- TAMBAHAN: Alas Tanah Gurun ---
        const desertGraphics = this.add.graphics();
        // Menggunakan warna hex 0xE6C693 (pasir tua/batu piramid redup)
        desertGraphics.fillStyle(0xE6C693, 1);
        
        desertGraphics.fillEllipse(2150, 850, 1100, 1300);
        desertGraphics.setDepth(0); 
        // ----------------------------------

        this.pyramid = this.physics.add.staticImage(2150, 650, 'pyramid').setDepth(650);
        this.add.image(1850, 500, 'cactus').setDepth(500);
        this.add.image(2450, 850, 'cactus').setDepth(850);
        this.add.image(1900, 950, 'treeDead').setDepth(950);
        this.add.image(2000, 1200, 'treePalm').setDepth(1200);
        this.add.image(2350, 1100, 'treePalm').setDepth(1100);
        this.add.image(1750, 1150, 'treeDead').setDepth(1150);
        this.gunung = this.physics.add.staticImage(2150, 400, 'gunung').setDepth(400).setScale(2.0);
        // --- Animasi & NPC Gurun ---
        this.anims.create({
        key: 'gurun_walk',
        frames: [ { key: 'gurun1' }, { key: 'gurun2' } ],
        frameRate: 4,
        repeat: -1
        });

        const gurunX = 1950;
        const gurunY = 800;
        this.npcGurun = this.physics.add.sprite(gurunX, gurunY, 'gurun1').setDepth(gurunY).setScale(0.2);
        this.npcGurun.play('gurun_walk');

        // Tween Patroli Gurun
        this.gurunTween = this.tweens.add({
        targets: this.npcGurun,
        x: gurunX + 150,
        duration: 3500,
        yoyo: true,
        repeat: -1,
        onYoyo: () => { this.npcGurun.setFlipX(false); },
        onRepeat: () => { this.npcGurun.setFlipX(true); }
        });

        // Dialog NPC Gurun
        const gurunDialogStyle = {
            fontSize: '14px', fill: '#ffffff', backgroundColor: 'rgba(139, 69, 19, 0.8)',
            padding: { x: 8, y: 8 }, align: 'center', wordWrap: { width: 280 }
        };
        this.gurunDialog = this.add.text(gurunX, gurunY - 80, 
        'Pengelana Gurun:\n"Pintu reruntuhan butuh nada rendah! Pipa terbuka menghasilkan f = v/2L. Tutup ujung pipanya agar jadi f = v/4L dan nadanya turun!"', 
        gurunDialogStyle
        ).setOrigin(0.5).setDepth(2000).setVisible(false);

        // --- Zona Kuning (Pemicu Minigame Pipa) ---
        this.yellowZone = this.add.rectangle(2150, 720, 80, 80, 0xffcc00, 0.5).setDepth(50);
        this.physics.add.existing(this.yellowZone, true);
        // 6. Setup Pemain
        // Menggunakan player_idle (tampak depan) sebagai posisi awal
        this.player = this.physics.add.sprite(1150, 1150, 'player_idle').setDepth(1150).setScale(0.4);
        this.player.body.setCollideWorldBounds(true);
        // --- Setup Animasi Berjalan (Frame-by-Frame) ---
        // Animasi Kiri: Bergantian antara berdiri (player_13) dan melangkah (player_12)
        this.anims.create({
            key: 'walk_left',
            frames: [
                { key: 'player_left' }, 
                { key: 'player_left_step' } 
            ],
            frameRate: 8, // Kecepatan pergantian frame (8 frame per detik)
            repeat: -1    // Looping terus menerus
        });

        // Animasi Kanan: Bergantian antara berdiri (player_16) dan melangkah (player_15)
        this.anims.create({
            key: 'walk_right',
            frames: [
                { key: 'player_right' }, 
                { key: 'player_right_step' } 
            ],
            frameRate: 8,
            repeat: -1
        });
        // -----------------------------------------------
        
        // Opsional: Sesuaikan ukuran hitbox (kotak tabrakan) agar pas dengan badan karakter
       // this.player.body.setSize(24, 32);

        // 7. Setup Awan
        this.clouds = this.physics.add.group();
        this.clouds.create(400, 200, 'cloud').setAlpha(0.6).setVelocityX(15).setDepth(LAYER_AWAN);
        this.clouds.create(1600, 600, 'cloud').setAlpha(0.4).setVelocityX(10).setDepth(LAYER_AWAN);
        this.clouds.create(900, 1100, 'cloud').setAlpha(0.5).setVelocityX(20).setDepth(LAYER_AWAN);
        this.clouds.create(2200, 300, 'cloud').setAlpha(0.7).setVelocityX(12).setDepth(LAYER_AWAN);

        // 8. Kamera & Input
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cursors = this.input.keyboard.createCursorKeys();
        // Data kuis berdasarkan warna kristal
        const crystalData = [
        // RED CRYSTAL (Pitch, Volume, & Dasar Gelombang) - 14 Soal
        // ==========================================
        { key: 'redCrystal', count: 1, value: 1, question: "Tinggi rendahnya nada (pitch) suatu bunyi\nditentukan oleh besaran apa?", ansA: "Frekuensi", ansB: "Amplitudo", correct: 'A', registry: 'c_red' },
        { key: 'redCrystal', count: 1, value: 1, question: "Kuat lemahnya suara (volume) yang kita dengar\ndipengaruhi oleh besaran?", ansA: "Amplitudo", ansB: "Frekuensi", correct: 'A', registry: 'c_red' },
        { key: 'redCrystal', count: 1, value: 1, question: "Satuan standar internasional (SI)\nuntuk frekuensi adalah?", ansA: "Hertz (Hz)", ansB: "Desibel (dB)", correct: 'A', registry: 'c_red' },
        { key: 'redCrystal', count: 1, value: 1, question: "Jika frekuensi bunyi dinaikkan,\nmaka nada yang terdengar akan menjadi?", ansA: "Lebih Tinggi", ansB: "Lebih Rendah", correct: 'A', registry: 'c_red' },
        { key: 'redCrystal', count: 1, value: 1, question: "Jika amplitudo gelombang suara diperbesar,\nsuara tersebut akan terdengar?", ansA: "Lebih Pelan", ansB: "Lebih Keras", correct: 'B', registry: 'c_red' },
        { key: 'redCrystal', count: 1, value: 1, question: "Gelombang bunyi memerlukan medium untuk merambat.\nBunyi merambat paling CEPAT pada medium?", ansA: "Zat Padat", ansB: "Udara (Gas)", correct: 'A', registry: 'c_red' },
        { key: 'redCrystal', count: 1, value: 1, question: "Manusia normal umumnya hanya dapat mendengar\nbunyi pada rentang frekuensi?", ansA: "20 Hz - 20.000 Hz", ansB: "Di bawah 20 Hz", correct: 'A', registry: 'c_red' },
        { key: 'redCrystal', count: 1, value: 1, question: "Gelombang bunyi dengan frekuensi\ndi atas 20.000 Hz (tidak terdengar manusia) disebut?", ansA: "Ultrasonik", ansB: "Infrasonik", correct: 'A', registry: 'c_red' },
        { key: 'redCrystal', count: 1, value: 1, question: "Di luar angkasa (ruang hampa), suara ledakan\ntidak dapat terdengar karena tidak ada?", ansA: "Sumber Bunyi", ansB: "Medium Perantara", correct: 'B', registry: 'c_red' },
        { key: 'redCrystal', count: 1, value: 1, question: "Berdasarkan arah getarnya, gelombang bunyi\ntermasuk ke dalam jenis gelombang?", ansA: "Transversal", ansB: "Longitudinal", correct: 'B', registry: 'c_red' },
        { key: 'redCrystal', count: 1, value: 1, question: "Jarak antara dua rapatan yang saling berdekatan\npada gelombang bunyi longitudinal dihitung sebagai?", ansA: "1 Panjang Gelombang", ansB: "1/2 Panjang Gelombang", correct: 'A', registry: 'c_red' },
        { key: 'redCrystal', count: 1, value: 1, question: "Jika amplitudo mengecil akibat jarak yang jauh,\napa yang terjadi pada frekuensi suara tersebut?", ansA: "Tetap (Tidak Berubah)", ansB: "Ikut Mengecil", correct: 'A', registry: 'c_red' },
        { key: 'redCrystal', count: 1, value: 1, question: "Hewan seperti kelelawar dan lumba-lumba menggunakan\npantulan bunyi berfrekuensi tinggi yang disebut?", ansA: "Ekolokasi", ansB: "Resonansi", correct: 'A', registry: 'c_red' },
        { key: 'redCrystal', count: 1, value: 1, question: "Satuan untuk mengukur tingkat\nkebisingan atau intensitas bunyi adalah?", ansA: "Desibel (dB)", ansB: "Meter/Sekon (m/s)", correct: 'A', registry: 'c_red' },

        // ==========================================
        // BLUE CRYSTAL (Efek Doppler, v = λ × f) - 13 Soal
        // ==========================================
        { key: 'blueCrystal', count: 1, value: 1.5, question: "Peristiwa perubahan frekuensi bunyi akibat\npergerakan sumber atau pendengar disebut?", ansA: "Efek Doppler", ansB: "Resonansi", correct: 'A', registry: 'c_blue' },
        { key: 'blueCrystal', count: 1, value: 1.5, question: "Saat mobil ambulans MENDEKATI pendengar yang diam,\nfrekuensi sirine yang didengar akan terasa?", ansA: "Lebih Tinggi", ansB: "Lebih Rendah", correct: 'A', registry: 'c_blue' },
        { key: 'blueCrystal', count: 1, value: 1.5, question: "Jika pendengar MENJAUHI sumber bunyi yang diam,\nfrekuensi yang ia dengar akan?", ansA: "Menurun", ansB: "Meningkat", correct: 'A', registry: 'c_blue' },
        { key: 'blueCrystal', count: 1, value: 1.5, question: "Dalam rumus Efek Doppler, jika pendengar MENDEKAT,\nmaka kecepatan pendengar (vp) bernilai?", ansA: "Positif (+)", ansB: "Negatif (-)", correct: 'A', registry: 'c_blue' },
        { key: 'blueCrystal', count: 1, value: 1.5, question: "Dalam rumus Efek Doppler, jika sumber bunyi MENDEKAT,\nmaka kecepatan sumber (vs) bernilai?", ansA: "Positif (+)", ansB: "Negatif (-)", correct: 'B', registry: 'c_blue' },
        { key: 'blueCrystal', count: 1, value: 1.5, question: "Jika sumber bunyi diam dan pendengar juga diam,\nmaka frekuensi yang didengar (fp) akan?", ansA: "Sama dengan aslinya (fs)", ansB: "Menjadi 0 Hz", correct: 'A', registry: 'c_blue' },
        { key: 'blueCrystal', count: 1, value: 1.5, question: "Jika kecepatan rambat bunyi v = 340 m/s dan\nfrekuensi (f) = 170 Hz, panjang gelombang (λ) adalah?", ansA: "2 Meter", ansB: "0.5 Meter", correct: 'A', registry: 'c_blue' },
        { key: 'blueCrystal', count: 1, value: 1.5, question: "Jika panjang gelombang (λ) membesar namun kecepatan\nrambat tetap (v), apa yang terjadi pada frekuensi?", ansA: "Mengecil", ansB: "Membesar", correct: 'A', registry: 'c_blue' },
        { key: 'blueCrystal', count: 1, value: 1.5, question: "Kecepatan gelombang (v) dihitung dari hasil kali\nantara frekuensi (f) dengan besaran?", ansA: "Panjang Gelombang (λ)", ansB: "Amplitudo (A)", correct: 'A', registry: 'c_blue' },
        { key: 'blueCrystal', count: 1, value: 1.5, question: "Jika cepat rambat bunyi di air 1500 m/s dan\npanjang gelombang 3 m, berapakah frekuensinya?", ansA: "500 Hz", ansB: "4500 Hz", correct: 'A', registry: 'c_blue' },
        { key: 'blueCrystal', count: 1, value: 1.5, question: "Bunyi memantul pada tebing dan kembali setelah 2 detik.\nIni adalah contoh dari fenomena?", ansA: "Difraksi", ansB: "Gema / Pantulan", correct: 'B', registry: 'c_blue' },
        { key: 'blueCrystal', count: 1, value: 1.5, question: "Jika angin bertiup searah dengan rambatan bunyi,\nmaka kecepatan rambat bunyi akan?", ansA: "Bertambah", ansB: "Berkurang", correct: 'A', registry: 'c_blue' },
        { key: 'blueCrystal', count: 1, value: 1.5, question: "Bila pendengar dan sumber bunyi saling menjauh\ndengan cepat, nada yang terdengar makin?", ansA: "Rendah", ansB: "Tinggi", correct: 'A', registry: 'c_blue' },

        // ==========================================
        // GREEN JEWEL (Pipa Organa & Resonansi) - 13 Soal
        // ==========================================
        { key: 'greenJewel', count: 1, value: 3, question: "Pipa organa terbuka memiliki rumus frekuensi\nnada dasar (f0) yaitu?", ansA: "v / 2L", ansB: "v / 4L", correct: 'A', registry: 'c_green' },
        { key: 'greenJewel', count: 1, value: 3, question: "Pipa organa tertutup memiliki rumus frekuensi\nnada dasar (f0) yaitu?", ansA: "v / 2L", ansB: "v / 4L", correct: 'B', registry: 'c_green' },
        { key: 'greenJewel', count: 1, value: 3, question: "Perbandingan frekuensi (f0 : f1 : f2)\npada Pipa Organa TERBUKA adalah?", ansA: "1 : 2 : 3", ansB: "1 : 3 : 5", correct: 'A', registry: 'c_green' },
        { key: 'greenJewel', count: 1, value: 3, question: "Perbandingan frekuensi (f0 : f1 : f2)\npada Pipa Organa TERTUTUP adalah?", ansA: "1 : 2 : 3", ansB: "1 : 3 : 5", correct: 'B', registry: 'c_green' },
        { key: 'greenJewel', count: 1, value: 3, question: "Ujung TERBUKA pada sebuah pipa organa\nselalu membentuk gelombang yang disebut?", ansA: "Perut", ansB: "Simpul", correct: 'A', registry: 'c_green' },
        { key: 'greenJewel', count: 1, value: 3, question: "Ujung TERTUTUP pada sebuah pipa organa\nselalu membentuk titik yang tidak bergetar yaitu?", ansA: "Perut", ansB: "Simpul", correct: 'B', registry: 'c_green' },
        { key: 'greenJewel', count: 1, value: 3, question: "Jika sebuah pipa organa dipotong menjadi lebih pendek,\nfrekuensi nada dasarnya akan?", ansA: "Meningkat (Tinggi)", ansB: "Menurun (Rendah)", correct: 'A', registry: 'c_green' },
        { key: 'greenJewel', count: 1, value: 3, question: "Pipa organa TERTUTUP hanya dapat menghasilkan\nnada harmonik (atas) yang bersifat?", ansA: "Ganjil Saja", ansB: "Genap Saja", correct: 'A', registry: 'c_green' },
        { key: 'greenJewel', count: 1, value: 3, question: "Ada Pipa A (Terbuka) & Pipa B (Tertutup) dengan panjang L sama.\nPipa mana yang nada dasarnya LEBIH TINGGI?", ansA: "Pipa A (Terbuka)", ansB: "Pipa B (Tertutup)", correct: 'A', registry: 'c_green' },
        { key: 'greenJewel', count: 1, value: 3, question: "Peristiwa ikut bergetarnya suatu benda karena\npengaruh getaran gelombang benda lain disebut?", ansA: "Interferensi", ansB: "Resonansi", correct: 'B', registry: 'c_green' },
        { key: 'greenJewel', count: 1, value: 3, question: "Resonansi udara pertama pada tabung tertutup\nterjadi ketika tinggi kolom udara adalah?", ansA: "1/2 Panjang Gelombang", ansB: "1/4 Panjang Gelombang", correct: 'B', registry: 'c_green' },
        { key: 'greenJewel', count: 1, value: 3, question: "Semakin panjang sebuah alat musik tiup (misal Seruling),\nmaka nada yang dihasilkannya akan semakin?", ansA: "Tinggi (Nyaring)", ansB: "Rendah (Bass)", correct: 'B', registry: 'c_green' },
        { key: 'greenJewel', count: 1, value: 3, question: "Jika panjang pipa organa tertutup adalah L,\nmaka panjang gelombang (λ) nada dasarnya adalah?", ansA: "2L", ansB: "4L", correct: 'B', registry: 'c_green' }
        ];

        this.crystalsGroup = this.physics.add.group();

        crystalData.forEach(data => {
            for (let i = 0; i < data.count; i++) {
                let x = Phaser.Math.Between(200, 2300);
                let y = Phaser.Math.Between(300, 1300);
                let crystal = this.crystalsGroup.create(x, y, data.key).setDepth(y).setScale(0.8);
                crystal.quizData = data; // Simpan data kuis di dalam objek kristal
        
                // Animasi melayang
                this.tweens.add({ targets: crystal, y: y - 10, duration: 1000, yoyo: true, repeat: -1 });
        }
        });

        // UI Kuis Pop-up
        this.quizUI = this.add.container(640, 360).setScrollFactor(0).setDepth(25000).setVisible(false);
        const bgQuiz = this.add.rectangle(0, 0, 800, 300, 0x000000, 0.9).setStrokeStyle(4, 0xffffff);
        this.txtQuestion = this.add.text(0, -70, '', { fontSize: '20px', fill: '#fff', align: 'center' }).setOrigin(0.5);

        // Tombol Jawaban
        const btnA = this.add.rectangle(-120, 50, 200, 60, 0x0055aa)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0);
        this.txtA = this.add.text(-120, 50, '', { fontSize: '18px', fontStyle: 'bold' }).setOrigin(0.5);
        const btnB = this.add.rectangle(120, 50, 200, 60, 0xaa5500)
            .setInteractive({ useHandCursor: true })
            .setScrollFactor(0);
        this.txtB = this.add.text(120, 50, '', { fontSize: '18px', fontStyle: 'bold' }).setOrigin(0.5);

        this.quizUI.add([bgQuiz, this.txtQuestion, btnA, this.txtA, btnB, this.txtB]);

        let activeCrystal = null;

        const checkAnswer = (answer) => {
            if (activeCrystal && activeCrystal.quizData.correct === answer) {
        // Jawaban Benar: Tambah uang dan hapus kristal
        const data = activeCrystal.quizData;
        this.registry.set('total_uang', this.registry.get('total_uang') + data.value);
        this.registry.set(data.registry, this.registry.get(data.registry) + 1);
        
        activeCrystal.destroy();
        this.updateDashboard();
        } else {
        // Jawaban Salah: MUNDURKAN PLAYER AGAR TIDAK TERUS OVERLAP
        this.player.y += 40; 
        }
    
        // Tutup UI kuis dan reset
        this.quizUI.setVisible(false);
        this.physics.resume();
        activeCrystal = null; 
        };

        btnA.on('pointerdown', () => checkAnswer('A'));
        btnB.on('pointerdown', () => checkAnswer('B'));


        // 9. Interaksi Fisika Peta
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.towers); 
        this.physics.add.collider(this.player, this.fences);
        this.physics.add.collider(this.player, this.pyramid);
        this.physics.add.collider(this.player, this.gunung);
        
        // ---- PINDAHKAN KODE OVERLAP NPC KE SINI ----
        this.physics.add.overlap(this.player, this.npcMaestro, () => {
            this.npcDialog.setVisible(true);
        }, null, this);
        // --------------------------------------------

        this.physics.add.collider(this.player, mainCastle, () => {
            this.player.y += 20; 
            this.scene.pause();
            this.scene.launch('GameScene');
        });
        
        // Tabrakan NPC Prajurit
        this.physics.add.overlap(this.player, this.npcMaestro, () => {
            this.npcDialog.setVisible(true);
        }, null, this);

        // Tabrakan dengan Zona Biru untuk meluncurkan Game Wi-Fi
        this.physics.add.collider(this.player, this.blueZone, () => {
        this.player.y += 30; // Mundurkan player sedikit
        this.scene.pause();
        this.scene.launch('WifiScene'); // <-- Panggil WifiScene di sini
        });
        // -------------------------------------------
        // Tabrakan NPC Gurun
        this.physics.add.overlap(this.player, this.npcGurun, () => {
        this.gurunDialog.setVisible(true);
        }, null, this);

        // Tabrakan Zona Kuning ke Minigame Pipa
        this.physics.add.collider(this.player, this.yellowZone, () => {
        this.player.y += 30; 
        this.scene.pause();
        this.scene.launch('PipeScene'); 
        });
        this.physics.add.overlap(this.player, this.npcHutan, () => {
        this.hutanDialog.setVisible(true);
        }, null, this);

        this.physics.add.collider(this.player, this.fogZone, () => {
        this.player.y += 30; 
        this.scene.pause();
        this.scene.launch('DopplerScene'); 
        });
        // Interaksi Tabrakan Kristal
        this.physics.add.overlap(this.player, this.crystalsGroup, (player, crystal) => {
        this.physics.pause();
        activeCrystal = crystal;
        this.txtQuestion.setText(crystal.quizData.question);
        this.txtA.setText(crystal.quizData.ansA);
        this.txtB.setText(crystal.quizData.ansB);
        this.quizUI.setVisible(true);
        });
        // UI Hitung Mundur (Pojok Kanan Atas)
        this.txtTimer = this.add.text(1260, 20, '', { 
            fontSize: '24px', fill: '#ffffff', backgroundColor: '#cc0000', padding: { x: 10, y: 10 } 
        }).setScrollFactor(0).setDepth(9999).setOrigin(1, 0);

        // Event Timer berulang setiap 1 detik (1000 ms)
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                let t = this.registry.get('waktu_sisa');
                if (t > 0) {
                    t--;
                    this.registry.set('waktu_sisa', t);
                    
                    let menit = Math.floor(t / 60);
                    let detik = t % 60;
                    // Format tampilan (contoh: 29:05)
                    this.txtTimer.setText(`⏳ Waktu: ${menit}:${detik < 10 ? '0' : ''}${detik}`);
                } else if (!this.gameOverUI.visible) {
                    this.triggerGameOver();
                }
            },
            callbackScope: this,
            loop: true
        });

        // Inisialisasi Status Misi Global di Registry
        if (this.registry.get('total_uang') === undefined) {
            this.registry.set('total_uang', 0);
            this.registry.set('c_red', 0);
            this.registry.set('c_blue', 0);
            this.registry.set('c_green', 0);
            this.registry.set('misi_kastil', false);
            this.registry.set('misi_wifi', false);
            this.registry.set('misi_pipa', false);
            this.registry.set('misi_hutan', false);
            this.registry.set('waktu_sisa', 1800);
        }
        

        // UI Dashboard Misi (Fix di layar menggunakan setScrollFactor(0))
        this.dashboardUI = this.add.container(640, 360).setScrollFactor(0).setDepth(10000).setVisible(false);

        // 1. Buat Background terlebih dahulu
        const bgDash = this.add.rectangle(0, 0, 700, 400, 0x000000, 0.85).setStrokeStyle(4, 0xffaa00);
        const titleDash = this.add.text(0, -150, '🏆 DASHBOARD MISI 🏆', { fontSize: '28px', fontStyle: 'bold', fill: '#ffaa00' }).setOrigin(0.5);

        // 2. Buat Teks
        this.txtKastil = this.add.text(-300, -100, '', { fontSize: '20px', fill: '#fff' });
        this.txtWifi = this.add.text(-300, -50, '', { fontSize: '20px', fill: '#fff' });
        this.txtPipa = this.add.text(-300, 0, '', { fontSize: '20px', fill: '#fff' });
        this.txtHutan = this.add.text(-300, 50, '', { fontSize: '20px', fill: '#fff' });
        this.txtUang = this.add.text(-300, 100, '', { fontSize: '20px', fill: '#00ffaa', fontStyle: 'bold' }); // Pindah ke sini

        const closeBtn = this.add.text(0, 170, '[ TUTUP DASHBOARD ]', { fontSize: '20px', fill: '#ff5555' })
            .setOrigin(0.5).setInteractive({ useHandCursor: true });

        // 3. Masukkan ke Container secara berurutan (Background paling depan di array)
        this.dashboardUI.add([bgDash, titleDash, this.txtKastil, this.txtWifi, this.txtPipa, this.txtHutan, this.txtUang, closeBtn]);

        // Tombol Buka Dashboard di Pojok Kiri Atas
        const btnMisi = this.add.text(20, 20, '📋 Cek Misi (M)', { 
            fontSize: '20px', backgroundColor: '#000000', padding: { x: 10, y: 10 } 
        }).setScrollFactor(0).setDepth(9999).setInteractive({ useHandCursor: true });
        
        const toggleDashboard = () => {
            this.dashboardUI.setVisible(!this.dashboardUI.visible);
            this.updateDashboard();
        };

        btnMisi.on('pointerdown', toggleDashboard);
        this.input.keyboard.on('keydown-M', toggleDashboard);

        // Update teks dashboard setiap kali kembali dari minigame
            this.events.on('resume', () => {
            this.updateDashboard();
            this.checkWinCondition(); // Cek apakah semua misi selesai
            });
        
        this.updateDashboard(); // Panggil perdana
         // --- UI KEMENANGAN AKHIR ---
        this.winUI = this.add.container(640, 360).setScrollFactor(0).setDepth(30000).setVisible(false);
        const bgWin = this.add.rectangle(0, 0, 800, 400, 0x000000, 0.95).setStrokeStyle(6, 0xffd700);
        const titleWin = this.add.text(0, -80, '🎉 SELAMAT! 🎉\nKAMU MENYELESAIKAN SEMUA MISI FISIKA!', { fontSize: '32px', fontStyle: 'bold', fill: '#ffd700', align: 'center', lineSpacing: 10 }).setOrigin(0.5);
        
        // Simpan referensi teks kemenangan agar bisa diubah (dinamis)
        this.textWin = this.add.text(0, 50, '', { fontSize: '22px', fill: '#ffffff', align: 'center', lineSpacing: 10 }).setOrigin(0.5);
        this.winUI.add([bgWin, titleWin, this.textWin]);

        // --- UI GAME OVER (WAKTU HABIS) ---
        this.gameOverUI = this.add.container(640, 360).setScrollFactor(0).setDepth(30000).setVisible(false);
        const bgGameOver = this.add.rectangle(0, 0, 800, 400, 0x000000, 0.95).setStrokeStyle(6, 0xff0000);
        const titleGameOver = this.add.text(0, -50, '💀 WAKTU HABIS! 💀\nMISI GAGAL', { fontSize: '36px', fontStyle: 'bold', fill: '#ff0000', align: 'center', lineSpacing: 10 }).setOrigin(0.5);
        const textGameOver = this.add.text(0, 60, 'Anomali gelombang menghancurkan dunia ini.\nSilakan muat ulang (refresh) halaman untuk mencoba lagi.', { fontSize: '20px', fill: '#ffffff', align: 'center' }).setOrigin(0.5);
        this.gameOverUI.add([bgGameOver, titleGameOver, textGameOver]);

    // --- UI PANDUAN AWAL (Hanya muncul sekali) ---
        if (!this.registry.get('intro_selesai')) {
            // Hentikan mesin fisika (pergerakan NPC dan Pemain) saat intro tampil
            this.physics.pause();

            this.introUI = this.add.container(640, 360).setScrollFactor(0).setDepth(20000);
            
            // Hapus .setInteractive() dari sini, kita akan pakai input global
            const bgHitbox = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.8); 
                
            const bgIntro = this.add.rectangle(0, 0, 800, 600, 0x000000, 1).setStrokeStyle(4, 0x00ffaa);
            const titleIntro = this.add.text(0, -250, 'SELAMAT DATANG DI DUNIA GEMA!', { fontSize: '32px', fontStyle: 'bold', fill: '#00ffaa' }).setOrigin(0.5);
            
            const textIntro = this.add.text(0, -20, 
                'Dunia ini butuh bantuanmu untuk menyelesaikan anomali gelombang!\n\n' +
                '📍 Misi yang harus diselesaikan:\n' +
                '1. Temui Prajurit di Kastil Pusat (Tengah).\n' +
                '2. Temui Ilmuwan Warga di Area Perumahan (Kiri Bawah).\n' +
                '3. Temui Penebang Pohon di Hutan Pinus (Kiri Atas).\n' +
                '4. Temui Pengelana di Gurun Pasir (Kanan).\n\n' +
                'Kumpulkan semua kristal untuk mendapatkan uang tambahan.\n' +
                'Kristal merah: Pitch & Volume\n' +
                'Kristal biru: Efek Doppler\n' +
                'Kristal hijau: Pipa Organa & Resonansi\n\n' +
                'Gunakan tombol PANAH untuk bergerak.\n' +
                'Tekan tombol "M" atau klik "Cek Misi" untuk melihat progres.', 
                { fontSize: '14px', fill: '#ffffff', align: 'left', lineSpacing: 10 }
            ).setOrigin(0.5, 0.5);

            const startBtn = this.add.rectangle(0, 250, 350, 50, 0x00aa55);
            const startText = this.add.text(0, 250, 'KLIK DI MANA SAJA UNTUK MULAI', { fontSize: '18px', fontStyle: 'bold' }).setOrigin(0.5);

            this.introUI.add([bgHitbox, bgIntro, titleIntro, textIntro, startBtn, startText]);

            // Deteksi event klik layar secara global (mengabaikan posisi kamera)
            this.input.once('pointerdown', () => {
                this.registry.set('intro_selesai', true);
                this.introUI.destroy(); 
                this.physics.resume(); // Lanjutkan pergerakan pemain dan NPC
            });
        }
        // --- KONTROL VIRTUAL (SMARTPHONE) ---
        // Mengaktifkan dukungan multi-touch (agar bisa jalan sambil klik kuis)
        this.input.addPointer(2); 

        // Variabel penampung status tombol virtual
        this.vPad = {
            up: { isDown: false },
            down: { isDown: false },
            left: { isDown: false },
            right: { isDown: false }
        };

        // Fungsi pembuat tombol D-Pad
        const createDPad = (x, y, direction, symbol) => {
            const btn = this.add.circle(x, y, 45, 0x000000, 0.4)
                .setScrollFactor(0).setDepth(40000).setInteractive();
            this.add.text(x, y, symbol, { fontSize: '36px', fill: '#ffffff' })
                .setScrollFactor(0).setDepth(40001).setOrigin(0.5);

            // Deteksi sentuhan tahan dan lepas
            btn.on('pointerdown', () => this.vPad[direction].isDown = true);
            btn.on('pointerup', () => this.vPad[direction].isDown = false);
            btn.on('pointerout', () => this.vPad[direction].isDown = false); // Jika jari tergeser keluar tombol
        };

        // Menggambar D-Pad di pojok kiri bawah (sesuaikan X dan Y jika kurang pas)
        createDPad(150, 500, 'up', '▲');
        createDPad(150, 640, 'down', '▼');
        createDPad(80, 570, 'left', '◀');
        createDPad(220, 570, 'right', '▶');
    }

update() {
        this.player.body.setVelocity(0);
        let isMoving = false;

        // Gerak Kiri / Kanan dengan Animasi (Merespons Keyboard ATAU D-Pad Virtual)
        if (this.cursors.left.isDown || this.vPad.left.isDown) {
            this.player.body.setVelocityX(-250);
            this.player.anims.play('walk_left', true); 
            isMoving = true;
        } else if (this.cursors.right.isDown || this.vPad.right.isDown) {
            this.player.body.setVelocityX(250);
            this.player.anims.play('walk_right', true);
            isMoving = true;
        } 
        // Gerak Atas / Bawah
        else if (this.cursors.up.isDown || this.vPad.up.isDown) {
            this.player.body.setVelocityY(-250);
            this.player.anims.stop(); 
            this.player.setTexture('player_up');
            isMoving = true;
        } else if (this.cursors.down.isDown || this.vPad.down.isDown) {
            this.player.body.setVelocityY(250);
            this.player.anims.stop();
            this.player.setTexture('player_down');
            isMoving = true;
        }

        // Jika diam (tidak ada input)
        if (!isMoving) {
            this.player.anims.stop();
            this.player.setTexture('player_idle');
        }

        this.player.setDepth(this.player.y);

        this.clouds.children.iterate((cloud) => {
            if (cloud && cloud.x > 2560 + 200) {
                cloud.x = -200;
            }
        });

        // ==========================================
        // TAMBAHKAN KODE NPC DI SINI (PALING BAWAH)
        // ==========================================
        
        // Sembunyikan dialog jika jarak pemain dan NPC Prajurit lebih dari 70 piksel
        if (this.npcMaestro) {
            // Update posisi teks agar selalu melayang di atas kepala NPC
            if (this.npcDialog) {
                this.npcDialog.setPosition(this.npcMaestro.x, this.npcMaestro.y - 80);
            }

            const distanceToNPC = Phaser.Math.Distance.Between(
                this.player.x, this.player.y, 
                this.npcMaestro.x, this.npcMaestro.y
            );
            
            // Jika pemain berada di dekat NPC (jarak 70 atau kurang)
            if (distanceToNPC <= 70) {
                // Jeda pergerakan bolak-balik (Tween) dan animasi kakinya
                if (this.npcTween) this.npcTween.pause();
                this.npcMaestro.anims.pause();
            } 
            // Jika pemain menjauh
            else {
                this.npcDialog.setVisible(false); // Sembunyikan teks
                
                // Lanjutkan pergerakan (Tween) dan animasi kakinya
                if (this.npcTween) this.npcTween.resume();
                if (!this.npcMaestro.anims.isPlaying) {
                    this.npcMaestro.anims.resume();
                }
            }
        }
        
        // ==========================================
        if (this.advNPC) {
            if (this.advDialog) this.advDialog.setPosition(this.advNPC.x, this.advNPC.y - 80);

            const distAdv = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.advNPC.x, this.advNPC.y);
    
            if (distAdv <= 80) {
            if (this.advTweenX) this.advTweenX.pause();
            if (this.advTweenY) this.advTweenY.pause();
            this.advNPC.setTexture('adv_talk');
            this.advDialog.setVisible(true);
            } else {
            if (this.advTweenX) this.advTweenX.resume();
            if (this.advTweenY) this.advTweenY.resume();
            this.advNPC.setTexture('adv_swim'); // Animasi berjalan saat dijauhi
            this.advDialog.setVisible(false);
            }
        }
        // ==========================================
       if (this.npcGurun) {
            if (this.gurunDialog) this.gurunDialog.setPosition(this.npcGurun.x, this.npcGurun.y - 80);
            const distGurun = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npcGurun.x, this.npcGurun.y);
    
            if (distGurun <= 80) {
            if (this.gurunTween) this.gurunTween.pause();
            this.npcGurun.anims.pause();
            } else {
            if (this.gurunTween) this.gurunTween.resume();
            if (!this.npcGurun.anims.isPlaying) this.npcGurun.anims.resume();
            this.gurunDialog.setVisible(false);
            }
        } 
        if (this.npcHutan) {
        if (this.hutanDialog) this.hutanDialog.setPosition(this.npcHutan.x, this.npcHutan.y - 80);
        const distHutan = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npcHutan.x, this.npcHutan.y);
    
        if (distHutan <= 80) {
        if (this.hutanTween) this.hutanTween.pause();
        this.npcHutan.anims.pause();
        this.npcHutan.setTexture('npc_hutan0'); // Berdiri diam
        } else {
        if (this.hutanTween) this.hutanTween.resume();
        if (!this.npcHutan.anims.isPlaying) this.npcHutan.anims.resume();
        this.hutanDialog.setVisible(false);
        }
        }
    }
        updateDashboard() {
            const getStatus = (key) => this.registry.get(key) ? '✅ SELESAI' : '❌ BELUM';
            this.txtKastil.setText(`1. Harmoni Kastil (Amplitudo & Frekuensi) : ${getStatus('misi_kastil')}`);
            this.txtWifi.setText(`2. Sinyal Kamar (v = λ × f)              : ${getStatus('misi_wifi')}`);
            this.txtPipa.setText(`3. Pipa Gurun (f = v/2L vs v/4L)        : ${getStatus('misi_pipa')}`);
            this.txtHutan.setText(`4. Kabut Hutan (Efek Doppler)           : ${getStatus('misi_hutan')}`);

            const uang = this.registry.get('total_uang');
            const r = this.registry.get('c_red');
            const b = this.registry.get('c_blue');
            const g = this.registry.get('c_green');
        this.txtUang.setText(`💰 Saldo: Rp ${uang} Miliar\n💎 Merah: ${r} | 💧 Biru: ${b} | 🍃 Hijau: ${g}`);
    }

        checkWinCondition() {
            const m1 = this.registry.get('misi_kastil');
            const m2 = this.registry.get('misi_wifi');
            const m3 = this.registry.get('misi_pipa');
            const m4 = this.registry.get('misi_hutan');

            if (m1 && m2 && m3 && m4) {
            // Hentikan timer dengan mengubah sisa waktu jadi aman
            this.registry.set('waktu_sisa', 9999); 
            
            // Ambil data uang yang terkumpul
            const uang = this.registry.get('total_uang');
            
            // Masukkan total uang ke dalam teks UI Kemenangan
            this.textWin.setText(
                'Keseimbangan gelombang dan bunyi di dunia ini telah pulih.\nTerima kasih atas bantuanmu!\n\n' +
                `💰 Pendapatan Kristal: Rp ${uang} Miliar 💰`
            );

            this.winUI.setVisible(true);
            this.physics.pause();
            this.player.anims.stop();
            this.player.setTexture('player_idle');
            this.input.keyboard.enabled = false; 
        }
    }

    triggerGameOver() {
        this.gameOverUI.setVisible(true);
        this.physics.pause();
        this.player.anims.stop();
        this.player.setTexture('player_idle');
        this.input.keyboard.enabled = false; 
    }   
}
