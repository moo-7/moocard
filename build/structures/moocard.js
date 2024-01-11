const Canvas = require('canvas')
const { colorFetch } = require("../functions/colorFetch");
Canvas.registerFont("./node_modules/moocard/build/structures/font/ResistSansDisplay-Bold.ttf", { family: "ResistSansDisplay-Bold" })


class moocard {
    constructor(options = {}) {
        this.nameCard = options.name || "Moo Music";
        this.authorCard = options.author || "Moo Music";
        this.color = options.color || "#ff0000";
        this.thumbnailCard = options.thumbnail || "";
        this.requester = options.requester || "Moo Music";
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
        this.requester = requester;
        return this;
    }

    async build() {
        if (!this.nameCard || !this.authorCard || !this.requester) {
            throw new Error('Missing required parameters');
        }

        if (!this.color) {
            this.setColor('#ff0000');
        }

        if (!this.thumbnailCard) {
            this.setThumbnail('https://s6.imgcdn.dev/Opo4a.jpg');
        }

        const validatedColor = await colorFetch(
            this.color || 'ff0000',
            parseInt(this.brightness) || 0,
            this.thumbnailCard
        );

        const canvas = Canvas.createCanvas(720, 268);
        const context = canvas.getContext('2d');

        try {
            await Canvas.loadImage("https://cdn.is-a.fun/moo/moocard.png").then(async (img) => {
                context.drawImage(img, 245, 20, 433, 228);

                await Canvas.loadImage(this.thumbnailCard).then(async (img) => {
                    const radius = 15;

                    context.save();
                    context.beginPath();
                    context.moveTo(247, 23 + radius);
                    context.arcTo(247, 23, 247 + radius, 23, radius);
                    context.arcTo(247 + 430, 23, 247 + 430, 23 + radius, radius);
                    context.arcTo(247 + 430, 23 + 225, 247 + 430 - radius, 23 + 225, radius);
                    context.arcTo(247, 23 + 225, 247, 23 + 225 - radius, radius);
                    context.closePath();

                    context.clip();

                    context.globalAlpha = 0.1;
                    context.drawImage(img, 247, 23, 430, 225);
                    context.globalAlpha = 1.0;
                    context.restore();
                });
            });

            const x = 20;
            const y = 25;
            const width = 220;
            const height = 220;
            const radius = 20;

            context.save();
            context.beginPath();
            context.moveTo(x + radius, y);
            context.arcTo(x + width, y, x + width, y + height, radius);
            context.arcTo(x + width, y + height, x, y + height, radius);
            context.arcTo(x, y + height, x, y, radius);
            context.arcTo(x, y, x + width, y, radius);
            context.closePath();
            context.clip();

            await Canvas.loadImage(this.thumbnailCard).then(async (i) => {
                context.drawImage(i, -125, 0, 520, 268);
            });
            context.restore();

            if (this.nameCard.length > 15) this.nameCard = `${this.nameCard.slice(0, 14)}...`;
            if (this.authorCard.length > 15) this.authorCard = `${this.authorCard.slice(0, 14)}...`;
            if (this.requester.length > 20) this.requester = `${this.requester.slice(0, 19)}...`;

            context.fillStyle = `#${validatedColor}`;
            context.font = `bold 40px "Resist Sans Display Not-Rotated", "Sans", sans-serif`;
            context.textAlign = "left";
            context.fillText(this.nameCard, 270, 100);
            
            context.font = `bold 30px "Resist Sans Display Not-Rotated", "Sans", sans-serif`;
            context.fillStyle = "#ababab";
            context.fillText(this.authorCard, 270, 155);
            
            context.fillStyle = '#ffffff';
            context.font = `bold 24px "Resist Sans Display Not-Rotated", "Sans", sans-serif`;
            context.fillText(this.requester, 270, 210);
            

            const ballRadius = 15;
            const backgroundColor = "#ababab";

            context.fillStyle = backgroundColor;

            return canvas.toBuffer('image/png');
        } catch (error) {
            console.error("Error while building moocard");
            throw error;
        }
    }
}

module.exports = { moocard };
