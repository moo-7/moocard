# Moocard is a futuristic music card library designed for Discord bots.

# install
```
npm install moocard
```

# example
```js

    const card = new moocard()
      .setName(String(song?.title).toUpperCase())
      .setAuthor(String(song?.author).toUpperCase())
      .setColor(client.color.toString())
      .setThumbnail(
        track.thumbnail
          ? track.thumbnail
          : `https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`
      )
      .setRequester((song?.requester as User).username.toUpperCase());

    const cardBuffer = await card.build();

    const attachment = new AttachmentBuilder(cardBuffer, {
      name: "moo.png",
    });
```

![classic](https://cdn.discordapp.com/attachments/1194410866209206412/1195031997320540320/mewwme.png)
