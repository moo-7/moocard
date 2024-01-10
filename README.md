# __Sobre__
**Musicard** é uma biblioteca futurística de cartões de música projetada para bots Discord.

# __Instalação__
```
npm install moocard
```

# __Exemplo__
Este código de exemplo irá gerar uma imagem de cartão de música e salvá-la.
```js

  const { moocard } = require("moocard");

  const card = new moocard()
        .setName(track.info.title)
        .setAuthor(track.info.author)
        .setColor("auto")
        .setThumbnail(track.info.thumbnail)
        .setProgress(10)
        .setStartTime("00:00")
        .setEndTime(formattedLength)

    const buffer = await card.build()
    const attachment = new AttachmentBuilder(buffer, { name: `musicard.png` })
```

# __Saída__
Esta é a saída **clássica** do musicard.

![classic](https://raw.githubusercontent.com/arrastaorj/flags/main/musicard%20(3).png)
