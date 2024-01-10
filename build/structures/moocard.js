const Canvas = require('canvas')
const { colorFetch } = require("../functions/colorFetch");
Canvas.registerFont("././fonts/ResistSansDisplay-Bold.ttf", { family: "ResistSansDisplay-Bold" })
class moocard {
    constructor(options = {}) {
        this.nameCard = options.name || "Moo Music";
        this.authorCard = options.author || "Moo Music";
        this.color = options.color || "#ff0000";
        this.thumbnailCard = options.thumbnail || "";
        this.requester = options?.requester ?? "Moo Music";
    }

    setName(name) {
        this.nameCard = name;
        return this;
    }

    setAuthor(author) {
        this.authorCard = author;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setThumbnail(thumbnail) {
        this.thumbnailCard = thumbnail;
        return this;
    }

    setRequester(requester) {
        this.requester = `Requested by ${requester}`;
        return this;
    }


    async build() {

        if (!this.nameCard) throw new Error('Missing name parameter');
        if (!this.authorCard) throw new Error('Missing author parameter');
        if (!this.requester) throw new Error('Missing requester parameter');
        if (!this.color) this.setColor('ff0000');
        if (!this.thumbnailCard) this.setThumbnail('https://s6.imgcdn.dev/Opo4a.jpg');
        if (!this.progressPercentage) this.setProgress(0);
        if (!this.startTime) this.setStartTime('0:00');
        if (!this.endTime) this.setEndTime('0:00');


        const validatedColor = await colorFetch(
            this.color || 'ff0000',
            parseInt(this.brightness) || 0,
            this.thumbnailCard
        )


        let chave = {};
        chave.create = Canvas.createCanvas(720, 268);
        chave.context = chave.create.getContext('2d');



        await Canvas.loadImage("https://raw.githubusercontent.com/arrastaorj/flags/main/cardclass2.png").then(async (img) => {
            chave.context.drawImage(img, 245, 20, 433, 228);
            await Canvas.loadImage(this.thumbnailCard).then(async (img) => {

                // Criar um caminho de recorte para um canto arredondado
                const radius = 15;

                chave.context.save();
                chave.context.beginPath();
                chave.context.moveTo(247, 23 + radius); // Mover para o canto superior esquerdo
                chave.context.arcTo(247, 23, 247 + radius, 23, radius); // Arco superior esquerdo
                chave.context.arcTo(247 + 430, 23, 247 + 430, 23 + radius, radius); // Arco superior direito
                chave.context.arcTo(247 + 430, 23 + 225, 247 + 430 - radius, 23 + 225, radius); // Arco inferior direito
                chave.context.arcTo(247, 23 + 225, 247, 23 + 225 - radius, radius); // Arco inferior esquerdo
                chave.context.closePath();

                // Clip para o caminho de recorte
                chave.context.clip();


                chave.context.globalAlpha = 0.1; // Define a transparência global para 30%
                chave.context.drawImage(img, 247, 23, 430, 225)
                chave.context.globalAlpha = 1.0; // Restaura a transparência global para o valor original
            });
            chave.context.restore();
        });


        // Recorte arredondado
        const x = 20;
        const y = 25;
        const width = 220; //largura
        const height = 220; // altura
        const radius = 20;

        chave.context.save();
        chave.context.beginPath();
        chave.context.moveTo(x + radius, y);
        chave.context.arcTo(x + width, y, x + width, y + height, radius);
        chave.context.arcTo(x + width, y + height, x, y + height, radius);
        chave.context.arcTo(x, y + height, x, y, radius);
        chave.context.arcTo(x, y, x + width, y, radius);
        chave.context.closePath();
        chave.context.clip();

        await Canvas.loadImage(this.thumbnailCard).then(async (i) => {
            chave.context.drawImage(i, -125, 0, 520, 268)
        });
        chave.context.restore();



        if (this.nameCard.length > 15) this.nameCard = `${this.nameCard.slice(0, 14)}...`;
        if (this.authorCard.length > 15) this.authorCard = `${this.authorCard.slice(0, 14)}...`;

        chave.context.fillStyle = `#${validatedColor}`;
        chave.context.font = '45px "ResistSansDisplay-Bold"';
        chave.context.textAlign = "left";
        chave.context.fillText(this.nameCard, 260, 80);
        chave.context.font = '25px "ResistSansDisplay-Bold"';
        chave.context.fillStyle = "#ababab";
        chave.context.fillText(this.authorCard, 260, 115);

        chave.context.fillStyle = '#b8b8b8';
        chave.context.font = '45px "ResistSansDisplay-Bold"';
        ctx.fillText(this.requester, 260, 115, 670, 25);

        const ballRadius = 15;  // Raio da bola


        // Adicionar cor de fundo para barra não preenchida
        const backgroundColor = "#ababab";  // Cor de fundo da barra não preenchida
        chave.context.fillStyle = backgroundColor;


        // Desenhar a bola
        chave.context.beginPath();
        chave.context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
        chave.context.fillStyle = `#${validatedColor}`;  // Cor da bola
        chave.context.fill();


        return chave.create.toBuffer('image/png');



    }
}

module.exports = { moocard }